export default interface FlightSearchResult {
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
    arrivalAirportIdentifier: string;
}

export interface FlightSearchParams {
    outbound: RequestInfo;
    returning?: RequestInfo;
    stops?: Stops;
    duration?: number;
    roundtrip?: boolean;
    passengers?: {
        adults?: number;
        children?: number;
        infantsOnLap?: number;
        infantsInSeat?: number;
    }
    seatClass?: SeatClass;
    maxPrice?: number;
    alliances?: AirlineAlliance[];
}

interface RequestInfo {
    identifier?: string;
    date?: string;
    times?: {
        departure: [number, number],
        arrival: [number, number]
    }
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