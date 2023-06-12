export default interface LocationSearchResult {
    DerivedLanguageID: number;
    IsTimeout: boolean;
    LogTime: string;
    Origin: string;
    PageTypeID: number;
    ShowNumberOfProperties: boolean;
    SiteLanguageID: number;
    SuggestionList: Suggestion[];
    UniqueRenderID: string;
    ViewModelList: ViewModel[];
}

interface Suggestion {
    AirportCodes: AirportCode[];
    ExternalID: unknown;
    ExternalPlaceTypes: unknown;
    ExternalTypeID: number;
    Name: string;
    ObjectID: number;
    ObjectTypeID: number;
    SuggestionType: number;
    Url: string;
}

interface ViewModel {
    AddressId: unknown;
    AirportCodes: AirportCode[];
    BgImageLoader: unknown;
    CityId: number;
    CountryISO: string;
    CountryId: number;
    DisplayNames: {
        Name: string;
        GeoHierarchyName: string;
        CategoryName: string;
    }
    ExternalTypeID: number;
    FormattedNoOfHotels: string;
    HasImage: boolean;
    HasSubSuggestion: boolean;
    Header: unknown;
    HotelImage: unknown;
    HotelText: string;
    IconCssClass: string;
    Image: unknown;
    Index: number;
    IsAddress: boolean;
    IsBestSeller: boolean;
    IsDefault: boolean;
    IsDisplayGoogleLabel: boolean;
    IsFirstSuggestion: boolean;
    IsHotel: boolean;
    IsPopular: boolean;
    IsRadius: boolean;
    IsSubSuggestion: boolean;
    IsTitle: boolean;
    IsTopPoi: boolean;
    Latitude: number;
    Longtitude: number;
    Name: string;
    NoOfHotels: number;
    ObjectId: number;
    ObjectTypeId: number;
    PageTypeId: number;
    PlaceTypes: unknown;
    ResultAddress: unknown;
    ResultText: unknown;
    ResultUrl: string;
    RetinaImage: unknown;
    SearchType: number;
    SubSuggestionTitle: unknown;
    SuggestionImage: unknown;
    SuggestionImagePlaceHolder: unknown;
    TopPoiLabel: unknown;
}

interface AirportCode {
    Type: 'airport';
    Code: string;
}