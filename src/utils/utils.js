export const SESSION_KEY = 'countries-list';

export const persistToSession = (data, key) => {
    window.sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSessionDataAsync = async key => {
    let countries = JSON.parse(window.sessionStorage.getItem(key));
    if (!countries) {
        countries = await getCountries();
        persistToSession(countries, key);
    }
    return countries;
};

export const getCountries = async () => {
    const request = new Request('https://restcountries.eu/rest/v2/all');
    const response = await fetch(request);
    let data = await response.json();
    return data.reduce((map, countryData) => {
        map[countryData.alpha3Code] = countryData;
        return map;
    }, {});
};

export const formatNumberWithCommas = num => {
    if (!num) return '';
    return [...num.toString()].reverse().reduce((acc, n, idx) => {
        if (idx % 3 === 0 && idx !== 0) return n + ',' + acc;
        else return n + acc;
    });
};

// https://stackoverflow.com/a/6969486/7771568
export const escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

export const getAllRegions = countries => {
    const set = Object.keys(countries).reduce((set, key) => set.add(countries[key].region), new Set());
    return [...set];
};
