# Google Flights API

Google Flights API is an unofficial NodeJS class that allows you to make calls to Google's public backend for flight aggregation data. This project is unaffiliated with Google, and they reserve all rights to their code, which I do not use here.

## Current Implementations

### Create new instance of Google Flights API

```typescript
const gfAPI = new GoogleFlightsAPI({
    originIdentifier: '/m/0d6lp',           // Google's id for San Francisco
    outboundDate: '2023-08-21',             // Date of departing flight in YYYY-MM-DD
    destinationIdentifier: '/m/030qb3t',    // Google's id for Los Angeles
    returnDate: '2023-08-25',               // Date of return flight in YYYY-MM-DD
    roundtrip: true,                        // Roundtrip vs one-way flight search
    seatClass: SeatClass.ECONOMY,           // Class of seat, in this case Economy class
    stops: Stops.NONSTOP                    // How many stops are okay, a value from 0-2
});
```

### Search for cities/airports in Google's database

```typescript
const results = await GoogleFlightsAPI.locationSearch('Honolulu');

// results =
[
  {
    type: 'city',
    fullName: 'Honolulu, Hawaii',
    shortName: 'Honolulu',
    description: 'City in Hawaii',
    identifier: '/m/02hrh0_',
    airports: [
      {
        type: 'airport',
        name: 'Daniel K. Inouye International Airport',
        city: 'Honolulu',
        identifier: '/m/02hrh0_',
        code: 'HNL',
        distance: '4 mi'
      }
    ]
  }
]
```

### Discover popular and afforable destinations

```typescript
const results = await gfAPI.explore();

// results =
[
  {
    identifier: '/m/030qb3t',
    coordinates: [ 34.0522342, -118.2436849 ],
    city: 'Los Angeles',
    country: 'United States',
    listingPictureUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR4WoWSategKIa29GTDRnXJBazMO3TWR83GPi4cN8uuwa1mLiSqRLI2p264hXuepRAWuapLZX72RChLpe5GYcqtqJlmqb5ILZDpmpygjn0',
    coverPictureUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTARk3fg4JrXocEwFZ__Vu1gTQq_0fAQykb5FfW16JDWxFEvSzsdWXG8thXEjtdTNrnGpD6L0OVyiRFQb3xGcQk6R1qWqf3S-SjvkZccA',
    flight: {
      price: 103,
      stops: 0,
      length: 104,
      lengthString: '1 hr 44 min',
      iata: 'UA',
      airline: 'United',
      airlineLogoUrl: 'https://www.gstatic.com/flights/airline_logos/70px/dark/UA.png',
      arrivalAirport: 'LAX',
      arrivalAirportIdentifier: '/m/0d6lp'
    }
  },
  {
    identifier: '/m/02_286',
    coordinates: [ 40.7127753, -74.0059728 ],
    city: 'New York',
    country: 'United States',
    listingPictureUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNy5MlPWw65goD3Mqow7kGiF9iYfFPlQgc_Ie7sJTSNK84RJ9uAK4rAuaf6Lis1YYt5qzwAjy7dLfeuKFZgEgI0E7tsLFMyOklGP3cEOo',
    coverPictureUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTSy0LlOnvIOKZvVBa0YMy-1LPf54ANwcklVvu2RrMCQaCFtmMJmktOtpCLF8ax9ZPKSjInoe3DlCOfBKpmC53nnRpMtZ5qDHyCZJzRPg',
    flight: {
      price: 253,
      stops: 0,
      length: 334,
      lengthString: '5 hr 34 min',
      iata: 'AS',
      airline: 'Alaska',
      airlineLogoUrl: 'https://www.gstatic.com/flights/airline_logos/70px/dark/AS.png',
      arrivalAirport: 'EWR',
      arrivalAirportIdentifier: '/m/0d6lp'
    }
  },
  ...
  {
    identifier: '/m/0x1y7',
    coordinates: [ 45.6793119, -111.037259 ],
    city: 'Bozeman',
    country: 'United States',
    listingPictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8aCEFmb9agCsLNKGrxcqzQOfdqL5h481pV_8rbb1lDgLN7I-WreiLPh5NdOyEPCdeXvH0W3yyLUNMFpIrcgBlI53_3dcGseKannXi6nc',
    coverPictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuAMfjkrYMNCLnUYNB7MD-cwyfYNu9qOJzkn0wPQ4Sk5Z_cDMcsvi6StRZIADVoK29ZFPlVKeRpm0OoRlsz9NJD85WRGcsWP4GX5b0Sg',
    flight: {
      price: 214,
      stops: 0,
      length: 134,
      lengthString: '2 hr 14 min',
      iata: 'UA',
      airline: 'United',
      airlineLogoUrl: 'https://www.gstatic.com/flights/airline_logos/70px/dark/UA.png',
      arrivalAirport: 'BZN',
      arrivalAirportIdentifier: '/m/0d6lp'
    }
  },
  {
    identifier: '/m/0310cy',
    coordinates: [ 23.0636562, -109.7024376 ],
    city: 'San José del Cabo',
    country: 'Mexico',
    listingPictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUvSUomuy3IfW1eVzJmfrohNMClhBxWIQ7Zy_F1y45CSV9_JbqA0-3wTprHTFxN6v6IfCnuCj54OlzxPEKT4wFWi-d12GAuINF82KoQQs',
    coverPictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgrK9nhRb8U2OOcjCU3AxMKcS5yU27AFSV-s0BwhPxRfCogWd6HAZZweaXswbGzAGY2q4IcjzcTF07a6-yW0q5ZApYSbQLJmwtAxOEw',
    flight: {
      price: 295,
      stops: 0,
      length: 190,
      lengthString: '3 hr 10 min',
      iata: 'AS',
      airline: 'Alaska',
      airlineLogoUrl: 'https://www.gstatic.com/flights/airline_logos/70px/dark/AS.png',
      arrivalAirport: 'SJD',
      arrivalAirportIdentifier: '/m/0d6lp'
    }
  }
]
```

