export interface PropertyDetailsSearchResult {
    data: {
        propertyDetailsSearch: PropertyDetailsSearch
    }
}

export interface PropertyDetailsSearch {
    propertyDetails: PropertyDetail[];
}

export interface PropertyDetail {
    propertyId: number;
    propertyMetaInfo: {
        propertyMetaRanking: {
            numberOfProperty: number;
            metrics: {
                metricName: string;
                rank: number;
                absoluteValue: number;
            }[];
        }
    }
    contentDetail: ContentDetail;
}

export interface ContentDetail {
    propertyId: number;
    contentSummary: ContentSummary;
    contentEngagement: ContentEngagement;
    contentHighlights: ContentHighlights;
    contentLocalInformation: ContentLocalInformation;
    contentInformation: ContentInformation;
    contentFeatures: ContentFeatures;
    hostProfile: unknown;
}

export interface ContentEngagement {
    peopleLooking: string;
    todayBooking: string;
}

export interface ContentFeatures {
    featureGroups: FeatureGroup[];
    hotelFacilities: NameWithId[];
    summary: Summary;
    facilityHighlights: FacilityHighlight[];
}

export interface FacilityHighlight {
    facilityId: number;
    facilityName: string;
    images: FacilityHighlightImage[];
}

export interface FacilityHighlightImage {
    id: number;
    urls: PurpleURL[];
    groupId: unknown;
    groupEntityId: unknown;
    typeId: number;
    uploadedDate: Date;
    providerId: number;
    caption: string;
    highResolutionSizes: unknown[];
}

export interface PurpleURL {
    key: Key;
    value: string;
}

export enum Key {
    Main = "main",
    Original = "original",
}

export interface FeatureGroup {
    features: Feature[];
    id: number;
    name: string;
    order: number;
    symbol: string;
}

export interface Feature {
    available: boolean;
    featureName: string;
    featureNameLocalizationList: unknown;
    id: number;
    order: number;
    symbol: string;
    images: FacilityHighlightImage[] | unknown;
}

export interface NameWithId {
    id: number;
    name: unknown | string;
}

export interface Summary {
    chineseFriendly: boolean;
    staycationFacilityIds: StaycationFacilityIDS;
    hygienePlusFacilities: HygienePlusFacilities;
}

export interface HygienePlusFacilities {
    healthAndMedical: number[];
    safetyFeature: number[];
    preventiveEquipment: number[];
}

export interface StaycationFacilityIDS {
    activities: number[];
    drinkingAndDining: number[];
    sportAndEntertainment: number[];
    wellness: unknown;
}

export interface ContentHighlights {
    favoriteFeatures: FavoriteFeature[];
    locationHighlightMessage: LocationHighlightMessage;
    locationHighlights: LocationHighlight[];
    locations: Location[];
    atfPropertyHighlights: unknown;
}

export interface FavoriteFeature {
    category: Category;
    id: number;
    images: unknown;
    name: string;
    symbol: string;
    tooltip: unknown;
}

export enum Category {
    Beach = "beach",
    PropertyFacility = "property-facility",
    RoomFacility = "room-facility",
}

export interface LocationHighlightMessage {
    title: string;
}

export interface LocationHighlight {
    distanceKm: number;
    highlightType: string;
    message: string;
}

export interface Location {
    tooltip: unknown;
    symbol: string;
    name: string;
    images: unknown;
}

export interface ContentInformation {
    usefulInfoGroups: UsefulInfoGroup[];
    certificate: unknown;
    staffVaccinationInfo: unknown;
    messaging: {
        responsiveRate: number;
    }
    description: {
        short: string;
    }
    notes: {
        criticalNotes: unknown[];
    };
    sustainabilityInfo: {
        isSustainableTravel: boolean;
        practiceCategories: unknown[];
    };
}

export interface UsefulInfoGroup {
    id: number;
    usefulInfo: UsefulInfo[];
}

export interface UsefulInfo {
    id: number;
    description: string;
}

export interface ContentLocalInformation {
    walkablePlaces: WalkablePlaces;
    nearbyProperties: unknown[];
    cuisines: unknown;
    locationSubscore: LocationSubscore;
    nearbyPlaces: NearbyPlace[];
    nearbyShops: NearbyPlace[];
    popularLandmarkNumber: number;
    topPlaces: NearbyPlace[];
}

export interface LocationSubscore {
    airportScore: number;
    poiScore: number;
    transportationScore: number;
}

export interface NearbyPlace {
    abbr: unknown;
    distanceInKm: number;
    duration: unknown;
    durationIcon: unknown;
    geoInfo: NearbyPlaceGeoInfo;
    images: NearbyPlaceImage[] | unknown;
    landmarkId: number | unknown;
    name: string;
    typeId: number;
    typeName: string;
}

export interface NearbyPlaceGeoInfo {
    latitude: number;
    longitude: number;
    obfuscatedLat: number;
    obfuscatedLong: number;
}

export interface NearbyPlaceImage {
    urls: PurpleURL[];
    id: number;
}

export interface WalkablePlaces {
    title: string;
    totalCount: number;
    description: string;
    walkableCategories: WalkableCategory[];
}

export interface WalkableCategory {
    categoryName: string;
    totalCount: number;
    topPlaces: TopPlace[];
}

export interface TopPlace {
    name: string;
    distanceInKm: number;
    images: PurpleImage[] | unknown;
}

export interface PurpleImage {
    urls: {
        value: string;
    }[];
}

export interface ContentSummary {
    propertyId: number;
    displayName: string;
    defaultName: string;
    localeName: string;
    accommodation: {
        accommodationType: number;
        accommodationName: string;
    }
    propertyType: string;
    address: Address;
    awardsAndAccolades: {
        goldCircleAward: unknown;
        advanceGuaranteeProgram: unknown;
    };
    remarks: unknown;
    hasHostExperience: boolean;
    geoInfo: {
        latitude: number;
        longitude: number;
    }
    rating: number;
    asqType: unknown;
    asqInfos: unknown[];
}

export interface Address {
    address1: string;
    address2: string;
    countryCode: string;
    area: NameWithId;
    city: NameWithId;
    country: NameWithId;
    postalCode: string;
    stateInfo: NameWithId;
}
