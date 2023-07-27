import _ from "lodash";
import { BookingInfo, BookingResult, CalendarDate, Flight, FlightDiscoverResult, FlightLeg, FlightResult, FlightSearchResult, GoogleFlightsConfig, LocationSearchResult, Month, Stops, TimeFrame, TrendData } from "./types.js";

const transformDate = ({ year, month, day }: {
    year: number;
    month: number;
    day: number;
}) => `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`;

const addTime = (date: string, milliseconds: number) => 
    new Date(new Date(date).getTime() + milliseconds).toISOString().split('T')[0];

export default class GoogleFlightsAPI {
    private static parseResult = async (res: Response) => res.text()
        .then(text => JSON.parse(text.replace(")]}'\n\n", '')));

    private config: GoogleFlightsConfig;

    constructor(config: GoogleFlightsConfig) {
        this.config = config;
    }

    editConfig(config: Partial<GoogleFlightsConfig>) {
        this.config = {
            ...this.config,
            ...config
        }
    }

    static async locationSearch(search: string): Promise<LocationSearchResult> {
        const body = new URLSearchParams({
            'f.req': JSON.stringify([
                [
                    [
                        'H028ib',
                        JSON.stringify([
                            search,
                            [ 1, 2, 3, 5 ],
                            null, [ 2 ], 2
                        ]),
                        null,
                        'generic'
                    ]
                ]
            ])
        });
        
        const results = await fetch('https://www.google.com/_/TravelFrontendUi/data/batchexecute', {
            method: 'POST', body
        }).then(this.parseResult).then(res => JSON.parse(res[0][2])[0]);
    
        return results.map(([info, airportInfo]: any) => {
            if (info[0] === 1) {
                const airport = {
                    type: 'airport',
                    name: info[1],
                    city: info[2],
                    description: info[3],
                    identifier: info[4],
                    code: info[5]
                }
    
                return airport;
            }
    
            return {
                type: 'city',
                fullName: info[1],
                shortName: info[2],
                description: info[3],
                identifier: info[4],
                airports: airportInfo?.map(([info, distance]: any) => ({
                    type: 'airport',
                    name: info[1],
                    city: info[2],
                    identifier: info[4],
                    code: info[5],
                    distance
                })) ?? []
            }
        });
    }

