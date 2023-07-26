import { Node, Cheerio, load, AnyNode, Element } from "cheerio";
import { BookingInfo, Flight, FlightDiscoverParams, FlightDiscoverResult, FlightLeg, FlightSearchParams, FlightSearchResult, SeatClass, Stops } from "./types/google/FlightSearchResults";
import LocationSearchResult from "./types/google/LocationSearchResult";
import { checkDepArrDates } from "./utils";
import { writeFile, readFile } from "fs/promises";
import _ from "lodash";

const GoogleParseResult = async (res: Response) => res.text()
    .then(text => JSON.parse(text.replace(")]}'\n\n", '')));

export const GoogleGetXSRF = async () => {
    const json = await fetch('https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetExploreDestinations', {
        method: 'POST'
    }).then(GoogleParseResult);

    return json;
}

export const GoogleLocationSearch = async (search: string): Promise<LocationSearchResult> => {
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
    }).then(GoogleParseResult);
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

export const GoogleFlightExplore = async ({
    outboundIdentifier, outboundDate, outboundTimes,
    returnIdentifier, returnDate, returnTimes,
    stops = Stops.ANY, duration,
    roundtrip = true,
    passengers,
    seatClass = SeatClass.ECONOMY,
    maxPrice,
    alliances = []
}: FlightDiscoverParams) => {
    if (!outboundIdentifier)
        throw new Error('Outbound identifier required');

    if (
        outboundDate && returnDate 
            && 
        (
            !outboundDate.match(/^\d{4}-\d{2}-\d{2}$/) 
                || 
            !returnDate.match(/^\d{4}-\d{2}-\d{2}$/)
        )
    ) throw new Error('Outbound or return date not formatted correctly (YYYY-MM-DD)');

    const query = [
        [], 
        // [
        //     [53.965321266094115,-76.56689542531967],
        //     [9.117596690254018,-131.10302823781967]
        // ], 
        null,
        null, 
        [
            null, null, roundtrip ? 1 : 2, null, [],
            seatClass, 
            [
                passengers?.adults ?? 1,
                passengers?.children ?? 0,
                passengers?.infantsOnLap ?? 0,
                passengers?.infantsInSeat ?? 0
            ],
            maxPrice && [
                null, maxPrice
            ], 
            null, null, null, null, null,
            [
                [
                    [[[
                        outboundIdentifier,
                        4
                    ]]],
                    [ [] ],
                    outboundTimes?.departure.concat(outboundTimes.arrival) ,
                    stops, 
                    alliances, 
                    [],
                    outboundDate,
                    duration && [ duration ], 
                    [], [], [], null, null, [], 3
                ],
                ...(roundtrip ? [
                    [
                        [ [] ], 
                        [[[
                            returnIdentifier,
                            4
                        ]]],
                        returnTimes?.departure.concat(returnTimes.arrival),
                        stops, 
                        alliances, 
                        [],
                        returnDate,
                        duration && [ duration ],
                        [], [], [], null, null, [], 3
                    ]
                ] : [])
            ],
            null, null, null, 1, null, null, null, null, null, [], 1, 1
        ], 
        null, 1, null, 0, null, 0, [ 1088 , 1256 ]
        //1241.3333740234375
    ];

    // console.log(JSON.stringify(query))

    const body = new URLSearchParams({
		'f.req': JSON.stringify([
            null,
            JSON.stringify(query)
        ])
	});
	
	const json = await fetch('https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetExploreDestinations', {
        method: 'POST', body
    }).then(GoogleParseResult);

    const cityInfo = JSON.parse(json[0][2]);
    const flightInfo = JSON.parse(json[1][2]);

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
    }), {})

    const cities: FlightDiscoverResult[] = cityInfo[3][0].map((info: string[]) => ({
        identifier: info[0],
        coordinates: info[1],
        city: info[2],
        country: info[4],
        listingPictureUrl: info[3],
        coverPictureUrl: info[7],
        flight: flights[info[0]]
    }))    
   
    // const bounds = cities[2][1];
    // const [id1] = cities[3][0][0];
    // const [id2] = cities[3][0][1];
    // const [id3] = cities[3][0][2];
    // const searchLocation = cities[6];

    // const base = flights[4][0].find((test: any) => test[0] === id1)[1][1];
    // console.log(Buffer.from(base, 'base64').toString('utf-8'))
    // console.log(flights[4][0].find((test: any) => test[0] === id1))
    // console.log(flights[4][0].find((test: any) => test[0] === id2))
    // console.log(flights[4][0].find((test: any) => test[0] === id3))

    // console.log( flightInfo[4][0].find((x: any) => x[0] === cities[1].identifier))
    // console.log(cities.filter(city => city.flight?.length > 0).slice(0, 5));

    return cities.filter(city => city.flight?.length > 0);
}

