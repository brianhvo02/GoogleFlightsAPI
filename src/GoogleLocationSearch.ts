import { LocationSearchResult } from "./types/locations";
import { parseResult } from "./utils.js";

const GoogleLocationSearch = async (search: string): Promise<LocationSearchResult> => {
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
    }).then(parseResult).then(res => JSON.parse(res[0][2])[0]);

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

export default GoogleLocationSearch;