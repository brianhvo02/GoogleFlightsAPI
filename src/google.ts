import FlightSearchResult, { Flight, FlightSearchParams, SeatClass, Stops } from "./types/google/FlightSearchResults";
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

export const GoogleSearch = async ({
    outbound, returning,
    stops = Stops.ANY, duration,
    roundtrip = true,
    passengers,
    seatClass = SeatClass.ECONOMY,
    maxPrice,
    alliances = []
}: FlightSearchParams) => {
    if (!outbound.identifier)
        throw new Error('Outbound identifier required');

    if (
        outbound.date && returning?.date 
            && 
        (
            !outbound.date.match(/^\d{4}-\d{2}-\d{2}$/) 
                || 
            !returning.date.match(/^\d{4}-\d{2}-\d{2}$/)
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
                        outbound.identifier,
                        4
                    ]]],
                    [ [] ],
                    outbound.times?.departure.concat(outbound.times.arrival) ,
                    stops, 
                    alliances, 
                    [],
                    outbound.date,
                    duration && [ duration ], 
                    [], [], [], null, null, [], 3
                ],
                ...(roundtrip ? [
                    [
                        [ [] ], 
                        [[[
                            returning?.identifier,
                            4
                        ]]],
                        returning?.times?.departure.concat(returning.times.arrival),
                        stops, 
                        alliances, 
                        [],
                        returning?.date,
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
    console.log(cities.filter(city => city.flight?.length > 0).slice(0, 5));

    // return results;
}