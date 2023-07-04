import FlightSearchResult, { Flight, FlightSearchParams, Stops } from "./types/google/FlightSearchResults";
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
    departureIdentifier, arrivalIdentifier, 
    departureDate, arrivalDate,
    stops = Stops.ANY, duration,
    roundtrip = true
}: FlightSearchParams) => {
    if (departureDate && arrivalDate)
        checkDepArrDates(departureDate, arrivalDate);
    else if (departureDate && !arrivalDate && !departureDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
		throw new Error('Check in date not formatted correctly (YYYY-MM-DD)');
    } else if (arrivalDate && !departureDate) {

    }
    const query = [
        [], 
        // [
        //     [53.965321266094115,-76.56689542531967],
        //     [9.117596690254018,-131.10302823781967]
        // ], 
        null,
        null, 
        [
            null, null, roundtrip ? 1 : 2, null, [], 1, [1,0,0,0],
            null, null, null, null, null, null,
            [
                [
                    [[[
                        departureIdentifier,
                        4
                    ]]],
                    [ [] ],
                    null, stops, [], [],
                    "2023-07-17",
                    duration ? [ duration ] : null, 
                    [], [], [], null, null, [], 3
                ],
                ...(roundtrip ? [
                    [
                        [ [] ], 
                        [[[
                            departureIdentifier,
                            4
                        ]]],
                        null, stops, [], [],
                        "2023-07-21",
                        duration ? [ duration ] : null
                        , [], [], [], null, null, [], 3
                    ]
                ] : [])
            ],
            null, null, null, 1, null, null, null, null, null, [], 1, 1
        ], 
        null, 1, null, 0, null, 0, [ 1241.3333740234375, 1256 ]
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
            price: listing[1]?.[0][1] ?? 'N/A',
            stops: listing[6][2],
            length: listing[6][3] || 'N/A',
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
    console.log(cities[0]);

    // return results;
}