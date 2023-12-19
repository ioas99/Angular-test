export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RON = 'RON',
}

export interface City {
    name:string,
    lat:string,
    long:string,
    temp?:string,
    wind?:string,
    precipitation?:string,
    sunny?:string,
}

export const cities:City[] = 
     [
        {
            name: 'Bucharest',
            lat: '44.4323',
            long: '26.1063'
        },
        {
            name: 'New York',
            lat: '40.7143',
            long: '-74.006'
        },
        {
            name: 'Warsaw',
            lat: '52.2298',
            long: '21.0118'
        },
        {
            name: 'Vienna',
            lat: '48.2085',
            long: '16.3721'
        }
    ]
