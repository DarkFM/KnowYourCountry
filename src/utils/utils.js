export const SESSION_KEY = 'countries-list';

export function persistToSession(data, key) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export async function getSessionDataAsync(key) {
    let countries = JSON.parse(window.localStorage.getItem(key));
    if (!countries) {
        countries = await getCountries();
        persistToSession(countries, key);
    }
    return countries;
}

export async function getCountries() {
    console.info('making a request to restcountries.eu');
    const request = new Request('https://restcountries.eu/rest/v2/all');
    const response = await window.fetch(request);
    let data = await response.json();
    return data.reduce((map, countryData) => {
        map[countryData.alpha3Code] = countryData;
        return map;
    }, {});
}

export function formatNumberWithCommas(num) {
    if (!num) return '';
    return [...num.toString()].reverse().reduce((acc, n, idx) => {
        if (idx % 3 === 0 && idx !== 0) return n + ',' + acc;
        else return n + acc;
    });
}

// https://stackoverflow.com/a/6969486/7771568
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const getAllRegions = countries => {
    const set = Object.keys(countries).reduce((set, key) => set.add(countries[key].region), new Set());
    return [...set];
};

// TODO: add utility function that can append to query string.
// It should be able to add be query params and override existing ones
// example query => https://www.google.com/search?q=query+parameters&oq=query+parameters+&aqs=chrome..69i57j0l7.4103j1j7&sourceid=chrome&ie=UTF-8
export function addQueryParam(url, key, value) {
    // Extract key values into object
    const queryStartIndex = url.indexOf('?');
    let baseUrl, queryString;

    baseUrl = url.substring(0, queryStartIndex);
    queryString = url.substring(queryStartIndex + 1);

    if (!queryString || !queryString.includes('=') || queryStartIndex < 0) {
        return url.replace('?', '') + '?' + key + '=' + value;
    }
    // add new key value to object
    const queryMap = queryStrToObj(queryString);

    const updatedQueryMap = { ...queryMap, [key]: value };

    // serialize object to query value pair
    const newQueryString = objToQueryString(updatedQueryMap);

    return baseUrl + '?' + newQueryString;
}

function objToQueryString(obj) {
    const queryKeys = Object.keys(obj);
    const newQueryString = queryKeys
        .reduce((str, querykey) => {
            if (!obj[querykey]) {
                return str;
            }
            return (str += `${querykey}=${obj[querykey]}&`); // generate querystring
        }, '')
        .trim() // trims whitespace
        .replace(/&$/g, ''); // removes last '&'
    return newQueryString;
}

export function queryStrToObj(queryString) {
    const queryStringArray = queryString.split('&');
    const queryMap = queryStringArray.reduce((obj, kvPair) => {
        const [k, v] = kvPair.split('=');
        return { ...obj, [k]: v };
    }, {});
    return queryMap;
}
