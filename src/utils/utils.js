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
