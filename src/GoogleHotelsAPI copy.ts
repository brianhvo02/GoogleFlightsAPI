import { readFile, writeFile } from "fs/promises";
import { GoogleHotelsConfig } from "./types/hotels";
import { parseResult } from "./utils.js";
import { load } from 'cheerio';

const loadData = (html: string) => {
    const $ = load(html);
    const raw = $($('script')[17]).text();
    const data = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
    return JSON.parse(data);
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
        const query = 'hotels in san jose, california'
        const results = await fetch('https://www.google.com/travel/search?q=' + query, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        }).then(res => res.text()).then(loadData);
        // await writeFile('test.json', JSON.stringify(results, null, 4));

        // const results = await readFile('test.json', 'utf-8').then(JSON.parse)
        console.dir(results[0][0][0][1].filter((x: any) => x[1]['397419284'])[0])
        // console.dir(results[0][0], { depth: Infinity })
        // console.log(results[0][0][0][1].filter((x: any) => x[1]['397419284']).map((x: any) => x[1]['397419284'][0][1]))
    }
}