    generatePayload = (type: 'explore' | 'search' | 'booking' | 'calendar', flights?: FlightResult[]) => {
        const payload = [
            null, null, 
            this.config.roundtrip ? 1 : 2, 
            null,
            (
                type === 'explore' 
                    &&
                this.config.exploreMonth !== undefined 
                    && 
                (this.config.exploreTimeFrame !== undefined || this.config.roundtrip)
                    &&
                this.config.exploreMonth === Month.ALL 
                    && 
                (this.config.exploreTimeFrame === TimeFrame.ONE_WEEK || this.config.roundtrip)
            ) ? [
                this.config.exploreMonth, 
                ...(this.config.roundtrip ? [this.config.exploreTimeFrame] : [])
            ] : [],
            this.config.seatClass, 
            [
                this.config.passengers.adults ?? 1,
                this.config.passengers.children ?? 0,
                this.config.passengers.infantsOnLap ?? 0,
                this.config.passengers.infantsInSeat ?? 0
            ], 
            this.config.maxPrice && [
                null, this.config.maxPrice
            ], 
            null, null, null, null, null,
            [
                [
                    [
                        [
                            [ this.config.originIdentifier, 5 ]
                        ]
                    ],
                    [
                        type === 'explore' ? [] : [
                            [ this.config.destinationIdentifier, 5 ]
                        ]
                    ],
                    this.config.outboundTimes?.departure.concat(this.config.outboundTimes.arrival),
                    this.config.stops ?? Stops.ANY, 
                    [
                        ...(this.config.alliances ?? []),
                        ...(this.config.airlines ?? []),
                    ], 
                    [],
                    this.config.outboundDate,
                    this.config.duration && [ this.config.duration ],
                    (type !== 'explore' && flights) ? flights[0].legs.map(leg => [
                        leg.departure.airport.code, transformDate(leg.departure.date),
                        leg.arrival.airport.code, null, 
                        leg.flightNumber.code, leg.flightNumber.number
                    ]) : [],
                    [], [], null, null, [], 3
                ],
                ...(this.config.roundtrip ? [
                    [
                        [
                            type === 'explore' ? [] : [
                                [ this.config.destinationIdentifier, 5 ]
                            ]
                        ], 
                        [
                            [
                                [
                                    (
                                        type === 'explore' ? (
                                            this.config.destinationIdentifier ?? this.config.originIdentifier
                                        ) : this.config.originIdentifier
                                    ), 5 
                                ]
                            ]
                        ],
                        this.config.returnTimes?.departure.concat(this.config.returnTimes.arrival),
                        this.config.stops ?? Stops.ANY, 
                        [
                            ...(this.config.alliances ?? []),
                            ...(this.config.airlines ?? []),
                        ], 
                        [],
                        this.config.returnDate,
                        this.config.duration && [ this.config.duration ],
                        (type === 'booking' && flights) ? flights[1].legs.map(leg => [
                            leg.departure.airport.code, transformDate(leg.departure.date),
                            leg.arrival.airport.code, null, 
                            leg.flightNumber.code, leg.flightNumber.number
                        ]) : [], 
                        [], [], null, null, [], 3
                    ]
                ] : [])
            ],
            null, null, null, this.config.outboundDate ? 1 : 0, null, null, null, null, null, []
        ]
        return new URLSearchParams({
            'f.req': JSON.stringify([
                null,
                JSON.stringify([
                    type === 'calendar' ? null : [],
                    type === 'explore'
                        ? this.config.bounds
                        : payload,
                    ...(type === 'explore' ? [null, payload] : []),
                    ...((type === 'calendar' && this.config.calendar) ? [
                        this.config.calendar.outboundDateRange, ...(
                            (this.config.roundtrip && this.config.calendar.returnDateRange) 
                                ? [ this.config.calendar.returnDateRange ] : []
                        )
                    ] : [])
                ])
            ])
        });
    };

    async calendar(): Promise<CalendarDate[]> {
        if (!this.config.originIdentifier)
            throw new Error('Outbound identifier required');

        if (!this.config.outboundDate || !this.config.outboundDate.match(/^\d{4}-\d{2}-\d{2}$/))
            throw new Error('Outbound date absent or malformed (YYYY-mm-dd)');

        if (this.config.roundtrip) {
            if (!this.config.destinationIdentifier)
                throw new Error('Return identifier required for roundtrip');

            if (!this.config.returnDate || !this.config.returnDate.match(/^\d{4}-\d{2}-\d{2}$/))
                throw new Error('Return date absent or malformed (YYYY-mm-dd)');
        }

        if (!this.config.calendar)
            throw new Error('Calendar definition required in config');

        if (
            !this.config.calendar.outboundDateRange[0].match(/^\d{4}-\d{2}-\d{2}$/) 
                || 
            !this.config.calendar.outboundDateRange[1].match(/^\d{4}-\d{2}-\d{2}$/)
        ) throw new Error('Calendar outbound date range malformed (YYYY-mm-dd)');

        if (
            this.config.roundtrip && (
                !this.config.calendar.returnDateRange || (
                    !this.config.calendar.returnDateRange[0].match(/^\d{4}-\d{2}-\d{2}$/) 
                        || 
                    !this.config.calendar.returnDateRange[1].match(/^\d{4}-\d{2}-\d{2}$/)
                )
            )
        ) throw new Error('Calendar return date range absent or malformed (YYYY-mm-dd)');
        
        const data = await fetch('https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetCalendarGrid', {
            method: 'POST', body: this.generatePayload('calendar')
        }).then(GoogleFlightsAPI.parseResult).then(res => JSON.parse(res[0][2]));

        return data[1].map((datum: any) => ({
            outboundDate: datum[0],
            returnDate: datum[1],
            price: datum[2][0][1]
        }))
    }

