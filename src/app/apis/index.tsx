import { apiDate } from "../components/_coms/functions"
import { Filter } from "./types";

const HOST: string = "https://sculis-api.uceumice.app/v1";


async function request(url_: string[], query_?: Object): Promise<Response | null> {
    let url = url_.join('/');
    let query = query_ ? `?${Object.entries(query_).map(kvp => `${kvp[0]}=${kvp[1]}`).join('&')}` : ``;
    return fetch(`${url}${query}`).then((res) => res).catch((e) => null);
};

async function fetchSubstitution(date_: Date, source_: string, filters_: Filter[], nes_: boolean): Promise<any> {
    let result = await request(
        [HOST, source_, 'substitution', apiDate(date_)],
        {
            filters: filters_,
            nes: nes_
        }
    );

    if (result) {
        try {
            return await result.json();
        } catch (e) {
            return null;
        };
    } else {
        return null;
    }
};

async function fetchSubstitutionInfo(source: string) {
    let result = await request(
        [HOST, source, 'substitution']
    );

    if (result) {
        try {
            return await result.json();
        } catch (e) {
            return null;
        };
    } else {
        return null;
    }
};

async function fetchSourceInfo(source: string) {
    let d = '0c478237-4516-4589-a277-2de82d32212c';

    let response = await request(
        [HOST, source]
    );

    if (response) {
        try {
            return response.json();
        } catch (e) {
            return null;
        };
    } else {
        return null;
    }


};

async function fetchSourceUUIDbyQID(qid: string) {
    let result = await request(
        [HOST, "source"],
        {
            "qid": qid
        }
    );

    if (result) {
        try {
            return result.json();
        } catch (e) {
            return null;
        };
    } else {
        return undefined;
    }
}

async function fetchWeatherData(lat: number, lon: number, date1: Date, date2: Date) {
    let result = await request(
        [
            "https://weather.visualcrossing.com",
            "VisualCrossingWebServices/rest/services/timeline",
            `${lat},${lon}`,
            `${date1.getUTCFullYear()}-${date1.getUTCMonth()+1}-${date1.getUTCDate()}`,
            `${date2.getUTCFullYear()}-${date2.getUTCMonth()+1}-${date2.getUTCDate()}`
        ],
        { contentType: 'json', unitGroup: 'metric', include: "days", lang: "en", key: "KYUC6MWKQBYX2983VQ68MFK7U" }
    );

    if (result) {
        try {
            return result.json();
        } catch (e) {
            return null;
        }
    } else {
        return undefined;
    }
}

export { fetchSubstitution, fetchSubstitutionInfo, fetchSourceInfo, fetchSourceUUIDbyQID, fetchWeatherData }