const generatePayload = ({
    outboundIdentifier, outboundDate, outboundTimes,
    returnIdentifier, returnDate, returnTimes,
    stops = Stops.ANY, duration,
    roundtrip = true,
    passengers,
    seatClass = SeatClass.ECONOMY,
    maxPrice,
    alliances = [],
    booking
}: FlightSearchParams) => {
    const strToASCII = (str: string) => Array.from(str).map(x => x.charCodeAt(0));

    if (
        outboundDate && returnDate 
            && 
        (
            !outboundDate.match(/^\d{4}-\d{2}-\d{2}$/) 
                || 
            !returnDate.match(/^\d{4}-\d{2}-\d{2}$/)
        )
    ) throw new Error('Outbound or return date not formatted correctly (YYYY-MM-DD)');

    const header = [ 0x08, 0x1c, 0x10, 0x02 ];
    
    const date = strToASCII(outboundDate);
    const departureId = strToASCII(outboundIdentifier);
    const arrivalId = strToASCII(returnIdentifier);

    const bookingBytes = booking ? (() => {
        const departureAirport = strToASCII(booking.departureAirport);
        const arrivalDate = strToASCII(booking.arrivalDate);
        const arrivalAirport = strToASCII(booking.arrivalAirport);
        const flightCode = strToASCII(booking.flightNumber.code);
        const flightNumber = strToASCII(booking.flightNumber.number);
        return [
            0x22, 0x20,
            0x0a, 0x03, ...departureAirport,
            0x12, 0x0a, ...arrivalDate,
            0x1a, 0x03, ...arrivalAirport,
            0x2a, 0x02, ...flightCode,
            0x32, 0x04, ...flightNumber
        ];
    })() : [];

    const section = [
        0x12, 0x0a, ...(booking ? strToASCII(booking.departureDate) : date), 
        ...bookingBytes,
        0x6a, 0x0c, 0x08, 0x02, 0x12, 0x08, ...departureId, 
        0x72, 0x0e, 0x08, 0x02, 0x12, 0x0a, ...arrivalId
    ];

    const sectionSize = [0x1a, section.length];

    const passengerType: { [key: string]: number } = {
        adults: 1,
        children: 2,
        infantsOnLap: 3,
        infantsOnSeat: 4
    }

    const passengerBytes = Object.entries(passengers).reduce((arr: number[], [type, quantity]) =>
        arr.concat(
            Array.from(Array(quantity).keys()).map(() => [0x40, passengerType[type]]).flat()
        ), []);
    
    const seatClassBytes = [ 0x48, seatClass ];

    const otherBytes = [
        0x70, 0x01, 0x82, 0x01, 0x0b, 0x08, 0xff, 0xff, 
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01, 
        0x98, 0x01
    ];

    // console.log(Buffer.from(header.concat(sectionSize, section, passengerBytes, seatClassBytes, otherBytes, roundtrip ? 1 : 2)).toString('hex'))
    return Buffer.from(header.concat(sectionSize, section, passengerBytes, seatClassBytes, otherBytes, roundtrip ? 1 : 2)).toString("base64url");
}

