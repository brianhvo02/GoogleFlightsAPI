import _ from "lodash";
import { BookingInfo, Flight, FlightDiscoverResult, FlightLeg, FlightSearchResult, GoogleFlightsConfig, LocationSearchResult, SeatClass, Stops } from "./types/GoogleFlightsAPI";

const transformDate = ({ year, month, day }: {
    year: number;
    month: number;
    day: number;
}) => `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`;

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
        const innerQuery = [
            search,
            [ 1, 2, 3, 5 ],
            null, [ 2 ], 2
        ];
    
        const query = [
            [
                [
                    'H028ib',
                    JSON.stringify(innerQuery),
                    null,
                    'generic'
                ]
            ]
        ];
    
        const body = new URLSearchParams({
            'f.req': JSON.stringify(query)
        });
        
        const json = await fetch('https://www.google.com/_/TravelFrontendUi/data/batchexecute', {
            method: 'POST', body
        }).then(this.parseResult);
        const results = JSON.parse(json[0][2])[0];
    
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

    async explore() {
        // TODO: Implement no dates

        if (this.config.roundtrip) {
            if (
                !((this.config.outboundDate && this.config.returnDate) 
                    || 
                (!this.config.outboundDate && !this.config.returnDate))
            ) throw new Error('Outbound or return date absent');
    
            if (
                (this.config.outboundDate && this.config.returnDate) 
                    &&
                (
                    !this.config.outboundDate.match(/^\d{4}-\d{2}-\d{2}$/)
                        || 
                    !this.config.returnDate.match(/^\d{4}-\d{2}-\d{2}$/)
                )
            ) throw new Error('Outbound or return date malformed (YYYY-MM-DD)');
        } else {
            if (this.config.outboundDate && !this.config.outboundDate.match(/^\d{4}-\d{2}-\d{2}$/))
                throw new Error('Outbound date malformed (YYYY-MM-DD)');
        }

        const body = new URLSearchParams({
            'f.req': JSON.stringify([
                null,
                JSON.stringify([
                    [], null, null, 
                    [
                        null, null, this.config.roundtrip ? 1 : 2, null, [],
                        this.config.seatClass, 
                        [
                            this.config.passengers?.adults ?? 1,
                            this.config.passengers?.children ?? 0,
                            this.config.passengers?.infantsOnLap ?? 0,
                            this.config.passengers?.infantsInSeat ?? 0
                        ],
                        this.config.maxPrice && [
                            null, this.config.maxPrice
                        ], 
                        null, null, null, null, null,
                        [
                            [
                                [[[
                                    this.config.originIdentifier,
                                    4
                                ]]],
                                [ [] ],
                                this.config.outboundTimes?.departure.concat(this.config.outboundTimes.arrival) ,
                                this.config.stops, 
                                this.config.alliances, 
                                [],
                                this.config.outboundDate,
                                this.config.duration && [ this.config.duration ], 
                                [], [], [], null, null, [], 3
                            ],
                            ...(this.config.roundtrip ? [
                                [
                                    [ [] ], 
                                    [[[
                                        this.config.destinationIdentifier ?? this.config.originIdentifier,
                                        4
                                    ]]],
                                    this.config.returnTimes?.departure.concat(this.config.returnTimes.arrival),
                                    this.config.stops, 
                                    this.config.alliances, 
                                    [],
                                    this.config.returnDate,
                                    this.config.duration && [ this.config.duration ],
                                    [], [], [], null, null, [], 3
                                ]
                            ] : [])
                        ],
                        null, null, null, 1, null, null, null, null, null, [], 1, 1
                    ], 
                    null, 1, null, 0, null, 0, [ 1088 , 1256 ]
                    //1241.3333740234375
                ])
            ])
        });
        
        const data = await fetch('https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetExploreDestinations', {
            method: 'POST', body
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
                arrivalAirportIdentifier: listing[6][6] || 'N/A'
            }
        }), {});
    
        const cities: FlightDiscoverResult[] = cityInfo[3][0].map((info: string[]) => ({
            identifier: info[0],
            coordinates: info[1],
            city: info[2],
            country: info[4],
            listingPictureUrl: info[3],
            coverPictureUrl: info[7],
            flight: flights[info[0]]
        }));

        return cities.filter(city => city.flight?.length > 0);
    }

    async search(leg?: FlightLeg): Promise<FlightSearchResult[]> {
        if (!this.config.originIdentifier)
            throw new Error('Outbound identifier required');

        if (!this.config.outboundDate || !this.config.outboundDate.match(/^\d{4}-\d{2}-\d{2}$/))
            throw new Error('Outbound date absent or malformed (YYYY-MM-DD)');

        if (this.config.roundtrip) {
            if (!this.config.destinationIdentifier)
                throw new Error('Return identifier required for roundtrip');

            if (!this.config.returnDate || !this.config.returnDate.match(/^\d{4}-\d{2}-\d{2}$/))
                throw new Error('Return date absent or malformed (YYYY-MM-DD)');
        }

        // [
        //     [
        //         null,"CjRIdzdSdHNaVkpkWWNBRFhVR1FCRy0tLS0tLS0tcGZiYnEyNUFBQUFBR1RBNEM0QmxIX0NBEgZVQTExNDAaCgioUBACGgNVU0Q4HXCoUA==",
        //         null,
        //         null
        //     ],
        //     [
        //         null, null,
        //         1,
        //         null,[],
        //         1,
        //         [1,0,0,0],
        //         null,null,null,null,null,null,
        //         [[[[["/m/0d6lp",4]]],[[["/m/030qb3t",4]]],null,0,[],[],"2023-08-21",null,
        //         [
        //             [
        //                 "SFO", "2023-08-21", "LAX", null, "UA", "1140"
        //             ]
        //         ],[],[],null,null,[],3],[[[[\"/m/030qb3t\",4]]],[[[\"/m/0d6lp\",4]]],null,0,[],[],\"2023-08-25\",null,[],[],[],null,null,[],3]],null,null,null,1,null,null,null,null,null,[]],1,0,0]

        const body = new URLSearchParams({
            'f.req': JSON.stringify([
                null, JSON.stringify([
                    [],
                    [
                        null, null,
                        this.config.roundtrip ? 1 : 2, 
                        null, [], 
                        this.config.seatClass, 
                        [
                            this.config.passengers.adults ?? 1,
                            this.config.passengers.children ?? 0,
                            this.config.passengers.infantsOnLap ?? 0,
                            this.config.passengers.infantsInSeat ?? 0
                        ], 
                        null, null, null, null, null, null,
                        [
                            [
                                [
                                    [
                                        [ this.config.originIdentifier, 4 ]
                                    ]
                                ],
                                [
                                    [
                                        [ this.config.destinationIdentifier, 4 ]
                                    ]
                                ],
                                null, 0, [], [], this.config.outboundDate, null, 
                                leg ? [
                                    [
                                        leg.departure.airport.code, transformDate(leg.departure.date),
                                        leg.arrival.airport.code, null, 
                                        leg.flightNumber.code, leg.flightNumber.number
                                    ]
                                ] : [],
                                [], [], null, null, []
                            ],
                            ...(this.config.roundtrip ? [
                                [
                                    [
                                        [
                                            [ this.config.destinationIdentifier, 4 ]
                                        ]
                                    ],
                                    [
                                        [
                                            [ this.config.originIdentifier, 4 ]
                                        ]
                                    ],
                                    null, 0, [], [], this.config.returnDate, null, 
                                    [],
                                    [], [], null, null, [], 1
                                ]
                            ] : [])
                        ], null, null, null, 1, null, null, null, null, null, []
                    ], 1, 0, 0
                ])
            ])
        })
        
        const data = await fetch(
            'https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetShoppingResults', 
            { method: 'POST', body}
        ).then(GoogleFlightsAPI.parseResult).then(res => JSON.parse(res[0][2]));
    
        const bestFlights = data[2][0];
        const otherFlights = data[3][0];
        // console.dir(bestFlights[0], { depth: Infinity })
        
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
    
        return bestFlights.concat(otherFlights).map(getFlightInfo);
    }

    async book(flights: FlightSearchResult[]): Promise<BookingInfo[]> {
        const body = new URLSearchParams({
            'f.req': JSON.stringify([
                null, JSON.stringify([
                    [], 
                    [
                        null, null, 
                        this.config.roundtrip ? 1 : 2, 
                        null, [], 
                        this.config.seatClass, 
                        [
                            this.config.passengers.adults ?? 1,
                            this.config.passengers.children ?? 0,
                            this.config.passengers.infantsOnLap ?? 0,
                            this.config.passengers.infantsInSeat ?? 0
                        ], 
                        null, null, null, null, null, null, 
                        [
                            [
                                [
                                    [
                                        [ this.config.originIdentifier, 4 ]
                                    ]
                                ],
                                [
                                    [
                                        [ this.config.destinationIdentifier, 4 ]
                                    ]
                                ],
                                null, 0, [], [], this.config.outboundDate, null,
                                [
                                    [
                                        flights[0].legs[0].departure.airport.code, transformDate(flights[0].legs[0].departure.date),
                                        flights[0].legs[0].arrival.airport.code, null, 
                                        flights[0].legs[0].flightNumber.code, flights[0].legs[0].flightNumber.number
                                    ]
                                ],
                                [], [], null, null, [], 3
                            ],
                            ...(this.config.roundtrip ? [
                                [
                                    [
                                        [
                                            [ this.config.destinationIdentifier, 4 ]
                                        ]
                                    ],
                                    [
                                        [
                                            [ this.config.originIdentifier, 4 ]
                                        ]
                                    ],
                                    null, 0, [], [], this.config.returnDate, null,
                                    [
                                        [
                                            flights[1].legs[0].departure.airport.code, transformDate(flights[1].legs[0].departure.date),
                                            flights[1].legs[0].arrival.airport.code, null, 
                                            flights[1].legs[0].flightNumber.code, flights[1].legs[0].flightNumber.number
                                        ]
                                    ],
                                    [], [], null, null, [], 3
                                ]
                            ] : [])
                        ],
                        null, null, null, 1, null, null, null, null, null, []
                    ]
                ])
            ])
        });
        
        const data = await fetch(
            'https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetBookingResults', 
            { method: 'POST', body }
        ).then(GoogleFlightsAPI.parseResult).then(res => JSON.parse(res[1][2])[1][0]);
    
        return data.filter((datum: any) => datum[0] === 0).map((datum: any) => ({
            vendor: datum[1][0][1],
            vendorCode: datum[1][0][0],
            vendorHomepage: datum[5][0],
            link: datum[5][2][0],
            linkData: datum[5][2][1],
            price: datum[7][0][1],
            fareType: datum[14][0][0][1][1] ?? null
        }));
    }

    static getBookingLink = async ({ link, linkData }: BookingInfo) => 
        fetch(link, { method: 'POST', body: new URLSearchParams(linkData) })
            .then(res => res.text())
            .then(str => str.slice(str.indexOf('\'') + 1, str.lastIndexOf('\'')).replaceAll('&amp;', '&'));
}