    async explore() {
        const exploreTime = this.config.exploreMonth !== undefined 
            && (this.config.exploreTimeFrame !== undefined || !this.config.roundtrip);
        const datesExist = this.config.outboundDate 
            && this.config.outboundDate.match(/^\d{4}-\d{2}-\d{2}$/) 
            && (
                (
                    this.config.returnDate && this.config.returnDate.match(/^\d{4}-\d{2}-\d{2}$/) 
                ) || !this.config.roundtrip
            );
        
        if (!exploreTime && !datesExist)
            throw new Error('Invalid config for explore');
        
        const data = await fetch('https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetExploreDestinations', {
            method: 'POST', body: this.generatePayload('explore')
        }).then(GoogleFlightsAPI.parseResult);
    
        const cityInfo = JSON.parse(data[0][2]);
        const flightInfo = JSON.parse(data[1][2]);
    
        const flights: { [key: string]: Flight } = flightInfo[4][0].reduce((info: any, listing: any) => ({
            ...info,
            [listing[0]]: {
                price: listing[1]?.[0][1] ?? 0,
                stops: listing[6][2],
                length: listing[6][3] || 0,
                lengthString: `${Math.floor(listing[6][3] / 60)} hr ${listing[6][3] % 60} min` || 'N/A',
                iata: listing[6][0],
                airline: listing[6][1] || 'N/A',
                airlineLogoUrl: `https://www.gstatic.com/flights/airline_logos/70px/dark/${listing[6][0]}.png`,
                arrivalAirport: listing[6][5] || 'N/A',
                departureAirportIdentifier: listing[6][6] || 'N/A'
            }
        }), {});
    
        const cities: FlightDiscoverResult[] = cityInfo[3][0].map((info: string[]) => ({
            identifier: info[0],
            coordinates: info[1],
            city: info[2],
            country: info[4],
            listingPictureUrl: info[3],
            coverPictureUrl: info[7],
            outboundDate: info[11],
            returnDate: info[12],
            flight: flights[info[0]]
        }));

        return cities.filter(city => city.flight?.length > 0);
    }

