import FlightSearchResult, { Flight, FlightDiscoverParams, FlightSearchParams, SeatClass, Stops } from "./types/google/FlightSearchResults";
import LocationSearchResult from "./types/google/LocationSearchResult";
import { checkDepArrDates } from "./utils";

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

export const GoogleExplore = async ({
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

    console.log(JSON.stringify(query))

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

    const cities: FlightSearchResult[] = cityInfo[3][0].map((info: string[]) => ({
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

    // return results;
}

export const GoogleSearch = async ({
    outboundIdentifier, outboundDate, outboundTimes,
    returnIdentifier, returnDate, returnTimes,
    stops = Stops.ANY, duration,
    roundtrip = true,
    passengers,
    seatClass = SeatClass.ECONOMY,
    maxPrice,
    alliances = []
}: FlightSearchParams) => {
    /*
    081c1002                                header
    1a 2a                                   section length (42)
    120a
    323032332d30382d3231                    date (2023-08-21)
    28 00                                   [optional] nonstop
    32 02 4153                              [optional] airline (AS)
    32 02 4141                                                 (AA)
    32 0d 535441525f414c4c49414e4345        [optional] alliance (STAR_ALLIANCE)
    40 00 48 17 50 00 58 17                 [optional] times (dep. 12AM-12PM, arr. 12AM-12PM)
    60 ac02                                 [optional] duration (under 5 hr) buf.writeInt16LE(((i * 15 + 32 * (Math.floor(i/2) + 1))) * 4)
    6a
    0c 080212 08 2f6d2f3064366c70 72        departure id (/m/0d6lp)
    0e 080212 0a 2f6d2f30333071623374       arrival id (/m/030qb3t)
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

    const section = [
        0x12, 0x0a, ...date, 
        0x6a,
        0x0c, 0x08, 0x02, 0x12, 0x08, ...departureId, 0x72,
        0x0e, 0x08, 0x02, 0x12, 0x0a, ...arrivalId
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
    
    const payload = Buffer.from(header.concat(sectionSize, section, passengerBytes, seatClassBytes, otherBytes, roundtrip ? 1 : 2)).toString("base64url");

    const test = await fetch('https://www.google.com/travel/flights/search?tfs=' + payload).then(res => res.text());
    return test
}