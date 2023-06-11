import FlightResultsList from "./types/FlightResultList";
import { checkCode } from "./utils";

const MomondoSearch = async (depCode: string, arrCode: string, depDate: Date, arrDate: Date): Promise<FlightResultsList | undefined> => {
    const currentDate = new Date().getTime();
    if (!(checkCode(depCode) && checkCode(arrCode) && depDate.getTime() > currentDate && arrDate.getTime() > currentDate)) {
        return;
    }

    const res = await fetch('https://www.momondo.com');
    const html = await res.text();

    const cookies = res.headers.get('set-cookie');
    if (!cookies) return;
    const apacheIndex = cookies.indexOf('Apache');
    const cookie = cookies.slice(apacheIndex, cookies.indexOf(';', apacheIndex) + 1);
    const csrfIndex = html.indexOf('"formtoken"') + 13;
    const csrf = html.slice(csrfIndex, html.indexOf('"', csrfIndex));

    const searchPage = await fetch(`https://www.momondo.com/flight-search/${depCode}-${arrCode}/${depDate.toISOString().slice(0, 10)}/${arrDate.toISOString().slice(0, 10)}?sort=bestflight_a`).then(res => res.text());

    const searchIdIndex = searchPage.indexOf('"searchId"') + 12;
    const searchId = searchPage.slice(searchIdIndex, searchPage.indexOf('"', searchIdIndex));

    const body = new URLSearchParams({
        searchId: searchId,
        // poll: 'true',
        // pollNumber: '0',
        // applyFilters: 'true',
        // filterState: '',
        // useViewStateFilterState: 'true',
        // pageNumber: '1',
        // watchedResultId: '',
        // append: 'false',
        sortMode: 'bestflight',
        // ascending: 'true',
        // priceType: 'daybase',
        // requestReason: 'POLL',
        // phoenixRising: 'true',
        // isSecondPhase: 'false',
        // displayAdPageLocations: 'left,bottom-left,bottom,upper-right,right',
        // existingAds: 'false',
        // activeLeg: '-1',
        // hasFilterPreferences: 'false',
        // view: 'list',
        // renderPlusMinusThreeFlex: 'false',
        // renderAirlineStopsMatrix: 'false',
        // requestAlternateFlexDates: 'false',
        // ajaxts: '1686471304127',
        // scriptsMetadata: '14B1HgE17E2CE1Li1xE9Dg1C2Cg13g4C2EUCI9gJ4E6gI10c34C2Q11QMb1gCQ1w2Q5I2CE28K',
        // stylesMetadata: '46B1HB1E75I5g1g21g4E6I1B9D10I1U13MK1o7I4C1E7Y13H48ICM1I1E16QB1QYIE2C1H14g236Q67C71g34B1/SI6gC2g1g36Q5C8I3ES1g37E345B1kiQJ2B1kiRJkiQ1k1RIkiRIkiRJkiRJkiQJ1C1BE1B1EiRJkiQJ1CRJ1gBIkgRJkiRJkiRJ1C1J119IgCQ1kCQJkiRJkiRI1gQ7R1giQB7I2BJ1i1B164Eg1J106B1kC1BEg62kiRJ19Bg1QJkCRBgiQB6B1kiRJkiRJEgBIkgBIkiQI1CBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQI1CB1kiRJkiRJ1iQJ1gBIkiRJkiRJkgBJEiRJkgRJk1Q7B1kgQ3BJkiRJkiQJ1CRJk105BIkiQJgCQJkiRJkgR1kiR1gCBJkgQ3BJk2JEg2EC2ggQI3Ig1BJg1B1Eg81I12kCQ6C2E1BIg3kiQJk1Q2CQJ1C1B4gCRBEiRBkiRJkiQB2BI1CBJEg570kiRJkg1I20gCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRBkiQB63I156gCRJ',
        // r9version: 'R670d'
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