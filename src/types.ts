interface City {
    type: 'city';
    fullName: string;
    shortName: string;
    description: string;
    identifier: string;
    airports: Airport[];
}

interface Airport {
    type: 'airport';
    name: string;
    city: string;
    identifier: string;
    description?: string;
    code: string;
    distance?: string;
}

export type LocationSearchResult = (City | Airport)[];

export interface GoogleFlightsConfig {
    originIdentifier: string;
    outboundDate?: string;
    outboundTimes?: RequestTimes;
    destinationIdentifier?: string;
    returnDate?: string;
    returnTimes?: RequestTimes;
    stops?: Stops;
    duration?: number;
    roundtrip: boolean;
    passengers: {
        adults: number;
        children?: number;
        infantsOnLap?: number;
        infantsInSeat?: number;
    }
    seatClass: SeatClass;
    maxPrice?: number;
    alliances?: AirlineAlliance[];
    airlines?: string[];
}

interface RequestTimes {
    departure: [number, number],
    arrival: [number, number]
}

export enum Stops {
    ANY,
    NONSTOP,
    ONE_OR_FEWER,
    TWO_OR_FEWER
}

export enum SeatClass {
    INVALID,
    ECONOMY,
    PREMIUM_ECONOMY,
    BUSINESS,
    FIRST
}

export enum AirlineAlliance {
    STAR_ALLIANCE = 'STAR_ALLIANCE',
    SKYTEAM = 'SKYTEAM',
    ONEWORLD = 'ONEWORLD'
}

export interface BookingInfo {
    vendor: string;
    vendorCode: string;
    vendorHomepage: string;
    link: string;
    linkData: string;
    price: number;
    fareType: string | null;
}

export interface FlightSearchResult {
    airlineCode: string;
    airlines: string[];
    legs: FlightLeg[];
    departure: FlightInfo;
    arrival: FlightInfo;
    duration: number;
    price: number | null;
}

export interface FlightLeg {
    airlineOperator: string;
    departure: FlightInfo;
    arrival: FlightInfo;
    duration: number;
    legroom: string;
    aircraft: string | null;
    flightNumber: {
        code: string;
        number: string;
        name: string;
    }
    emissions: number;
    amenities: {
        u1: boolean;
        powerUSB: boolean;
        u3: boolean;
        powerOutlet: boolean;
        u5: boolean;
        u6: boolean;
        u7: boolean;
        u8: boolean;
        liveTV: boolean;
        u10: boolean;
        streamMedia: boolean;
        wifiFree: boolean;
        wifiPaid: boolean;
    }
}

interface FlightInfo {
    airport: {
        code: string;
        name: string | null;
    }
    time: {
        hours: number;
        minutes: number;
    }
    date: {
        year: number;
        month: number;
        day: number;
    }
}

export interface FlightDiscoverResult {
    identifier: string;
    coordinates: [number, number];
    city: string;
    country: string;
    listingPictureUrl: string;
    coverPictureUrl: string;
    flight: Flight;
}

export interface Flight {
    price: number;
    stops: number;
    length: number;
    lengthString: string;
    iata: string;
    airline: string;
    airlineLogoUrl: string;
    arrivalAirport: string;
    departureAirportIdentifier: string;
}