    async search(flight?: FlightResult): Promise<FlightSearchResult> {
        if (!this.config.originIdentifier)
            throw new Error('Outbound identifier required');

        if (!this.config.outboundDate || !this.config.outboundDate.match(/^\d{4}-\d{2}-\d{2}$/))
            throw new Error('Outbound date absent or malformed (YYYY-mm-dd)');

        if (this.config.roundtrip) {
            if (!this.config.destinationIdentifier)
                throw new Error('Return identifier required for roundtrip');

            if (!this.config.returnDate || !this.config.returnDate.match(/^\d{4}-\d{2}-\d{2}$/))
                throw new Error('Return date absent or malformed (YYYY-mm-dd)');
        }
        
        const data = await fetch(
            'https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetShoppingResults', 
            { method: 'POST', body: this.generatePayload('search', flight && [ flight ]) }
        ).then(GoogleFlightsAPI.parseResult).then(res => JSON.parse(res[0][2]));

        const additionalInfo = data[7];

        if (!data[2] && !data[3])
            return { flights: [], trendData: null };
    
        const bestFlights = data[2]?.[0] ?? [];
        const otherFlights = data[3]?.[0] ?? [];
        
        const getFlightInfo = (f: any) => ({
            airlineCode: f[0][0],
            airlines: f[0][1],
            legs: f[0][2].map((info: any) => ({
                airlineOperator: info[2],
                departure: {
                    airport: {
                        code: info[3],
                        name: info[4]
                    },
                    time: {
                        hours: info[8][0] ?? 0,
                        minutes: info[8][1] ?? 0
                    },
                    date: {
                        year: info[20][0],
                        month: info[20][1],
                        day: info[20][2]
                    },
                },
                arrival: {
                    airport: {
                        code: info[6],
                        name: info[5]
                    },
                    time: {
                        hours: info[10][0] ?? 0,
                        minutes: info[10][1] ?? 0
                    },
                    date: {
                        year: info[21][0],
                        month: info[21][1],
                        day: info[21][2]
                    },
                },
                duration: info[11],
                legroom: info[14],
                aircraft: info[17].length ? info[17] : null,
                flightNumber: {
                    code: info[22][0],
                    number: info[22][1],
                    name: info[22][3]
                },
                emissions: info[31],
                amenities: (() => {
                    const list = info[12];
                    if (!list) return null;
                    const wifi = list.splice(-1)[0];
                    return {
                        ..._.zipObject([
                            'u1', 'powerUSB', 'u3',
                            'powerOutlet', 'u5', 'u6',
                            'u7', 'u8', 'liveTV',
                            'u10', 'streamMedia'
                        ], info[12].map((v: any) => v !== null)),
                        wifiFree: wifi === 2,
                        wifiPaid: wifi === 3
                    };
                })(),
                // legroomType: info[13]
            })),
            departure: {
                airport: {
                    code: f[0][3],
                    name: null
                },
                date: {
                    year: f[0][4][0],
                    month: f[0][4][1],
                    day: f[0][4][2]
                },
                time: {
                    hours: f[0][5][0] ?? 0,
                    minutes: f[0][5][1] ?? 0
                }
            },
            arrival: {
                airport: {
                    code: f[0][6],
                    name: null
                },
                date: {
                    year: f[0][7][0],
                    month: f[0][7][1],
                    day: f[0][7][2]
                },
                time: {
                    hours: f[0][8][0] ?? 0,
                    minutes: f[0][8][1] ?? 0
                }
            },
            duration: f[0][9],
            price: f[1][0][1] ?? null
        });

        return {
            flights: bestFlights.concat(otherFlights).map(getFlightInfo),
            trendData: data[5] && {
                lowestPrice: data[5][1][1],
                usualPrice: data[5][2][1],
                difference: data[5][3][1],
                lowThreshold: data[5][4][1],
                highThreshold: data[5][5][1],
                trends: data[5][10][0],
                cityName: data[5][12]
            } as TrendData
        };
    }

    async book(flights: FlightResult[]): Promise<BookingResult> {
        const data = await fetch(
            'https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetBookingResults', 
            { method: 'POST', body: this.generatePayload('booking', flights) }
        ).then(GoogleFlightsAPI.parseResult).then(res => res[1][2] ? JSON.parse(res[1][2])[1] : null);

        if (!data[0])
            return { bookings: [], trendData: null };

        const extractBookingData = (datum: any) => ({
            vendor: datum[1][0][1],
            vendorCode: datum[1][0][0],
            vendorHomepage: datum[5]?.[0],
            link: datum[5]?.[2][0],
            linkData: datum[5]?.[2][1],
            price: datum[7]?.[0][1],
            fareType: datum[14]?.[0][0][1]?.[1] ?? null,
            separateBookings: datum[2]?.map(extractBookingData)
        });

        return {
            bookings: data[0].filter((datum: any) => datum[0] === 0 || datum[0] === 5)
                .map(extractBookingData),
            trendData: data[12] && {
                lowestPrice: data[12][1][1],
                usualPrice: data[12][2][1],
                difference: data[12][3][1],
                lowThreshold: data[12][4][1],
                highThreshold: data[12][5][1],
                trends: data[12][10][0],
                cityName: data[12][12]
            }
        };
    }

    static getBookingLink = async (link: string, linkData: [ [ string, string ] ]) => 
        fetch(link, { method: 'POST', body: new URLSearchParams(linkData) })
            .then(res => res.text())
            .then(str => str.slice(str.indexOf('\'') + 1, str.lastIndexOf('\'')).replaceAll('&amp;', '&'));
}