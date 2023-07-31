import { readFile, writeFile } from "fs/promises";
import { GoogleHotelsConfig } from "./types/hotels";
import { parseResult } from "./utils.js";
import { load } from "cheerio";

const loadData = (html: string) => {
    const $ = load(html);
    // const raw = $($('script')[17]).text();
    // const data = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
    // return JSON.parse(data);
    $('script').remove();
    return $.html();
}

export default class GoogleHotelsAPI {
    private config: GoogleHotelsConfig;

    constructor(config: GoogleHotelsConfig) {
        this.config = config;
    }

    editConfig(config: Partial<GoogleHotelsConfig>) {
        this.config = {
            ...this.config,
            ...config
        }
    }

    async search() {
        // const body = new URLSearchParams({
        //     'f.req': JSON.stringify([[["AtySUc","[\"honolulu\",[1,[[[3],[3]],0],[[[],[[\"/m/02hrh0_\",null,null,null,null,\"0x7c00183b8cc3464d:0x4b28f55ff3a7976c\",\"Honolulu\"]]],[null,[[2023,7,27],[2023,7,29],2],null,null,null,[2]]],null,[[[],[],null,null,null,[],\"USD\",[],null,null,[],null,null,null,null,null,[]]]],[null,\"CBI=\",null,null,null,null,13,[],0],[]]",null,"1"]]])
        // });

        // const results = await fetch('https://www.google.com/_/TravelFrontendUi/data/batchexecute', {
        //     method: 'POST', body
        // }).then(parseResult)
        // .then(res => JSON.parse(res[0][2]));
        // await writeFile('test.json', JSON.stringify(results, null, 4))

        // console.log(results[1].map((x: any) => x[1]['193397625']).slice(0, 10))
        // const results = await readFile('test.json', 'utf-8')
            // .then(JSON.parse);
        // console.log(
        //     results[0][0][0][1]
        //         .reduce((acc: any[], x: any) => 
        //             x[1]['397419284'] ? [...acc, x[1]['397419284'][0][1]] : acc, []
        //         )
        // )
        // console.log(results[0][2].indexOf('Outrigger'))

        // const query = 'honolulu'
        // const results = await fetch('https://www.google.com/travel/search?q=' + query, {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        //     }
        // }).then(res => res.text()).then(loadData)
        // await writeFile('test.html', results)
        const $ = load(await readFile('test.html'));
        const properties = $('[jsrenderer="hAbFdb"]').toArray().map(el => {
            const element = $(el);
            const [priceElement, ratingsElement] = element.find('[jscontroller="Gnd6ff"]').toArray().map(el => $(el));
            const amenitiesElement = element.find('.RJM8Kc');
            return {
                name: element.find('[jscontroller="bqejFf"]').text(),
                price: parseInt(priceElement.contents().first().text().slice(1)),
                averageRating: parseFloat(ratingsElement.find('.oz2bpb').contents().first().text()),
                reviewCount: parseInt(ratingsElement.find('.oz2bpb').contents().last().text().replaceAll(/\s|\(|,|\)/g, '')),
                amenities: amenitiesElement.find('li').toArray().map(el => $(el).text()),
                images: element.find('img').toArray().reduce((arr: string[], el) => {
                    const url = $(el).attr('data-src');
                    return url ? arr.concat(url.slice(0, url.indexOf('='))) : arr;
                }, [])
            }
        });
        console.log(properties)
    }
}