export const GoogleFlightSearch = async (params: FlightSearchParams): Promise<FlightSearchResult[]> => {
    /*
    081c1002                                header
    1a 2a                                   section length (42)
    120a 323032332d30382d3231               date (2023-08-21)
    28 00                                   [optional] nonstop
    32 02 4153                              [optional] airline (AS)
    32 02 4141                                                 (AA)
    32 0d 535441525f414c4c49414e4345        [optional] alliance (STAR_ALLIANCE)
    40 00 48 17 50 00 58 17                 [optional] times (dep. 12AM-12PM, arr. 12AM-12PM)
    60 ac02                                 [optional] duration (under 5 hr) buf.writeInt16LE(((i * 15 + 32 * (Math.floor(i/2) + 1))) * 4)
    6a0c 080212 08 2f6d2f3064366c70         departure id (/m/0d6lp)
    720e 080212 0a 2f6d2f30333071623374     arrival id (/m/030qb3t)
    7a03 424f49                             [optional] connecting airports (BOI)
    7a03 414251                                                            (ABQ)
    8801 96 01                              [optional] layover duration (30) let bit = Math.floor(i / 128)
    9001 1e                                                                  i - ((bit - 1) * 128)

    40 01                                   passengers (adult)
    40 02                                              (child)
    40 04                                              (infantInSeat)
    40 03                                              (infantOnLap)
    4801                                    economy
    60 c801                                 [optional] up to $200 buf.writeInt16LE(((i / 200 * 41) + (16 * (Math.floor(i / 400) + 1))) * 8)
    700182010b08ffffffffffffffffff019801
    02                                      oneway
    */
        
    const payload = generatePayload(params);
    // console.log('https://www.google.com/travel/flights/search?tfs=' + payload.toString())
    const raw = await fetch('https://www.google.com/travel/flights/search?tfu=EgYIARABGAA&tfs=' + payload.toString(), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
    }).then(res => res.text());
    // const data = await readFile('./test.html');
    // await writeFile('test.html', data)
    
    const $ = load(raw);
    // const recursiveTextFinder = (textSet: Set<string>, nodes: any[]) => {
    //     nodes.forEach(el => {
    //         if (el.type === 'text')
    //         textSet.add($(el).text());
    //         else if (el.children.length > 0)
    //         recursiveTextFinder(textSet, el.children);
    //     });
    // }
    
    // const listings = $('.pIav2d').toArray().map(el => {
    //     const textSet: Set<string> = new Set();
    //     recursiveTextFinder(textSet, el.children);
    //     const values = [...textSet];
    //     // return values;
    //     let i = 0;
    //     const departureTime = values[i++];
    //     i++;
    //     i++;
    //     const arrivalTime = values[i++];
    //     const overnight = values[i] === '+1';
    //     if (overnight) i++;
    //     i++;
    //     const separateTickets = values[i].includes('Separate');
    //     if (separateTickets) i += 3;
    //     const airlineName = values[i++];
    //     const airlineOperator = values[i].includes('Operated') ? values[i++] : null;
    //     const totalDuration = values[i++];
    //     const departureAirportCode = values[i++];
    //     const departureAirportName = values[i++];
    //     i++;
    //     const arrivalAirportCode = values[i++];
    //     const arrivalAirportName = values[i++];
    //     const stops = values[i++] === 'Nonstop' ? 0 : parseInt(values[i - 1].slice(0, 1));
    //     const layovers = [];
    //     const airportStopCodes = [];
    //     const airportStopNames = [];
    //     for (let j = 0; j < stops; j++) {
    //         while (values[i].includes('layover')) i++;
    //         layovers[j] = values[i++];
    //         airportStopCodes[j] = values[i++];
    //         airportStopNames[j] = values[i++];
    //     }
    //     const emissions = values[i++] + values[i++];
    //     const emissionsDifference = values[i++];
    //     const bagsFilter = !values[i].includes('$') && !values[i].includes('Price');
    //     if (bagsFilter) i += 3;
    //     const price = parseInt(values[i++].slice(1));
    //     i++;
    //     const date = values[i++];
    //     const airlineLogo = $(el).find('.EbY4Pc').attr()?.style.match(/\(([^)]+)\)/)?.[0].slice(1, -1);

    //     return {
    //         departureTime,
    //         arrivalTime,
    //         airlineLogo,
    //         airlineName,
    //         airlineOperator,
    //         separateTickets,
    //         departureAirportCode,
    //         departureAirportName,
    //         arrivalAirportCode,
    //         arrivalAirportName,
    //         overnight,
    //         stops,
    //         layovers,
    //         airportStopCodes,
    //         airportStopNames,
    //         emissions,
    //         emissionsDifference,
    //         bagsFilter,
    //         price,
    //         date,
    //         totalDuration
    //     }
    // });

    const script = $('script').toArray().map(el => $(el).text())[22];
    const data = JSON.parse(script.slice(script.indexOf('['), script.lastIndexOf(']') + 1));
    const bestFlights = data[2][0];
    const otherFlights = data[3][0];

    // console.dir(bestFlights[0], { depth: Infinity })
    
    const getFlightInfo = (f: any): FlightSearchResult => ({
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

    // console.dir(bestFlights[0], { depth: Infinity })
    // console.dir(otherFlights[0], { depth: Infinity })
    // console.dir(bestFlights.map(getFlightInfo), { depth: Infinity })

    // console.log(bestFlights[0][0][2][0])

    return bestFlights.concat(otherFlights).map(getFlightInfo);
}

export const GoogleBookFlight = async (params: FlightSearchParams, leg: FlightLeg): Promise<BookingInfo[]> => {
    /*
        081c1002 
        1a 4c 
        120a 32 30 32 33 2d 30 38 2d 32 31 
        2220 
        0a03 53 46 4f 
        120a 32 30 32 33 2d 30 38 2d 32 31 
        1a03 4c 41 58 
        2a02 41 53 
        3204 33 34 33 30 
        6a0c 080212 08 2f 6d 2f 30 64 36 6c 70 
        720e 080212 0a 2f 6d 2f 30 33 30 71 62 33 74 
        40 01
        48 01 
        7001 82010b08ffffffffffffffffff01
        9801 02
    */
    
    const transformDate = ({ year, month, day }: {
        year: number;
        month: number;
        day: number;
    }) => `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`;

    // params.booking = {
    //     departureDate: transformDate(leg.departure.date),
    //     departureAirport: leg.departure.airport.code,
    //     arrivalDate: transformDate(leg.arrival.date),
    //     arrivalAirport: leg.arrival.airport.code,
    //     flightNumber: leg.flightNumber
    // }

    // console.log('https://www.google.com/travel/flights/booking?tfs=' + generatePayload(params))

    // const data1 = console.dir(JSON.parse(res), { depth: Infinity })

    const newParams = new URLSearchParams({
        'f.req': JSON.stringify([
            null, JSON.stringify([
                [], 
                [
                    null, null, 
                    params.roundtrip ? 1 : 2, 
                    null, [], 
                    params.seatClass, 
                    [
                        params.passengers.adults ?? 1,
                        params.passengers.children ?? 0,
                        params.passengers.infantsOnLap ?? 0,
                        params.passengers.infantsInSeat ?? 0
                    ], 
                    null, null, null, null, null, null, 
                    [
                        [
                            [
                                [
                                    [ params.outboundIdentifier, 4 ]
                                ]
                            ],
                            [
                                [
                                    [ params.returnIdentifier, 4 ]
                                ]
                            ],
                            null, 0, [], [], params.outboundDate, null,
                            [
                                [
                                    leg.departure.airport.code, transformDate(leg.departure.date),
                                    leg.arrival.airport.code, null, 
                                    leg.flightNumber.code, leg.flightNumber.number
                                ]
                            ],
                            [], [], null, null, [], 3
                        ]
                    ],
                    null, null, null, 1, null, null, null, null, null, []
                ]
            ])
        ])
    })

    const data = await fetch('https://www.google.com/_/TravelFrontendUi/data/travel.frontend.flights.FlightsFrontendService/GetBookingResults', {
        method: 'POST',
        body: newParams
    }).then(GoogleParseResult).then(res => JSON.parse(res[1][2])[1][0]);

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

export const getBookingLink = async ({ link, linkData }: BookingInfo) => fetch(link, {
    method: 'POST',
    body: new URLSearchParams(linkData)
}).then(res => res.text())
    .then(str => str.slice(str.indexOf('\'') + 1, str.lastIndexOf('\'')).replaceAll('&amp;', '&'));