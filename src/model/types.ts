export interface Motd {
    msg: string;
    ulr: string;
}

export interface Currency {
    [key: string]: number;
}

export interface Rates {
    [key: string]: Currency;
}

export interface Response {
    base: string;
    end_date: string;
    motd: Motd;
    rates: Rates[];
    start_date: string;
    success: boolean;
    timeseries: boolean;
}

/* const testRates: Rates = {
    "2022-01-01": { EUR: 0.879665 },
    "2022-01-02": { EUR: 0.879665 },
    "2022-01-03": { EUR: 0.879665 },
}; */

export interface Currencies {
    value: string;
}