### Search for flights

```typescript
const results = await gfAPI.search();

// results =
[
  {
    airlineCode: 'AS',
    airlines: [ 'Alaska' ],
    legs: [
      {
        airlineOperator: null,
        departure: {
          airport: { code: 'SFO', name: 'San Francisco International Airport' },
          time: { hours: 7, minutes: 0 },
          date: { year: 2023, month: 8, day: 21 }
        },
        arrival: {
          airport: {
            code: 'HNL',
            name: 'Daniel K. Inouye International Airport'
          },
          time: { hours: 9, minutes: 33 },
          date: { year: 2023, month: 8, day: 21 }
        },
        duration: 333,
        legroom: '31 in',
        aircraft: 'Boeing 737',
        flightNumber: { code: 'AS', number: '870', name: 'Alaska' },
        emissions: 258990,
        amenities: {
          u1: false,
          powerUSB: true,
          u3: false,
          powerOutlet: false,
          u5: false,
          u6: false,
          u7: false,
          u8: false,
          liveTV: false,
          u10: false,
          streamMedia: true,
          wifiFree: false,
          wifiPaid: true
        }
      }
    ],
    departure: {
      airport: { code: 'SFO', name: null },
      date: { year: 2023, month: 8, day: 21 },
      time: { hours: 7, minutes: 0 }
    },
    arrival: {
      airport: { code: 'HNL', name: null },
      date: { year: 2023, month: 8, day: 21 },
      time: { hours: 9, minutes: 33 }
    },
    duration: 333,
    price: 134
  },
  {
    airlineCode: 'UA',
    airlines: [ 'United' ],
    legs: [
      {
        airlineOperator: null,
        departure: {
          airport: { code: 'SFO', name: 'San Francisco International Airport' },
          time: { hours: 16, minutes: 55 },
          date: { year: 2023, month: 8, day: 21 }
        },
        arrival: {
          airport: {
            code: 'HNL',
            name: 'Daniel K. Inouye International Airport'
          },
          time: { hours: 19, minutes: 16 },
          date: { year: 2023, month: 8, day: 21 }
        },
        duration: 321,
        legroom: '31 in',
        aircraft: 'Boeing 777',
        flightNumber: { code: 'UA', number: '1509', name: 'United' },
        emissions: 285685,
        amenities: {
          u1: false,
          powerUSB: false,
          u3: false,
          powerOutlet: true,
          u5: false,
          u6: false,
          u7: false,
          u8: false,
          liveTV: false,
          u10: false,
          streamMedia: true,
          wifiFree: false,
          wifiPaid: true
        }
      }
    ],
    departure: {
      airport: { code: 'SFO', name: null },
      date: { year: 2023, month: 8, day: 21 },
      time: { hours: 16, minutes: 55 }
    },
    arrival: {
      airport: { code: 'HNL', name: null },
      date: { year: 2023, month: 8, day: 21 },
      time: { hours: 19, minutes: 16 }
    },
    duration: 321,
    price: 134
  },
  ...
  {
    airlineCode: 'AS',
    airlines: [ 'Alaska' ],
    legs: [
      {
        airlineOperator: null,
        departure: {
          airport: { code: 'SFO', name: 'San Francisco International Airport' },
          time: { hours: 11, minutes: 40 },
          date: { year: 2023, month: 8, day: 21 }
        },
        arrival: {
          airport: {
            code: 'HNL',
            name: 'Daniel K. Inouye International Airport'
          },
          time: { hours: 14, minutes: 13 },
          date: { year: 2023, month: 8, day: 21 }
        },
        duration: 333,
        legroom: '31 in',
        aircraft: 'Boeing 737MAX 9 Passenger',
        flightNumber: { code: 'AS', number: '877', name: 'Alaska' },
        emissions: 216842,
        amenities: {
          u1: false,
          powerUSB: true,
          u3: false,
          powerOutlet: false,
          u5: false,
          u6: false,
          u7: false,
          u8: false,
          liveTV: false,
          u10: false,
          streamMedia: true,
          wifiFree: false,
          wifiPaid: true
        }
      }
    ],
    departure: {
      airport: { code: 'SFO', name: null },
      date: { year: 2023, month: 8, day: 21 },
      time: { hours: 11, minutes: 40 }
    },
    arrival: {
      airport: { code: 'HNL', name: null },
      date: { year: 2023, month: 8, day: 21 },
      time: { hours: 14, minutes: 13 }
    },
    duration: 333,
    price: 204
  }
]
```

