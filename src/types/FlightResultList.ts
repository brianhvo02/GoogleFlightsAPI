export default interface FlightResultsList {
    [key: string]: Result;
}

interface Result {
    resultId: string;
    uiResultId: string;
    legs: Leg[];
    trackingDataLayer: {
        tagLayerPrice: number;
    }
    optionsByFare: Fare[];
    displayAirline: Airline;
    distinctAirlines: Airline[];
    cabinCode: string;
    isBest: boolean;
    co2Info: {
        co2Total: number;
        co2Average: number;
    }
    isSaved: boolean;
    itemType: string;
}

interface Leg {
    legId: string;
    legIndex: number;
    distinctAirlines: Airline[];
    displayAirline: Airline;
    legDurationDisplay: string;
    legDurationMinutes: number;
    segments: Segment[];
}

interface Airline {
    code: string;
    name: string;
    logoUrl: string;
}

interface Segment {
    flightNumber: string;
    airline: Airline;
    departure: DepartureArrival;
    arrival: DepartureArrival;
    duration: string;
    cabinDisplay: string;
    cabinCode: string;
    segmentQualityItems: {
        equipmentTypeName: string;
        qualityItems: QualityItem[];
    }
}

interface DepartureArrival {
    airport: Airport;
    isoDateTimeLocal: string;
}

interface Airport {
    code: string;
    displayName: string;
    fullDisplayName: string;
}

interface QualityItem {
    icon: string;
    msg: string;
}

interface Fare {
    fareName: {
        fareId: string;
        displayName: string;
    }
    options: FareOption[];
    uiCabinCode: string;
    topPrice: {
        price: number;
        currencyFormatString: string;
    }
    isFeatured: boolean;
}

interface FareOption {
    url: string;
    bookingId: string;
    displayPrice: string;
    providerInfo: ProviderInfo;
    fees: {
        rawPrice: number;
        basePrice: string;
        totalPrice: string;
    }
    flags: {
        isFeaturedProvider: boolean;
        isDirect: boolean;
    }
    fareAmenities: {
        type: string;
        restriction: string;
        message: string;
    }[];
}

interface ProviderInfo {
    code: string;
    displayName: string;
    logoUrls: {
        image: string;
        name: string;
    }[];
    currency: string;
    countryName: string;
}