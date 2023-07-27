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
    exploreMonth?: Month;
    exploreTimeFrame?: TimeFrame;
    calendar?: {
        outboundDateRange: [string, string],
        returnDateRange?: [string, string]
    }
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
    bounds?: [[number, number], [number, number]];
}

interface RequestTimes {
    departure: [number, number],
    arrival: [number, number]
}

export enum TimeFrame {
    WEEKEND = 0,
    ONE_WEEK = 2,
    TWO_WEEKS = 3
}

export enum Month {
    ALL,
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER
}

export enum Stops {
    ANY,
    NONSTOP,
    ONE_OR_FEWER,
    TWO_OR_FEWER
}

export enum SeatClass {
    ECONOMY = 1,
    PREMIUM_ECONOMY = 2,
    BUSINESS = 3,
    FIRST = 4
}

export type AirlineAlliance = 'STAR_ALLIANCE' | 'SKYTEAM' | 'ONEWORLD';

export interface CalendarDate {
    outboundDate: string;
    arrivalDate: string | null;
    price: number;
}

export interface BookingResult {
    bookings: BookingInfo[];
    trendData: TrendData | null;
}

export interface BookingInfo {
    vendor: string;
    vendorCode: string;
    vendorHomepage: string;
    link?: string;
    linkData?: [ [ string, string ] ];
    price: number;
    fareType: string | null;
    separateBookings?: BookingInfo[];
}

export interface FlightSearchResult {
    flights: FlightResult[];
    trendData: TrendData | null;
}

export interface FlightResult {
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
    outboundDate: string;
    returnDate: string;
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

export interface TrendData {
    lowestPrice: number;
    usualPrice: number;
    difference: number;
    lowThreshold: number;
    highThreshold: number;
    trends: [number, number][],
    cityName: string;
}