### See all aggregated sites for booking a selected flight

```typescript
const results = await api.book([result]);

// results =
[
  {
    vendor: 'Alaska',
    vendorCode: 'AS',
    vendorHomepage: 'www.alaskaair.com/...',
    link: 'https://www.google.com/travel/clk/f',
    linkData: [ [Array] ],
    price: 134,
    fareType: 'SAVER'
  },
  {
    vendor: 'Alaska',
    vendorCode: 'AS',
    vendorHomepage: 'www.alaskaair.com/...',
    link: 'https://www.google.com/travel/clk/f',
    linkData: [ [Array] ],
    price: 174,
    fareType: 'MAIN'
  },
  {
    vendor: 'Alaska',
    vendorCode: 'AS',
    vendorHomepage: 'www.alaskaair.com/...',
    link: 'https://www.google.com/travel/clk/f',
    linkData: [ [Array] ],
    price: 574,
    fareType: 'FIRST'
  },
  {
    vendor: 'CheapoFlyt',
    vendorCode: 'CHEAPOFLYT',
    vendorHomepage: 'cheapoflyt.com/...',
    link: 'https://www.google.com/travel/clk/f',
    linkData: [ [Array] ],
    price: 130,
    fareType: null
  },
  ...
  {
    vendor: 'Globehunters',
    vendorCode: 'GLOBEHUNTERS',
    vendorHomepage: 'www.globehunters.us/...',
    link: 'https://www.google.com/travel/clk/f',
    linkData: [ [Array] ],
    price: 234,
    fareType: null
  }
]
```

## An example workflow
```typescript
const [ locationDep ] = await GoogleFlightsAPI.locationSearch('San Francisco');
const [ locationArr ] = await GoogleFlightsAPI.locationSearch('honolulu');

const params = {
    originIdentifier: locationDep.identifier,
    outboundDate: '2023-08-21',
    returnDate: '2023-08-25',
    seatClass: SeatClass.ECONOMY,
    roundtrip: true,
    passengers: {
        adults: 1
    },
    stops: Stops.NONSTOP,
}

console.log(`Looking for somewhere to go from ${params.outboundDate} to ${params.returnDate}`);
const api = new GoogleFlightsAPI(params);

const [discoverResult] = await api.explore();
console.log(`Discovered ${discoverResult.city} for $${discoverResult.flight.price}`);

api.editConfig({
    destinationIdentifier: discoverResult.identifier
});

const [originResult] = await api.search();
console.log(`Found ${originResult.airlines[0]} flight from ${originResult.departure.airport.code} to ${originResult.arrival.airport.code}`);

const [destinationResult] = await api.search(originResult.legs[0]);
console.log(`Found ${destinationResult.airlines[0]} flight from ${destinationResult.departure.airport.code} to ${destinationResult.arrival.airport.code}`);

const [bookingInfo] = await api.book([originResult, destinationResult]);

const bookingLink = await GoogleFlightsAPI.getBookingLink(bookingInfo);
console.log(bookingLink);

console.log(`New search! Going to Honolulu`);
api.editConfig({
    destinationIdentifier: locationArr.identifier,
    roundtrip: false
});

const [result] = await api.search();
console.log(`Found ${result.airlines[0]} flight from ${result.departure.airport.code} to ${result.arrival.airport.code} for $${result.price}`);

const [paradiseBookingInfo] = await api.book([result]);
const paradiseBookingLink = await GoogleFlightsAPI.getBookingLink(paradiseBookingInfo);
console.log(paradiseBookingLink);
```
Example response:
```
Looking for somewhere to go from 2023-08-21 to 2023-08-25
Discovered Los Angeles for $103
Found United flight from SFO to LAX
Found United flight from LAX to SFO
https://www.united.com/ual/en/us/Booking/SearchInjection/VendorQueryPinDown?encodedParameters=cd7cfde9-db6b-4cb0-8bd7-5de08273bb9d%5e1af4ede1-6109-40c6-87a6-860b30e24374
New search! Going to Honolulu
Found Alaska flight from SFO to HNL for $134
https://www.alaskaair.com/planbook/shoppingstart?A=1&SITE_PREF=full&FT=ow&F1=SFO%7CHNL%7C08/21/2023%7C870,AS%7CS&FARE=133.50&frm=cart&meta=GOO_CS_Other_X&utm_source=google&utm_medium=meta&utm_campaign=book_as_site&gclid=ACO7Af3PtHZzFvqerhwbe_c7eD-7gPT8yAg7tO0kKEnG7gktqaV_P13jJoMsIlkePc-lw9T2zWk2xysdy8Y1LMf3vWjOjEWXmSpa5GiCbMkKgf-X7ZA&gclsrc=gf
```