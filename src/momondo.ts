import FlightResultsList from "./types/momondo/FlightResultList";
import { checkCode, checkDepArrDates } from "./utils";

export interface MomondoSearchParams {
    depCode: string;
    arrCode: string;
    depDate: string;
    arrDate: string;
}

export const airportSearch = async (query: string) => fetch(`https://www.momondo.com/mvm/smartyv2/search?s=airportonly&where=${query}`, { method: 'POST' }).then(res => res.json());

const MomondoSearch = async (params: MomondoSearchParams): Promise<FlightResultsList | undefined> => {
    const { depCode, arrCode, depDate, arrDate } = params;

    if (!checkCode(depCode) || !checkCode(arrCode)) {
        throw new Error('depCode or arrCode incorrectly formatted');
    }

    checkDepArrDates(depDate, arrDate);

    const res = await fetch('https://www.momondo.com');
    const html = await res.text();

    const cookies = res.headers.get('set-cookie');
    if (!cookies) return;
    const apacheIndex = cookies.indexOf('Apache');
    const cookie = cookies.slice(apacheIndex, cookies.indexOf(';', apacheIndex) + 1);
    const csrfIndex = html.indexOf('"formtoken"') + 13;
    const csrf = html.slice(csrfIndex, html.indexOf('"', csrfIndex));

    const searchPage = await fetch(`https://www.momondo.com/flight-search/${depCode}-${arrCode}/${depDate}/${arrDate}?sort=bestflight_a`).then(res => res.text());

    const searchIdIndex = searchPage.indexOf('"searchId"') + 12;
    const searchId = searchPage.slice(searchIdIndex, searchPage.indexOf('"', searchIdIndex));

    const body = new URLSearchParams({
        searchId: searchId,
        sortMode: 'bestflight'
    });
    
    const data = await fetch('https://www.momondo.com/s/horizon/flights/results/FlightSearchPoll?p=0', {
        method: 'POST',
        headers: {
            'x-csrf': csrf,
            cookie,
            'x-requested-with': 'XMLHttpRequest'
        },
        body
    })
    .then(res => res.json());

    let resultsMetadata: any;
    let actions: any = {};

    const R9 = {
        resultsMetaData: {
            publish: (obj: any) => {
                resultsMetadata = obj;
            }
        },
        redux: {
            dispatch: (obj: any) => {
                actions[obj.type.slice(0, obj.type.indexOf('.'))] = obj.state;
            }
        }
    }
    
    eval(data.bufferedScripts[0]);

    return actions.FlightResultsList.results;
}

export default MomondoSearch;