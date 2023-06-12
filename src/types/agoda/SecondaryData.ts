// File generated from quicktype.io

export interface SecondaryData {
    protocol: string;
    translations: Translations;
    hotelId: number;
    culture: string;
    origin: string;
    gtmId: string;
    debug: boolean;
    browserInfo: WelcomeBrowserInfo;
    imageParams: ImageParams;
    searchbox: Searchbox;
    hotelInfo: HotelInfo;
    hasSearchCriteria: boolean;
    loyaltyProgramId: number;
    giftCardBalance: number;
    hotelSearchCriteria: WelcomeHotelSearchCriteria;
    aboutHotel: WelcomeAboutHotel;
    cmsValues: WelcomeCMSValues;
    userInfo: WelcomeUserInfo;
    error: BreakfastInformation;
    mosaicInitData: MosaicInitData;
    reviews: Reviews;
    highLightsInfo: Info;
    nearbyAttractionInfo: Info;
    featuresYouLove: WelcomeFeaturesYouLove;
    hotelPageFeatures: HotelPageFeatures;
    reviewInitData: ReviewInitData;
    currencyInfo: CurrencyInfo;
    roomGridData: RoomGridData;
    stickyFooter: WelcomeStickyFooter;
    inquiryProperty: InquiryProperty;
    numberOfFitRoom: number;
    numberOfNotFitRoom: number;
    isMultiRoomSuggestionExist: boolean;
    breadcrumbs: Breadcrumb[];
    mapParams: MapParams;
    poiService: PoiService;
    indexSearchCriteria: IndexSearchCriteria;
    wysiwyp: Wysiwyp;
    searchCriteria: WelcomeSearchCriteria;
    hotelServiceData: HotelServiceData;
    favorite: Favorite;
    hardLoginAutoReloadInterval: number;
    contactHost: ContactHost;
    shouldRenderReview: boolean;
    referrerUrl: string;
    searchId: string;
    hotelModel: HotelModel;
    prefetchUrl: string;
    hasExtrabed: boolean;
    shouldAddInterConnectingRoom: boolean;
    noCCRequired: NoCCRequired;
    agodaHomesRibbon: AgodaHomesRibbon;
    registerReviewUrlIfReviewInitDataPresent: boolean;
    bookingAttributionData: BookingAttributionData;
    recommendedPropertiesParams: RecommendedPropertiesParams;
    personalizedRecommendedPropertiesParams: PersonalizedRecommendedPropertiesParams;
    cronosDetails: CronosDetails;
    seo: SEO;
    isLoginRequiredForCn: boolean;
    isCmaEnabled: boolean;
    isLogin: boolean;
    isL1LoggedIn: boolean;
    recaptchaV3PublicKey: string;
    mixAndSave: MixAndSave;
    cma: Cma;
    isAboutHotelLazy: boolean;
    isInternationalUser: boolean;
    restaurantOnSite: RestaurantOnSite[];
    breakfastInformation: BreakfastInformation;
    isShowChildRateWidget: boolean;
    isShowRecommendedProperty: boolean;
    isDisabledButtonForMaintenence: boolean;
    voucherMode: boolean;
    tealium: Tealium;
    hopperMetaAttributes: HopperMetaAttributes;
    enablePriceFreeze: boolean;
    hasHourlyRate: boolean;
}

export interface WelcomeAboutHotel {
    hotelDesc: HotelDesc;
    hotelPolicy: HotelPolicy;
    guestPolicies: GuestPolicies;
    otherPolicies: string[];
    noExtraBedAvailable: boolean;
    usefulInfoGroups: UsefulInfoGroup[];
    importantNotes: string[];
    featureGroups: FeatureGroup[];
    hotelName: string;
    translatedHotelName: string;
    reviewFacilityMentions: ReviewFacilityMention[];
    placesOfInterest: AboutHotelPlacesOfInterest;
    bathInformation: BathInformation;
    cityMinPerBooking: number;
    nhaSummary: BreakfastInformation;
}

export interface BathInformation {
    bathDescription: any[];
    bathFeatureGroups: any[];
    bathUsefulGroups: any[];
}

export interface FeatureGroup {
    feature: FeatureGroupFeature[];
    id: number;
    name: string;
    order: number;
    symbol: string;
}

export interface FeatureGroupFeature {
    name: string;
    available: boolean;
    emphasis: boolean;
    iconCss: string;
    order: number;
    image: FeatureImage;
    id: number;
    featureTags: any[];
    isFontIcon: boolean;
    formattedIconCss: string;
}

export interface FeatureImage {
    typeId: number;
    sizeTypeToLocation: SizeTypeToLocation;
    providerID: number;
    groupEntityId: number;
    hasImages: boolean;
    coverImageUrl: string;
    featureImageUrl: string;
    id?: string;
    title?: string;
    group?: string;
    highResolutionSizes?: any[];
    imageSnippet?: BreakfastInformation;
}

export interface BreakfastInformation {
}

export interface SizeTypeToLocation {
    original?: string;
}

export interface GuestPolicies {
    extraBedPolicy: string;
    minimumAgeOfGuest: string;
    infantPolicy: Policy;
    childPolicy: Policy;
    adultChildPolicy: AdultChildPolicy;
}

export interface AdultChildPolicy {
    ageDescription: string;
    additionalInfo: string;
}

export interface Policy {
    ageDescription: string;
    policy: string;
    additionalInfo: string;
}

export interface HotelDesc {
    overview: string;
    snippet: string;
    hotelFormerName: string;
}

export interface HotelPolicy {
    childPolicies: ChildPolicy[];
    extrabedPolicies: ExtrabedPolicy[];
    policyNotes: string[];
    hideAutomatedChildPolicyText: boolean;
    extraBedAge: number;
    hasBcomChildPolicy: boolean;
}

export interface ChildPolicy {
    isInfant: boolean;
    policy: string;
    description: string;
}

export interface ExtrabedPolicy {
    type: number;
    description: string;
}

export interface AboutHotelPlacesOfInterest {
    placesOfInterestProperties: PlacesOfInterestProperty[];
    header: string;
    icon: string;
}

export interface PlacesOfInterestProperty {
    categoryName: string;
    places: Place[];
}

export interface Place {
    name: string;
    distanceDisplay: string;
    distance: number;
    picturePath?: string;
    landmarkId?: number;
    distanceFormattedString: string;
    landmarkTypeName: string;
    typeId: number;
    latitude?: number;
    longitude?: number;
    categoryId?: number;
}

export interface ReviewFacilityMention {
    icon: string;
    name: string;
    mentionCount: number;
    mentionCountFormatted: string;
    facilityIds: number[];
    facilityClassesId: number;
}

export interface UsefulInfoGroup {
    id: number;
    name: string;
    items: Item[];
}

export interface Item {
    id: number;
    title: string;
    description: string;
    fontIcon: string;
}

export interface AgodaHomesRibbon {
    heading: string;
    line1: string;
    line2: string;
    isAgodaHomesRebranding: boolean;
}

export interface BookingAttributionData {
    "attr-clc-tag": string;
    "attr-clc-cid": string;
    "attr-sfc-tag": string;
    "attr-sfc-cid": string;
    "attr-clc-modelid": string;
    "attr-sfc-modelid": string;
    "attr-clc-clickdate": null;
    "attr-sfc-clickdate": null;
    "attr-clc-additional": string;
    "attr-sfc-additional": string;
}

export interface Breadcrumb {
    regionName: string;
    isShowCountNumber: boolean;
    regionCount?: string;
    regionLink?: string;
}

export interface WelcomeBrowserInfo {
    isTablet: boolean;
    isMobile: boolean;
    isIe10OrBelow: boolean;
    isDesktop: boolean;
    isIE: boolean;
    isEdge: boolean;
    browserName: string;
}

export interface Cma {
    features: { [key: string]: BreakfastInformation };
}

export interface WelcomeCMSValues {
    preferedPartnerTitle: string;
    showMapTextOrder: string;
    showMapTextDivider: string;
    showMap: string;
    gotAQuestionForProperty: string;
    askQuestionForProperty: string;
    didNotFindProperty: string;
    continueSearch: string;
    topValueTextTooltip: string;
    topValueMessageTooltip: string;
}

export interface ContactHost {
    init: Init;
}

export interface Init {
    params: Params;
}

export interface Params {
    _isLoggedIn: boolean;
    _isCheckInSoonWarning: boolean;
    _translatedCheckIn: string;
    _checkInDate: Date;
    _translatedCheckOut: string;
    _checkOutDate: Date;
    _nights: string;
    _hotelNameEnglish: string;
    _adults: string;
    _children: string;
    _rooms: string;
    _propertyId: string;
    _placeName: string;
    _supportedLanguages: string;
    _apiUrl: string;
    _memberId: string;
    _isTablet: boolean;
}

export interface CronosDetails {
    urls: Urls;
    experiments: BreakfastInformation;
}

export interface Urls {
    "review/HotelReviews": string;
    "review/ReviewComments": string;
    "recommendation/RecommendedProperties": string;
}

export interface CurrencyInfo {
    currency: string;
    code: string;
    onBack: boolean;
    groupSeparator: string;
    groupSizes: number[];
    decimalSeparator: string;
    numberOfDecimal: number;
    currencyFormat: string;
}

export interface Favorite {
    isFavorite: boolean;
    cms: FavoriteCMS;
}

export interface FavoriteCMS {
    tooltipFavoriteHeart: string;
    tooltipMarkedFavoriteHeart: string;
}

export interface WelcomeFeaturesYouLove {
    title: string;
    features: FeaturesYouLoveFeature[];
    isFamily: boolean;
}

export interface FeaturesYouLoveFeature {
    icon: string;
    text: string;
    images: any[];
    tooltip: Tooltip;
    id: number;
}

export interface Tooltip {
    items: any[];
    isShowAsBullet: boolean;
}

export interface Info {
    header: string;
    highLights: HighLight[];
}

export interface HighLight {
    id: number;
    name: string;
    title: string;
    symbol: string;
    category: string;
    highlightInformation: BreakfastInformation;
}

export interface HopperMetaAttributes {
    hopperBookingAttributes: HopperBookingAttributes;
    hopperHotelAttributes: HopperHotelAttributes;
}

export interface HopperBookingAttributes {
    currency: string;
    "check-in": Date;
    "check-out": Date;
    "room-count": string;
    "adult-count": string;
    "child-count": string;
}

export interface HopperHotelAttributes {
    "hotel-id": string;
    name: string;
    "star-rating": string;
    "partner-rating": string;
    "address-city": string;
    "address-line": string;
    "address-country": string;
    "check-in-local-time": string;
    "check-in-time-offset": string;
}

export interface HotelInfo {
    name: string;
    hotelsCountSameCity: number;
    isShowSeeAllSimilarProperties: boolean;
    isSingleRoom: boolean;
    isNHA: boolean;
    englishName: string;
    isGetQuestionEnabled: boolean;
    isContactHostActive: boolean;
    shouldShowAccommodationTypeLabel: boolean;
    accommodationType: string;
    isAgMse: boolean;
    locationHighlightMessage: string;
    awardsAndAccolades: AwardsAndAccolades;
    engagement: Engagement;
    starRating: StarRating;
    address: Address;
    supplierId: number;
    hasHostExperience: boolean;
    isContainBookOnRequest: boolean;
    genericBadge: BreakfastInformation;
}

export interface Address {
    countryId: number;
    full: string;
    cityName: string;
    cityId: number;
    countryName: string;
    areaName: string;
    address: string;
    postalCode: string;
}

export interface AwardsAndAccolades {
    text: string;
}

export interface Engagement {
    peopleLooking: string;
    todayBooking: string;
    hasBookingHistory: boolean;
}

export interface StarRating {
    tooltip: string;
    icon: string;
    iconColor: string;
    value: number;
}

export interface HotelModel {
    completeLoading: CompleteLoading;
}

export interface CompleteLoading {
    reviewScores: boolean;
    reviewComments: boolean;
    scrollToReviewSection: boolean;
    heroImage: boolean;
}

export interface HotelPageFeatures {
    enableOLSB_0: boolean;
    xProperties_1: boolean;
    insiderDeals_2: boolean;
    comparisonGrid_3: boolean;
    backToSearch_4: boolean;
    breakcrumbs_5: boolean;
}

export interface WelcomeHotelSearchCriteria {
    pageInitData: HotelSearchCriteriaPageInitData;
    hotelId: number;
    checkIn: Date;
    checkOut: Date;
    checkInDate: Date;
    checkOutDate: Date;
    los: number;
    adults: number;
    children: number;
    rooms: number;
    cityId: number;
    priceView: number;
    referrerUrl: string;
    currencyCode: string;
    currencyDisplay: string;
    isEnableAPS: boolean;
    isWysiwyp: boolean;
    origin: string;
    countryId: number;
    defaultChildAge: number;
    travellerType: number;
    voucherMode: boolean;
    connectedTrip: boolean;
    isDayUseFunnel: boolean;
    isDayUseFeatureAvailable: boolean;
}

export interface HotelSearchCriteriaPageInitData {
    isManualCal: boolean;
}

export interface HotelServiceData {
    _prebookingUrl: string;
    _roomInfoPopupUrl: string;
    _isAPSPeek: boolean;
    _apsPeekUrl: string;
    _apsPeekTrackingUrl: string;
    _reviewsMeasurementUrl: string;
}

export interface ImageParams {
    pageType: number;
    hotelId: number;
    brokenImages: any[];
    totalNumberOfImages: number;
    brokenImageUrl: string;
    alwaysSendImageInfo: boolean;
}

export interface IndexSearchCriteria {
    hotelId: number;
    languageId: number;
    origin: string;
    checkIn: Date;
    los: number;
    adults: number;
    children: number;
    rooms: number;
    currencyCode: string;
    isWysiwyp: boolean;
    priceView: number;
    isEnableAPS: boolean;
    cityId: number;
}

export interface InquiryProperty {
    hotelImage: string;
    starRatingFontIcon: string;
    starRatingColor: string;
    hotelLocation: string;
    isLoggedIn: boolean;
    translatedCheckIn: string;
    checkInDate: Date;
    translatedCheckOut: string;
    checkOutDate: Date;
    hotelNameEnglish: string;
    adults: string;
    children: string;
    rooms: string;
    propertyId: string;
    placeName: string;
    supportedLanguages: string;
    apiUrl: string;
    memberId: string;
    preloadImage: string;
    cheapestPrice: string;
    currency: string;
}

export interface MapParams {
    staticUrl: string;
    useReactMap: boolean;
    defaultMapType: string;
    key: string;
    latlng: number[];
    latlngOffset: number[];
    loadingMessage: string;
    mapProviderName: string;
    mapType: MapType;
    review: Review;
    url: string;
    url_tiles: string;
    zoom: number;
    shouldObfuscateAddress: boolean;
}

export interface MapType {
    hybrid: string;
    road: string;
    satellite: string;
    terrain: string;
}

export interface Review {
    hotelName: string;
    hotelImageUrl: string;
    starRating: string;
    starRatingInfo: StarRatingInfo;
    scoreText: string;
    formattedScore: string;
    reviewCount: string;
    isCurrencyOnBackPosition: boolean;
}

export interface StarRatingInfo {
    fontIcon: string;
    color: string;
    tooltip: string;
}

export interface MixAndSave {
    shouldFetchMixAndSavePOC: boolean;
    shouldFetchUpSellPOC: boolean;
    mixAndSaveRequestTimeout: number;
}

export interface MosaicInitData {
    images: ImageElement[];
    mosaicImages: ImageElement[];
    imageCategories: ImageCategory[];
    staticMapUrl: string;
    rating: Rating;
    discount: MosaicInitDataDiscount;
    mapsEntryPoint: MapsEntryPoint;
    videos: Video[];
}

export interface MosaicInitDataDiscount {
    cheapestPrice: string;
    from: string;
    fromText: string;
    currency: string;
    currencyOnBack: boolean;
    apsPeekUniqueId: string;
}

export interface ImageCategory {
    categoryId: ID;
    category: HeaderRooms;
    count: number;
}

export enum HeaderRooms {
    Facilities = "Facilities",
    Other = "Other",
    PropertyViews = "Property views",
    Rooms = "Rooms",
}

export enum ID {
    Facility = "facility",
    Other = "other",
    Property = "property",
    Room = "room",
}

export interface ImageElement {
    id: string;
    title: string;
    location: string;
    locationMediumRectangle: string;
    locationWithWideSize: string;
    locationWithSquareSize: string;
    locationWithSquareSize2X: string;
    group: HeaderRooms;
    groupId: ID;
    groupEntityId: number;
    orderIndex: number;
    isRoomImage: boolean;
    providerId: number;
    isLocationHd: boolean;
    imageSnippet?: ImageSnippet;
}

export interface ImageSnippet {
    snippet: string;
    memberName: string;
    countryCode: string;
    countryNationality: string;
    reviewDate: Date;
}

export interface MapsEntryPoint {
    entryPointText: string;
    shouldRenderMaps: boolean;
}

export interface Rating {
    text: string;
    locationRating: string;
    scoreText: string;
}

export interface Video {
    id: number;
    group: string;
    location: string;
    thumbnailImage: string;
}

export interface NoCCRequired {
    shouldShowNoCCRequired: boolean;
    noCreditCardRequiredText: string;
    bookingForToNightText: string;
    noCreditCardNeededText: string;
    hotelCheckInLocalDate: Date;
    noCCNoProblem: string;
    bookWithNoCC: string;
}

export interface PersonalizedRecommendedPropertiesParams {
    placeholderImageUrl: string;
    recentViewTitle: string;
    placeholder: string;
    priceView: number;
    hotelId: number;
    isSingleRoom: boolean;
    culture: string;
    browserInfo: PersonalizedRecommendedPropertiesParamsBrowserInfo;
    cmsValues: PersonalizedRecommendedPropertiesParamsCMSValues;
    userInfo: PersonalizedRecommendedPropertiesParamsUserInfo;
    hasSearchCriteria: boolean;
    loyaltyProgramId: number;
    hotelSearchCriteria: PersonalizedRecommendedPropertiesParamsHotelSearchCriteria;
}

export interface PersonalizedRecommendedPropertiesParamsBrowserInfo {
    isTablet: boolean;
    isMobile: boolean;
}

export interface PersonalizedRecommendedPropertiesParamsCMSValues {
    locationRatingText: string;
    recommendedThisProperty: string;
    recommendedMoreDetails: string;
    recommendedBookNow: string;
    recommendedSelectDate: string;
    recommendedFrom: string;
    recommendedDiscount: string;
    awaitingReviews: string;
    reviewsOrder: string;
    reviews: string;
    review: string;
    bestValue: string;
    noOtherDealsFound: string;
    recommendedTravelersLooking: string;
    whatYouGet: string;
    compareToSimilarHomes: string;
    topHost: string;
    verifiedHost: string;
    oneBedroom: string;
    bedroomsWithCount: string;
    oneBed: string;
    bedsWithCount: string;
    propertyOverviewSpaceSize: string;
    kitchen: string;
    recommendedReserve: string;
    agodaHomesRebrand: string;
    matchScoreHeader: string;
}

export interface PersonalizedRecommendedPropertiesParamsHotelSearchCriteria {
    checkIn: Date;
    los: number;
    adults: number;
    children: number;
    rooms: number;
    priceView: number;
}

export interface PersonalizedRecommendedPropertiesParamsUserInfo {
    currencyOnBack: boolean;
    currency: string;
    currencyGroupSeparator: string;
    currencyGroupSizes: number[];
    decimalSeparator: string;
}

export interface PoiService {
    hotelId: number;
    showStaticMap: boolean;
}

export interface RecommendedPropertiesParams {
    hotelId: number;
    isSingleRoom: boolean;
    culture: string;
    browserInfo: PersonalizedRecommendedPropertiesParamsBrowserInfo;
    cmsValues: PersonalizedRecommendedPropertiesParamsCMSValues;
    userInfo: PersonalizedRecommendedPropertiesParamsUserInfo;
    hasSearchCriteria: boolean;
    loyaltyProgramId: number;
    hotelSearchCriteria: PersonalizedRecommendedPropertiesParamsHotelSearchCriteria;
}

export interface RestaurantOnSite {
    id: number;
    name: string;
    servings: any[];
    cuisines: string[];
}

export interface ReviewInitData {
    languageId: number;
    locale: string;
    hotelId: number;
    hotelProviderId: number;
    demographicId: number;
    pageNo: number;
    pageSize: number;
    sorting: number;
    reviewProviderIds: number[];
    isReviewPage: boolean;
    paginationSize: number;
    isCrawlable: boolean;
    isBot: boolean;
    memberId: number;
    searchKeyword: string;
    additionalReviewsProviderId: number;
    additionalReviewsProviders: number[];
    activeProvider: number;
    selectedTravelerType: number;
}

export interface Reviews {
    scoreText: string;
    score: string;
    basedOnProviderId: number;
    basedOn: string;
    reviewsCount: number;
    recommendationScore: number;
    isShowRecommendationScore: boolean;
    isReviewPage: boolean;
    serviceData: ServiceData;
    hotelReviewsOptions: HotelReviewsOptions;
    displayLanguageId: number;
    reviewsContainerSelector: string;
    providerList: string;
    demographic: Demographic;
}

export interface Demographic {
    reviewProviderLogos: ReviewProviderLogo[];
    score: number;
    maxScore: number;
    id: number;
    count: number;
    providerId: number;
    cityAverageText: string;
    formattedScore: string;
    name: string;
    reviewProviderLogoText: string;
    scoreText: string;
    subReview: SubReview;
    grades: Grade[];
    scoreDistribution: ScoreDistribution[];
}

export interface Grade {
    id: string;
    name: string;
    score: number;
    formattedScore: string;
    scale: number;
    percentage: number;
    scoreText: string;
    progressBarScoreStyle: string;
    cityAverage: number;
    uid: string;
    subGrades: any[];
}

export interface ReviewProviderLogo {
    providerId: number;
    logoUrl: string;
    logoName: string;
    logoAltText: string;
}

export interface ScoreDistribution {
    id: string;
    scoreText: string;
    count: number;
}

export interface SubReview {
    score: string;
    text: string;
    name: string;
}

export interface HotelReviewsOptions {
    hotelProviderId: number;
    isMobile: boolean;
    isCrawlable: boolean;
    isReviewPage: boolean;
    memberId: number;
}

export interface ServiceData {
    reviewCommentsEndpoint: string;
    reviewTranslateEndpoint: string;
    reviewResponseTranslateEndpoint: string;
    hotelId: number;
    providerId: number;
    isReviewPage: boolean;
    isCrawlable: boolean;
}

export interface RoomGridData {
    isDataReady: boolean;
    noRoomImageUrl: string;
    filters: RoomGridDataFilters;
    supplierCount: number;
    masterRooms: MasterRoom[];
    taxesAndSurcharges: TaxesAndSurcharges;
    propertySearchToken: string;
    longStayPromotions: any[];
    pricePeekMaximumDiscount: number;
}

export interface RoomGridDataFilters {
    title: string;
    filterItems: FilterItem[];
}

export interface FilterItem {
    id: string;
    title: string;
    symbol: string;
    description: string;
    isPreActive: boolean;
}

export interface MasterRoom {
    demographics: Demographic;
    facilityGroups: FacilityGroup[];
    maxOccupancy: number;
    maxExtrabeds: number;
    searchId: string;
    id: number;
    name: string;
    roomThumbnail: RoomThumbnail;
    imageIds: string[];
    images: string[];
    providerIds: number[];
    captions: string[];
    thumbnails: string[];
    thumbnailsList: RoomThumbnail[];
    features: TaxesAndSurcharges[];
    bedConfigurationSummary: TaxesAndSurcharges;
    bedroomLayouts: BedroomLayout[];
    amenities: TaxesAndSurcharges[];
    rooms: Room[];
    facilities: any[];
    beddingConfig: BreakfastInformation;
    familyHighlightTooltipViewModel: ViewModel[];
    cheapestPrice: number;
    beforeDiscountPrice: number;
    percentageDiscountTextOnImageGallery: string;
    hasRoom: boolean;
    recommendedRoomName: string;
    urgencyMessage: TaxesAndSurcharges;
    propagandaMessages: TaxesAndSurcharges[];
    firstRoomAvailability: number;
    isMultiRoomSuggestion: boolean;
    isFamilyHighlightRoom: boolean;
    isDormitory: boolean;
    isUmrahBooking: boolean;
    showMoreRoomAmenitiesButton: boolean;
    lastBooked: string;
    someoneJustBookPrice: number;
    roomHighlightBadges: any[];
    customizableRoomGridOptions: CustomizableRoomGridOption[];
}

export interface TaxesAndSurcharges {
    symbol: string;
    title: string;
    isAvailable: boolean;
    id: number;
    value: number;
    targetType: number;
    hasDescription: boolean;
    associatedFilters?: string[];
    description?: string;
    extra?: Extra;
}

export enum Extra {
    F = "f",
    OceanGreen = "ocean-green",
    The0D100P100P = "0D100P_100P",
    The1D46P46P = "1D46P_46P",
}

export interface BedroomLayout {
    title: string;
    bedrooms: Bedroom[];
}

export interface Bedroom {
    title: string;
    beds: Bed[];
}

export interface Bed {
    name: string;
    symbol: string;
    quantity: number;
}

export interface CustomizableRoomGridOption {
    itemId: number;
    groupKey: string;
    roomIdentifier: string;
    roomGridOffer: number;
    parentItemId?: number;
}

export interface FacilityGroup {
    id: number;
    name: string;
    facilities: Facility[];
}

export interface Facility {
    title: string;
    symbol: string;
    isAvailable: boolean;
    id: number;
}

export interface ViewModel {
    description: string;
}

export interface RoomThumbnail {
    src: string;
    src2X: string;
}

export interface Room {
    filters: Filter[];
    redirectRoomKeyWithPrice: string;
    roomChildAndExtraBedPolicyViewModel: RoomChildAndExtraBedPolicyViewModel;
    shouldShowCouponOrMoneyBackBadge: boolean;
    isRecomendedRoom: boolean;
    shouldDisplayExtraBedAvaiableOnAgodaText: boolean;
    features: RoomFeature[];
    featureCategory: number;
    percentageDiscountText: string;
    percentageDiscountTextOnImageGallery: string;
    percentageDiscountNumber: string;
    discountPercentage: number;
    isDealOfTheDayRoom: boolean;
    uid: string;
    apsPeekUniqueId: string;
    uniqueIdWithoutOccupancy: string;
    ratePlanImage: string;
    payLater?: TaxesAndSurcharges;
    cancellation: TaxesAndSurcharges;
    highlight?: TaxesAndSurcharges;
    roomUrgencyMessage: TaxesAndSurcharges;
    maxFreeChildren: number;
    childrenStayFreeTypeId: number;
    childAgesRangeTooltip: string;
    isShowMaxChildrenAge: boolean;
    maxOccupancy: number;
    maxCapacityMessage: string;
    isFit: boolean;
    shouldSelectedNumberOfRooms: number;
    quantity: number;
    isLimitedToSearchedOccupancy: boolean;
    isBlockCustomerToModifyNumberOfRoomMobile: boolean;
    isBlockCustomerToModifyExtrabeds: boolean;
    isPromotionEligibleRoom: boolean;
    roomNotFitTooltipMessage: string;
    shouldDisplayExtraBed: boolean;
    isBookOnRequest: boolean;
    isDisableDefaultRoomNumber: boolean;
    shouldShowGiftCardHoverInfo: boolean;
    isInstantGiftcard: boolean;
    isFreeCancellation: boolean;
    recomendedNumberOfRooms: number;
    isMultiRoomPromotionPriceChange: boolean;
    shouldShowPromotionBreakdown: boolean;
    isSimplifiedChinese: boolean;
    instantBookingTitle: string;
    isAgodaBrand: boolean;
    suppliedByText: HeaderRooms;
    supplierDisplayName: string;
    childRoomInfoDetailViewModel: ViewModel[];
    corSummary: CorSummary;
    isInsiderDeal: boolean;
    isShowAgodaVip: boolean;
    sellOutPredictionTime: number;
    isMultipleRoomAssignmentPrice: boolean;
    isOverrideChildTypeRequest: boolean;
    packageEligible: boolean;
    multiHotelEligible: boolean;
    stayPackageType: number;
    rareFindType: number;
    isEasyCancel: boolean;
    isAgp: boolean;
    needOccupancySearch: boolean;
    cartEligible: boolean;
    isChildRateEnabled: boolean;
    dmcPolicyText: BreakfastInformation;
    id: number;
    masterId: number;
    uniqueId: string;
    roomIdentifiers: string;
    name: string;
    dmcRoomId: string;
    supplierId: number;
    channelId: number;
    channelIds: any[];
    channelDiscount: BreakfastInformation;
    rateModelId: number;
    ratePlanId: number;
    promotionId: number;
    paymentModel: number;
    paymentChannels: any[];
    benefits: TaxesAndSurcharges[];
    promotion?: TaxesAndSurcharges;
    taxesAndSurcharges: TaxesAndSurcharges;
    taxesAndSurchargesList: string[];
    occupancy: number;
    adults: number;
    children: number;
    numberOfGuestsWithoutRoom: number;
    extraBeds: number;
    numberOfGuests: number;
    numberOfMandatoryExtraBeds: number;
    packagedExtraBeds: number;
    checkedExtraBeds: number;
    availability: number;
    isBreakfastIncluded: boolean;
    currency: string;
    currencyDisplay: string;
    crossedOutMessage: string;
    extraBedMessage: string;
    occupancyMessage: string;
    bookingForm: BookingForm;
    pricePopupViewModel: PricePopupViewModel;
    corBreakdown: CorBreakdown;
    apsPeekViewModel: BreakfastInformation;
    stealTheDeal: StealTheDeal;
    pricing: Pricing;
    paymentOption?: PaymentOption;
    isAveragePrice: boolean;
    shouldShowPriceBreakDownPopUp: boolean;
    shouldShowPostCashBackPrice: boolean;
    cashbackDayToEarn: number;
    formattedCashbackAmountWithCurrency: string;
    priceView: number;
    applyGiftcardBalance: boolean;
    inclusivePrice: ExclusivePrice;
    exclusivePrice: ExclusivePrice;
    totalPrice: ExclusivePrice;
    inclusivePriceWithoutExtraBed: ExclusivePrice;
    perNightPrice: ExclusivePrice;
    inclusivePricePerNightWithoutExtraBed: ExclusivePrice;
    price: ExclusivePrice;
    packageSavingPrice: number;
    numberOfFixRoom: number;
    isAgodaMorp: boolean;
    shouldShowGoLocalBadge: boolean;
}

export interface BookingForm {
    arguments: string;
    expressBookingUrl: string;
    isDesktopNewBookingForm: boolean;
    isUmrahBookingForm: boolean;
    isDesktopNewBookingFormM3Traffic: boolean;
    isDesktopNewBookingFormM4Traffic: boolean;
    isDesktopNewBookingFormM6Traffic: boolean;
    isDesktopNewBookingFormBorTraffic: boolean;
    isDesktopNewBookingFormNhaBorTraffic: boolean;
    isDesktopNewBookingFormSupBorTraffic: boolean;
    isDesktopNewBookingFormCnM1Traffic: boolean;
    isDesktopNewBookingFormIndiaM1Traffic: boolean;
    isDesktopNewBookingFormM4ImpactSegment: boolean;
    isDesktopNewBookingFormM5ImpactSegment: boolean;
    isDesktopNewBookingFormM6ImpactSegment: boolean;
    isDesktopNewBookingFormCnM1ImpactSegment: boolean;
    isDesktopNewBookingFormIndiaM1ImpactSegment: boolean;
    isDesktopNewBookingFormAgencyImpactSegment: boolean;
    isDesktopNewBookingFormJtb: boolean;
}

export interface CorBreakdown {
    hotelRates: HotelRate[];
    priceSummaries: HotelRate[];
    isGiftCardAppliedToPrice: boolean;
    isGenius: boolean;
    isVipRateAmountOff: boolean;
}

export interface HotelRate {
    id: number;
    itemText: string;
    amount: number;
    cssClass: string;
    displayType: number;
    displayKey: number;
}

export interface CorSummary {
    hasCor: boolean;
    corType: number;
    corText: string;
    isOriginal: boolean;
    hasOwnCOR: boolean;
}

export interface ExclusivePrice {
    display: number;
    crossedOut: number;
    extraBed: number;
    couponCrossedOut: number;
}

export interface RoomFeature {
    cancellationType?: number;
    id: number;
    type: number;
    title?: string;
    icon?: string;
    description?: string;
    associatedFilter?: string;
    doesTitleRequireStringFormat: boolean;
    roomFeatureGroupCategory: HeaderWhatIncluded;
    benefits?: Benefit[];
    isExtraText?: boolean;
    isFlashDeal?: boolean;
    extraText?: string;
    colorClass?: string;
}

export interface Benefit {
    id: number;
    description: string;
    targetType: number;
}

export enum HeaderWhatIncluded {
    Benefits = "Benefits",
    OptionalBenefits = "OptionalBenefits",
    RewardsAndDiscounts = "RewardsAndDiscounts",
}

export interface Filter {
    id: string;
    name: string;
}

export interface PaymentOption {
    title: string;
    payNow: string;
    payLater: string;
    payNowButtonText: string;
    payLaterButtonText: string;
    amountPayNow: string;
    amountPayLater: string;
    payNowWithPaymentMethod: string;
    payLaterWithPaymentMethod: string;
    processPaymentPayNow: string;
    processPaymentPayLater: string;
    youCanCancelPayNow: string;
    youCanCancelPayLater: string;
    cancellationToolTipText: string;
    earnPointsPayNow: string;
    earnPointsPayLater: string;
    perNightPerRoom: string;
    totalPrice: string;
    shouldShowModal: boolean;
    isPayOnCheckin: boolean;
}

export interface PricePopupViewModel {
    formattedRoomPerNightAmount: string;
    formattedChargePriceAmount: string;
    formattedTaxesAndFeesAmount: string;
    roomPricePerNightAmount: number;
    chargePriceAmount: number;
    taxesAndFeesAmount: number;
    shouldShowPopup: boolean;
    shouldShowCouponOrMoneyBackBadge: boolean;
    formattedAgodaPrice: string;
    propertyCrossoutRatePrice: number;
    agodaPrice: number;
    shouldShowTaxAndFee: boolean;
    giftCardViewModel: GiftCardViewModel;
    cashbackViewModel: CashbackViewModel;
    couponViewModel: CouponViewModel;
    propertyRateText: AgodaRateText;
    agodaRateText: AgodaRateText;
    agodaMemberRateText: string;
    couponAppliedText: string;
    taxesAndFeesText: string;
    totalText: AgodaRateText;
    moneyBackViaGiftCardText: string;
    adjustedTotalText: string;
    pleaseContinueWithBookingText: string;
    isGiftcardAppliedDisplay: boolean;
    giftcardAppliedText: string;
    formattedGiftcardAppliedAmount: string;
    isCouponCorSwap: boolean;
    isInstantGiftCard: boolean;
    formattedPropertyCrossoutRatePrice?: string;
}

export enum AgodaRateText {
    AgodaRate = "Agoda rate:",
    PropertyPrice = "Property price:",
    Total = "Total",
}

export interface CashbackViewModel {
    adjustedPriceAmount: number;
    formattedAdjustedPriceAmount: string;
    formattedCashbackAmountOnBadge: string;
    formattedCashbackAmountWithCurrency: string;
    formattedCashbackAmountOnPopUp: string;
    cashbackAmount: number;
    cashbackAmountPerTrip: number;
    cashbackAmountPerOneExtraBed: number;
    cashbackAmountPerRoomPerNight: number;
    cashbackAmountPerExtraBedPerNight: number;
    shouldShow2Decimal: boolean;
    shouldShowCashbackBadge: boolean;
    shouldShowPostCashBackPrice: boolean;
    cashbackBadgeEarnText: string;
    cashbackBadgeEarnTooltipText: string;
    coFundCashbackBadgeEarnTooltipText: string;
}

export interface CouponViewModel {
    currency: string;
    couponAmount: number;
    originalPricePerNight: number;
    shouldShowCouponBadge: boolean;
    shouldShowCouponCrossoutPrice: boolean;
    shouldShowPopup: boolean;
    formattedCouponAmountOnBadge: string;
    formattedCouponAmountOnPopUp: string;
    formattedOriginalPriceOnPopUp: string;
    formattedCouponAmountWithCurrency: string;
    sellAllInPricePerNight: number;
    couponCrossoutCmsText: string;
    couponCrossedOutPriceFormatted: string;
    couponCrossedOutPrice: number;
    isSingleRoomCoupon: boolean;
}

export interface GiftCardViewModel {
    adjustedPriceAmount: number;
    formattedAdjustedPriceAmount: string;
    formattedMoneyBackAmountOnBadge: string;
    formattedMoneyBackAmountOnPopUp: string;
    moneyBackAmount: number;
    moneyBackAmountPerTrip: number;
    moneyBackAmountPerOneExtraBed: number;
    giftCardAmountPerRoomPerNight: number;
    giftCardAmountPerExtraBedPerNight: number;
    shouldShow2Decimal: boolean;
    shouldShowMoneyBackBadge: boolean;
    shouldShowPopup: boolean;
    formattedMoneyBackAmountWithCurrency: string;
    giftCardHoverHeader: string;
    giftCardHoverInfo: string;
    isModifyCmsForGiftCardsTest: boolean;
    giftCardEarnText: string;
    shouldShowGiftCardEarnText: boolean;
}

export interface Pricing {
    displayPrice: number;
    displayPriceExcludeExtraBed: number;
    isInclusive: boolean;
    crossOutRatePrice: number;
    crossOutRatePriceExcludeExtraBed: number;
    crossOutRateMessage: string;
    crossOutRateType: number;
    couponCrossOutRatePrice: number;
    couponCrossOutRatePriceExcludeExtraBed: number;
    couponCrossOutRateMessage: string;
    isPointMax: boolean;
    isTaxFree: boolean;
    priceBreakDown: PriceBreakDown;
    autoAppliedPromoDiscount: number;
    isLogin: boolean;
    shouldShowPriceBreakDown: boolean;
    showPriceExcludeExtrabed: boolean;
    giftCardAmount: number;
    giftCardAmountPerExtraBed: number;
    giftCardAmountPerRoomPerNight: number;
    giftCardAmountPerExtraBedPerNight: number;
    breakfastPrice: number;
    displaySummary: DisplaySummary;
    extraInfo: { [key: string]: number };
    longStayPromotionMinNightsStay: number;
}

export interface DisplaySummary {
    map: BreakfastInformation;
    perBook: Per;
    perRoomPerBook: Per;
    perRoomPerNight: Per;
    perNight: Per;
}

export interface Per {
    map: BreakfastInformation;
    chargeTotal: ChargeTotal;
    rebateTotal: ChargeTotal;
    rebateExtraBed: ChargeTotal;
    displayTotal: ChargeTotal;
    pseudoCoupon: ChargeTotal;
    originalTotal: ChargeTotal;
    payToAgoda: ChargeTotal;
    payAtHotel: ChargeTotal;
    ignoreDownliftAmount: ChargeTotal;
}

export interface ChargeTotal {
    exclusive: number;
    allInclusive: number;
}

export interface PriceBreakDown {
    pleaseContinueBookingText: string;
    priceBreakDownItems: PriceBreakDownItem[];
    isFormatDecimal: boolean;
    isAddAgodaRate: boolean;
    coupon: number;
}

export interface PriceBreakDownItem {
    rateType: AgodaRateText;
    price: number;
    isTotal: boolean;
    isCoupon: boolean;
    isMoneyBack: boolean;
    adjustPrice: number;
    isAgodaRate: boolean;
    isAgodaMemberPrice: boolean;
    isTaxAndFee: boolean;
    isDisplayAppliedGiftcard: boolean;
}

export interface RoomChildAndExtraBedPolicyViewModel {
    capacityText: string;
    childrenRangeYear: string;
    childrenRangeYearDesc: string;
    childrenOlderYear: string;
    childrenOlderDesc: string;
    infantRangeYear: string;
    infantRangeYearDesc: string;
    extraPolicies: string[];
    stayFreeMinAge: number;
    stayFreeMaxAge: number;
    childMinAge: number;
    childMaxAge: number;
    hasChildrenAndExtraBedPolicies: boolean;
    isAllowChildren: boolean;
    withPolicyChildrenStayFree: boolean;
}

export interface StealTheDeal {
    isEligible: boolean;
}

export interface WelcomeSearchCriteria {
    pageInitData: SearchCriteriaPageInitData;
    initApsPeek: string;
}

export interface SearchCriteriaPageInitData {
    isManualCal: boolean;
    ssrUrl: string;
    isAPSPeek: boolean;
}

export interface Searchbox {
    defaultTab: number;
    searchCriteria: SearchboxSearchCriteria;
    config: Config;
    cms: SearchboxCMS;
}

export interface SearchboxCMS {
    autoComplete: CMSAutoComplete;
    dateRange: DateRange;
    occupancy: CMSOccupancy;
    summary: Summary;
    searchBox: SearchBox;
    filters: CMSFilters;
    dateDefinition: DateDefinition;
    title: string;
    showPackageDeals: ShowPackageDeals;
    showPackageDealsOnFlight: ShowPackageDealsOnFlight;
    multiProductOnHomePage: MultiProductOnHomePage;
    activities: Activities;
    similarCities: SimilarCities;
    searchButton: string;
    searchFlightsButton: string;
    searchModifyButton: string;
}

export interface Activities {
    searchBoxPlaceholderText: string;
    searchBoxErrorPlaceholderText: string;
    searchBoxLabelText: string;
    searchBoxErrorLanguagesNotSupported: string;
    searchText: string;
    searchDefaultText: string;
    searchSuggestionSubtext: string;
    searchSuggestionPopular: string;
    ariaValues: AriaValues;
}

export interface AriaValues {
    ariaCloseModal: string;
}

export interface CMSAutoComplete {
    properties: string;
    room: string;
    rooms: string;
    adult: string;
    adults: string;
    child: string;
    children: string;
    bestSeller: string;
    popular: string;
    recentSearch: string;
    countryDestination: string;
    internationalDestination: string;
    areas: string;
    landmarks: string;
    popularCitiesInX: string;
    xstayedHere: string;
    iconAriaLabels: IconAriaLabels;
}

export interface IconAriaLabels {
    topDestination: string;
    destination: string;
    property: string;
    city: string;
    landmark: string;
    airport: string;
    region: string;
}

export interface DateDefinition {
    popularDate: string;
    weHaveLimitedAvailability: string;
    baseOnCurrentKnownAvailability: string;
    averagePricesForPropertyWithCurrency: string;
    averagePricesForPropertyWithCurrencyInThousand: string;
    averagePricesForCityWithCurrency: string;
    averagePricesForCityWithCurrencyInThousand: string;
    approximatePricesForProperty: string;
    approximatePricesForCity: string;
    soldOutCalendarDescription: string;
    calendarPriceTrendLegend: string;
}

export interface DateRange {
    months: string[];
    daysShort: string[];
    daysLong: string[];
    confirmDateText: string;
    confirmDateCancelText: string;
    titleFormat: string;
    titleText: string;
    priceInThousands: string;
    quickSelection: string;
    sameDayCheckout: string;
    oneWeekStay: string;
    quickSelectionNight: string;
    quickSelectionNights: string;
    uptoXHours: string;
    shortMonthNames: string[];
    dateRangeFormat: string;
}

export interface CMSFilters {
    priceTitle: string;
    expandText: string;
    reviewTitle: string;
    reviewAll: string;
    reviewScore: string;
    ratingTitle: string;
    ratingAndUp: string;
}

export interface MultiProductOnHomePage {
    addAFlightText: string;
    addAHotelText: string;
    removeMultiProductText: string;
    hotelIndexText: string;
    bundleAndSaveBadgeText: string;
    flightText: string;
    hotelText: string;
}

export interface CMSOccupancy {
    room: string;
    rooms: HeaderRooms;
    adult: string;
    adults: string;
    child: string;
    children: string;
    childAge: string;
    childrenAge: string;
    ages18OrAbove: string;
    ages0To17: string;
    ageOfChild: string;
    groupRate: string;
    specialGroupRates: string;
    seeDetails: string;
    warningText: string;
    warningTextPlural: string;
    warningDesc: string;
    warningDescPlural: string;
    ageRange: string[];
    noChildrenTitle: string;
    noChildrenDesc: string;
    checkbox: PurpleCheckbox;
    segmentFamilies: string;
    segmentGroup: string;
    segmentBusiness: string;
    segmentSolo: string;
    segmentCouples: string;
    segmentBadgeText: string;
    groupTravellerPartnerHeader: string;
    groupTravellerPartnerSubHeader: string;
    groupTravellerPartnerNewTag: string;
    groupTravellerPartnerActionText: string;
    oneRoomVsMoreTooltip: string;
    childRateDescriptionLinkText: string;
    ariaSubtractButton: string;
    ariaAddButton: string;
}

export interface PurpleCheckbox {
    preferFamilyRooms: string;
    preferGroupRooms: string;
    showFamilyOptions: string;
}

export interface SearchBox {
    dates: Dates;
    occupancy: SearchBoxOccupancy;
    loyaltySearchType: LoyaltySearchType;
    placeholder: string;
    search: string;
    invalidSearch: string;
    invalidPackageDateRangeSearch: string;
    invalidPackageOccupancySearch: string;
    invalidPackageSameDateSearch: string;
    invalidPackageDifferentCountrySearch: string;
    update: string;
    title: string;
    exceedsAllowedLengthOfStay: string;
    exceedsAllowedLengthOfStayAsqSearch: string;
    modifySearch: string;
    packageSearchBox: PackageSearchBox;
    noAirportsOnOrigin: string;
    noAirportsOnDestination: string;
    sameCitySearch: string;
    searchRooms: string;
    searchFlightsPlusHotel: string;
    searchHotelInDifferentCityOrDate: string;
    textSearchInputHeader: string;
    overnightStaysIndication: string;
    dayUseStaysIndication: string;
    dayUseTooltipTitle: string;
    dayUseTooltipSubtitle: string;
    dayUseStaysDescription: string;
    dayUseInfoBarTooltipTitle: string;
    newTagText: string;
    sameDayCheckout: string;
    multipleNights: string;
    oneNight: string;
    sameDayCheckoutWithHours: string;
    labels: Labels;
    ariaValues: AriaValues;
    ariaLabelDestinationTitle: string;
    ariaLabelForm: string;
}

export interface Dates {
    format: string;
    shortFormat: string;
    dayNames: string[];
    shortDayNames: string[];
    monthNames: string[];
    checkInText: string;
    checkOutText: string;
    flexibleText: string;
    flexibleFormat: string;
    ariaLabelCheckIn: string;
    ariaLabelCheckOut: string;
}

export interface Labels {
    destination: string;
    checkIn: string;
    checkOut: string;
    guestsAndRooms: string;
}

export interface LoyaltySearchType {
    earnMilesText: string;
    useMilesText: string;
}

export interface SearchBoxOccupancy {
    room: string;
    rooms: string;
    adult: string;
    adults: string;
    child: string;
    children: string;
    ariaLabelTitle: string;
}

export interface PackageSearchBox {
    modifySearchText: string;
    tripFromText: string;
    roomText: string;
    roomsText: string;
    adultText: string;
    adultsText: string;
    adultWithChildText: string;
    adultsWithChildText: string;
    adultWithChildrenText: string;
    adultsWithChildrenText: string;
    hotelText: string;
    flightText: string;
}

export interface ShowPackageDeals {
    showPackageDealsText: string;
    saveMoreText: string;
    cardText: string;
    ribbonText: string;
}

export interface ShowPackageDealsOnFlight {
    addHotelToSaveUpText: string;
    bundleAndSaveText: string;
    searchFlightsPlusHotelText: string;
}

export interface SimilarCities {
    cityCountrySeparator: string;
    pluralHotelUnit: string;
    singularHotelUnit: string;
}

export interface Summary {
    datesFormat: string;
    dateFormat: string;
    singleNightFormat: string;
    pluralNightsFormat: string;
    shortDayNames: string[];
    shortMonthNames: string[];
    confirmTravelDates: string;
    checkInDateText: string;
    checkOutDateText: string;
}

export interface Config {
    page: Page;
    autoComplete: ConfigAutoComplete;
    calendar: Calendar;
    occupancy: ConfigOccupancy;
    defaultSearchURL: string;
    failSafeUrl: string;
    defaultPopup: number;
    openSearchboxAtLanding: boolean;
    isCircleRating: boolean;
    restaurantsUrl: string;
    enableTypeAnywhere: boolean;
    useRoomOccupancy: boolean;
    childRateDescriptionUrl: string;
    isLoyaltyEarnBurnEnabled: boolean;
    isShowHotelSuggestionImage: boolean;
}

export interface ConfigAutoComplete {
    autoCompleteUrl: string;
    topDestination: TopDestination;
    googleSearchUrl: string;
    recentSearchAmount: number;
    loadingCount: number;
}

export interface TopDestination {
    url: string;
    urlFallback: string;
    amount: number;
}

export interface Calendar {
    checkInRange: CheckRange;
    checkOutRange: CheckRange;
    holidaysUrl: string;
    calendarExtrasUrl: string;
    firstDayOfWeek: number;
    defaultLos: number;
    maximumAllowedLos: number;
    showDatePickerAlert: boolean;
    asqAllowedCountriesOnBltConfiguration: AsqAllowedCountriesOnBltConfiguration;
    asqAllowedCitiesConfiguration: BreakfastInformation;
    asqAllowedCountriesConfiguration: AsqAllowedCountriesConfiguration;
    asqConfig: AsqConfig;
}

export interface AsqAllowedCountriesConfiguration {
    "70": any[];
}

export interface AsqAllowedCountriesOnBltConfiguration {
    quarantineth: number;
    quarantinehk: number;
    quarantineph: number;
    quarantinein: number;
    quarantinetw: number;
    quarantineid: number;
    quarantinejp: number;
    quarantinesg: number;
}

export interface AsqConfig {
    popupCountryLevelConfig: { [key: string]: PopupCountryLevelConfig };
    losCountryLevelConfig: { [key: string]: LosCountryLevelConfig };
    bannerCountryLevelConfig: { [key: string]: BannerCountryLevelConfig };
    filterCountryLevelConfig: FilterCountryLevelConfig;
    asqAllowedCountriesConfiguration: AsqAllowedCountriesConfiguration;
}

export interface BannerCountryLevelConfig {
    showBannerSsr: boolean;
    showBannerPp: boolean;
    showBannerBtn: boolean;
    showBannerLink: boolean;
    showTitle: boolean;
    showTitleAfterFilterApplied: boolean;
    bannerLinkUrl: string;
    cmsId: BannerCountryLevelConfigCMSID;
}

export interface BannerCountryLevelConfigCMSID {
    description?: number;
    descriptionAfterFilterApplied?: number;
    showMoreDealsBtn?: number;
    learnMoreLinkBtn?: number;
    descriptionPp?: number;
    title?: number;
}

export interface FilterCountryLevelConfig {
    "70": The70;
}

export interface The70 {
    showFilter: boolean;
    cidForPillDropdown: CidForPillDropdown[];
    cmsId: The70_CMSID;
}

export interface CidForPillDropdown {
    cid: number;
    labelCmsId: number;
    pillLabelCmsId: number;
}

export interface The70_CMSID {
    filterDescription: number;
}

export interface LosCountryLevelConfig {
    los: number[];
    cmsId: LosCountryLevelConfigCMSID;
}

export interface LosCountryLevelConfigCMSID {
    losToolTipText: number;
    losPopupTitle: number;
    losPopupDesc: number;
    losPopupButton: number;
}

export interface PopupCountryLevelConfig {
    showPopup: boolean;
    cmsId: PopupCountryLevelConfigCMSID;
}

export interface PopupCountryLevelConfigCMSID {
    header?: number;
    description?: number;
    yesButton?: number;
    noButton?: number;
}

export interface CheckRange {
    start: number;
    end: number;
}

export interface ConfigOccupancy {
    rooms: Adults;
    adults: Adults;
    children: Adults;
    maxRooms: number;
    defaultChildAge: number;
}

export interface Adults {
    min: number;
    max: number;
}

export interface Page {
    locale: string;
    ckuid: string;
    prid: number;
    gclid: string;
    currency: string;
    correlationId: string;
    analyticsSessionId: string;
    pageTypeId: number;
    realLanguageId: number;
    languageId: number;
    origin: string;
    stateCode: string;
    cid: number;
    tag: string;
    userId: string;
    whitelabelid: number;
    loginLvl: number;
    storefrontId: number;
    currencyId: number;
    currencyCode: string;
    htmlLanguage: string;
    cultureInfoName: string;
    machineName: string;
    trafficGroupId: number;
    trafficSubGroupId: number;
    aid: number;
    useFullPageLogin: boolean;
    cttp: number;
    isRealUser: boolean;
    mode: string;
    utm_medium: string;
    utm_source: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
    browserFamily: string;
}

export interface SearchboxSearchCriteria {
    searchText: string;
    checkIn: Date;
    checkOut: Date;
    occupancy: SearchCriteriaOccupancy;
    datelessLanding: boolean;
}

export interface SearchCriteriaOccupancy {
    rooms: number;
    adults: number;
    children: number;
    checkbox: FluffyCheckbox;
    travellerType: number;
}

export interface FluffyCheckbox {
    type: number;
}

export interface SEO {
    isNHA: boolean;
    shouldUseLodgingBusinessSchemaAndUseNewItemProps: boolean;
    shouldShowCorrelationId: boolean;
    shouldRenderPriceRangeLDJson: boolean;
    shouldHideHotelMapsForPrerender: boolean;
}

export interface WelcomeStickyFooter {
    discount: StickyFooterDiscount;
}

export interface StickyFooterDiscount {
    percentageDiscount: string;
    cheapestPriceWithCurrency: string;
}

export interface Tealium {
    countryId: number;
    countryOrigin: string;
    stateOrigin: string;
    cityId: number;
    cid: number;
    tag: string;
    sid: number;
    pageTypeId: number;
    languageId: number;
    languageCode: string;
    isDev: boolean;
    isQA: boolean;
    isLive: boolean;
    isRealUser: boolean;
    userVipLevel: number;
    adult: number;
    children: number;
    deviceType: string;
    attributionViewModel: AttributionViewModel;
    bltId: number;
    currencyCode: string;
    tax: number;
    totalPriceTaxExc: number;
    totalPriceTaxInc: number;
    trafficGroup: number;
    trafficSubGroup: number;
    isMspa: boolean;
    defaultTealiumUrl: string;
    tealiumProfile: string;
    isTealiumEnableForWhiteLabel: boolean;
    isCCPAEnabled: boolean;
    isGpcActive: boolean;
    tealiumWhitelabelLanguageId: number;
    tealiumAccount: string;
    productId: number;
    isTealiumSupportPageEnabled: boolean;
    stopTealium: boolean;
    tealiumExperiments: TealiumExperiments;
    whiteLabelId: number;
    supplierHotelId: number;
    isUserConsentedAll: boolean;
}

export interface AttributionViewModel {
    hasSessionFirstClick: boolean;
    sessionFirstClickAttributionCID: string;
    sessionFirstClickAttributionTag: string;
    sessionFirstClickAttributionModelID: string;
    sessionFirstClickAttributionAdditionalData: string;
    hasCookieLastClick: boolean;
    cookieLastClickAttributionCID: string;
    cookieLastClickAttributionTag: string;
    cookieLastClickAttributionModelID: string;
    cookieLastClickAttributionAdditionalData: string;
}

export interface TealiumExperiments {
    "mktbB-5389-M": string;
    "mktbB-5389-D": string;
    "remarketinG-TEST-1": string;
    "remarketinG-TEST-2": string;
    "remarketinG-TEST-3": string;
    "remarketinG-TEST-4": string;
    "remarketinG-TEST-5": string;
    "moneY-EXP-1": string;
    "moneY-EXP-2": string;
    "moneY-EXP-3": string;
    "moneY-EXP-4": string;
    "moneY-EXP-5": string;
}

export interface Translations {
    hostInfo: HostInfo;
    stealTheDealBanner: StealTheDealBanner;
    hotelGuestPolicies: HotelGuestPolicies;
    hotelFaq: HotelFAQ;
    featuresYouLove: TranslationsFeaturesYouLove;
    galleryPreview: GalleryPreview;
    galleryReviewSnippet: GalleryReviewSnippet;
    familyHighlight: FamilyHighlight;
    multiRoomSuggestion: MultiRoomSuggestion;
    map: Map;
    reviewRating: ReviewRating;
    location: Location;
    locationRating: LocationRating;
    hotelHeader: HotelHeader;
    placesOfInterest: TranslationsPlacesOfInterest;
    insiderDealBanner: InsiderDealBanner;
    supplierBanner: SupplierBanner;
    promotionSnippet: PromotionSnippet;
    goldCircleAwards: GoldCircleAwards;
    installmentOptions: InstallmentOptions;
    capacity: Capacity;
    chatWindowAutoResponse: ChatWindowAutoResponse;
    instantConfirmation: InstantConfirmation;
    searchCriteria: TranslationsSearchCriteria;
    favoriteHeart: FavoriteHeart;
    stickyFooter: TranslationsStickyFooter;
    roomGrid: RoomGrid;
    callToAction: CallToAction;
    similarPropertiesSoldout: SimilarPropertiesSoldout;
    masterSoldOutRoom: MasterSoldOutRoom;
    urgency: Urgency;
    insiderDealBadge: InsiderDealBadge;
    metaRanking: MetaRanking;
    promoEligibleBadge: AwardsAndAccolades;
    pricingDisplay: PricingDisplay;
    multiRoomTypeBooking: MultiRoomTypeBooking;
    taxesAndSurcharges: TranslationsTaxesAndSurcharges;
    apsPeek: ApsPeek;
    sellOutPrediction: SellOutPrediction;
    dealOfTheDay: DealOfTheDay;
    fiveStarDealOfTheDay: FiveStarDealOfTheDay;
    reviewSnippet: ReviewSnippet;
    hotelRestaurants: HotelRestaurants;
    reviewFilterWordCloud: ReviewFilterWordCloud;
    aboutHotel: TranslationsAboutHotel;
    aboutProperty: AboutProperty;
    recommendedPropertiesV2: RecommendedPropertiesV2;
    soldOut: SoldOut;
    roomRateCategoryOverlay: { [key: string]: string };
    noCcFilterBanner: NoCcFilterBanner;
    childOccupancy: ChildOccupancy;
    onReviewScoreHover: OnReviewScoreHover;
    expressBook: ExpressBook;
}

export interface TranslationsAboutHotel {
    hotSpringText: string;
    mostTalkedAboutFacilities: string;
    houseRulesText: string;
    popularFacilitiesText: string;
    showMore: string;
    showLess: string;
    legalInformation: string;
    legalInformationDescription: string;
    nswCodeOfConductTitle: string;
    nswCodeOfConductLink: string;
    nswCodeOfConductDescription: string;
}

export interface AboutProperty {
    guestsTalkedALotAbout: string;
    amountMentionsInReviews: string;
}

export interface ApsPeek {
    apsPeekSignInAndPay: string;
    apsPeekSignInAndSave: string;
    apsPeekPopup: string;
    apsPeekPanelText: string;
    apsSecretDealText: string;
}

export interface CallToAction {
    bookNow: string;
    bookNowAnd: string;
    bookOnRequest: string;
    bookXBedsNowAnd: string;
    bookXBedsNow: string;
    bookXRoomsNowAnd: string;
    bookXRoomsNow: string;
    bookXBeds: string;
    bookXRooms: string;
    payLater: string;
    payAtHotel: string;
    payOnCheckin: string;
    reserve: string;
    requestToBook: string;
    addToTrip: string;
}

export interface Capacity {
    free: string;
    oneChildUnderOneYear: string;
    oneChildUnderXYears: string;
    oneChildBetweenYear: string;
    xChildrenUnderOneYears: string;
    xChildrenUnderXYears: string;
    xChildrenBetweenYear: string;
    capacityOneKidUnderOneYear: string;
    capacityOneKidUnderXYear: string;
    capacityOneKidBetweenYear: string;
    capacityXKidsUnderOneYear: string;
    capacityXKidsUnderXYear: string;
    capacityXKidsBetweenYear: string;
    roomExceedWarning: string;
    roomExceedWarningPlural: string;
    occToolTip_Fit: string;
    occToolTip_FitWithEB: string;
    occToolTip_FitAdultsOnly: string;
    occToolTip_FitWithEBAdultsOnly: string;
    occToolTip_RoomOnlyAdults: string;
    occToolTip_RoomAdultsAndKids: string;
    occToolTip_RoomGuests: string;
    occToolTip_ExtraBedAvailable: string;
    occToolTip_ExtraBedAdded: string;
    occToolTip_ExtraBedPolicy: string;
    occToolTip_GuestExceed: string;
    occToolTip_GuestExceedAndAgeLimit: string;
    priceOneAdult: string;
    priceXAdults: string;
    priceOneAdultOneChild: string;
    priceXAdultsOneChild: string;
    priceOneAdultXChildren: string;
    priceXAdultsXChildren: string;
    includesOneExtraBed: string;
    includesXExtraBeds: string;
    learnMore: string;
}

export interface ChatWindowAutoResponse {
    sendQuestionProperty: string;
    questionSent: string;
    questionHasBeenSent: string;
    messageNotSent: string;
    showMore: string;
    showLess: string;
    greeting: string;
    greetingNoRoom: string;
}

export interface ChildOccupancy {
    oneAdult: string;
    adultGuests: string;
    adultGuestsCount: string;
    adultGuestsFacilitiesText: string;
    gradeScholar: string;
    gradeScholarFacilitiesText: string;
    preScholar: string;
    preScholarFacilitiesText: string;
    headerText: string;
    toddler: string;
    toddlerFacilitiesText: string;
    baby: string;
    babyFacilitiesText: string;
    expandButtonText: string;
    guestsSettings: string;
    updateMySearchButtonText: string;
    addRoomButton: string;
    roomIdentifierText: string;
    updateButton: string;
    roomSummaryTextManyAdultManyChildren: string;
    roomSummaryTextOneAdultManyChildren: string;
    roomSummaryTextManyAdultsOneChild: string;
    roomSummaryTextOneAdultOneChild: string;
    guestSettingSubHeadlineNone: string;
    guestSettingSubHeadlinePlural: string;
    guestSettingSubHeadlineSingular: string;
    childAgePropertyWarning: string;
    nameAndBenefitDescription: string;
    includedInOccupancy: string;
    fee: string;
}

export interface DealOfTheDay {
    dealOfTheDayText: string;
}

export interface ExpressBook {
    bookingExpressOr: string;
    bookingExpressText: string;
}

export interface FamilyHighlight {
    family: string;
}

export interface FavoriteHeart {
    addToFavorite: string;
    removeFromFavorite: string;
    errorMessage: string;
}

export interface TranslationsFeaturesYouLove {
    headerTitleNormal: string;
    headerTitleFamilies: string;
    reviewsPromptFamilies: string;
    seeReviews: string;
    your1oldChildStayFree: string;
    yourXoldChildStayFree: string;
    yourBothChildrenStayFree: string;
    xOfYourChildrenStayFree: string;
    yourAllChildrenStayFree: string;
    childAndExtrabedPolicyDefault: string;
    childPolicyTooltipSubHeader: string;
    reviewsPromptGroup: string;
}

export interface FiveStarDealOfTheDay {
    fiveStarDealOfTheDayText: string;
}

export interface GalleryPreview {
    seeAllPhotos: string;
    seeAllPhotosWithoutNumber: string;
}

export interface GalleryReviewSnippet {
    seeAllReviews: string;
}

export interface GoldCircleAwards {
    goldCircleAward: string;
}

export interface HostInfo {
    viewHostProfile: string;
    verifiedHost: string;
    topHost: string;
    joinedIn: string;
    fastResponse: string;
    readMore: string;
    contactHost: string;
}

export interface HotelFAQ {
    title: string;
    showMoreQuestion: string;
    viewMap: string;
    exploreNeighborhood: string;
    searchHotelDeals: string;
    enterDatesPrice: string;
}

export interface HotelGuestPolicies {
    guestPoliciesChildAndExtrabedTitle: string;
    guestAge: string;
    extraBed: string;
    guestPoliciesOtherTitle: string;
    guestPoliciesAskProperty: string;
    askTheProperty: string;
}

export interface HotelHeader {
    agodaHomesText: string;
    agodaHomesRebrand: string;
    viewOnMapText: string;
    agodaText: string;
    seeWhatIsNearby: string;
    star: string;
    stayInTheHeartOf: string;
    goldenAwardPopoverText: string;
    gotAQuestionText: string;
    askQuestionText: string;
    valueBadgeTooltipHeader: string;
    valueBadgeTooltipMessage: string;
    newlyBuilt: string;
    newlyRenovated: string;
    newlyBuiltInYear: string;
    chineseFriendlyHotel: string;
    topRated: string;
    reviewScoreUnofficiallySourced: string;
    freeWiFi: string;
}

export interface HotelRestaurants {
    nearbyRestaurants: string;
    restaurantsOnSite: string;
    showMore: string;
    showLess: string;
    cuisine: string;
    allCuisines: string;
    menu: string;
    allMenus: string;
    noContent: string;
    breakfastOptions: string;
}

export interface InsiderDealBadge {
    insiderDealOff: string;
    extraInsiderDealOff: string;
}

export interface InsiderDealBanner {
    header: string;
    content: string;
    signIn: string;
}

export interface InstallmentOptions {
    bankName: string;
    installmentAvailable: string;
    installmentAsLowAs: string;
    monthlyInstallmentPlanThatCanBeUsedAtHotel: string;
    month: string;
    months: string;
    interest: string;
    interestRate: string;
    payMonthly: string;
    payMonthlyDescription: string;
}

export interface InstantConfirmation {
    instantConfirmation: string;
    confirmationWithinFewMins: string;
}

export interface Location {
    nearBy: string;
    popular: string;
    seeMore: string;
    distance: string;
    distanceMetre: string;
    popularNeighborhoodTooltip: string;
    seeNearbyPlaces: string;
}

export interface LocationRating {
    exceptionalLocation: string;
    excellentLocation: string;
    veryGoodLocation: string;
    goodLocation: string;
    defaultLocation: string;
    reviewBasedOnText: string;
}

export interface Map {
    seeMap: string;
    reviewsLocationRating: string;
    locationRatingScore: string;
}

export interface MasterSoldOutRoom {
    soldOutText: string;
    soldOutForYourDate: string;
    availableOn: string;
}

export interface MetaRanking {
    biggerThan: string;
    betterThan: string;
    comparedTo: string;
    propertyRanking: string;
    ofSomeProperties: string;
    roomSize: string;
    serviceScore: string;
    roomComfortScore: string;
    valueForMoneyScore: string;
    overallScore: string;
    cleanlinessScore: string;
    locationScore: string;
    facilitiesScore: string;
    amenitiesScore: string;
    publicTransportationScore: string;
    couplesReviewScore: string;
    cheapestPriceScore: string;
    reviewScoreThailand: string;
    reviewScoreMalaysia: string;
    reviewScoreChina: string;
    reviewScoreTaiwan: string;
    reviewScoreUnitedStates: string;
    reviewScoreSouthKorea: string;
    reviewScoreIndonesia: string;
    reviewScoreSingapore: string;
    reviewScoreHongKong: string;
    reviewScoreJapan: string;
    reviewScoreAustralia: string;
    reviewScorePhilipines: string;
    reviewScoreVietnam: string;
    shoppingScore: string;
    familiesReviewScore: string;
    familiesWithYoungKids: string;
    familiesWithOlderKids: string;
    businessReviewScore: string;
    distanceFromCityCenter: string;
    seeAllRanks: string;
    betterThanWithPlaceHolder: string;
}

export interface MultiRoomSuggestion {
    optionsXofY: string;
    headerTitleSingular: string;
    headerTitlePlural: string;
    headerTitleMultpleBeds: string;
    showMore: string;
    showLess: string;
    fitForXAdults: string;
    fitForXAdultsOneChild: string;
    fitForXAdultsXChildren: string;
    saveMoneyForMultple: string;
    priceForXAdults: string;
    priceForXAdultsOneChild: string;
    priceForXAdultsXChildren: string;
    totalPriceCombination: string;
    multiRoomsWithXNight: string;
    multiRoomsWithOneNight: string;
    oneKidUnderOneYearStaysFree: string;
    oneKidUnderXYearsStaysFree: string;
    xKidsUnderOneYearStayFree: string;
    xKidsUnderXYearsStayFree: string;
    oneKidZeroToOneYearStaysFree: string;
    oneKidXToYYearsStaysFree: string;
    xKidsZeroToOneYearStayFree: string;
    xKidsYToZYearsStayFree: string;
    adultsText: string;
    bookXRooms: string;
    seePhotos: string;
    lowestPriceAvailable: string;
    lowestPriceDescription: string;
}

export interface MultiRoomTypeBooking {
    pricePerNight: string;
    pricePerNightPlural: string;
    pricePerNightXBedsPlural: string;
    multiply: string;
    header: string;
    book1Room: string;
    bookXRooms: string;
    pleaseSelectedRoom: string;
    bookNow: string;
    roomWithNumber: string;
}

export interface NoCcFilterBanner {
    thisPropertyNumber: string;
    bookWithoutCC: string;
    noNeedPaymentOption: string;
    viewOffers: string;
    removeFilter: string;
}

export interface OnReviewScoreHover {
    onReviewScoreHoverButtonText: string;
    onReviewScoreHoverBasedOnReviews: string;
}

export interface TranslationsPlacesOfInterest {
    nearbySectionHeader: string;
    mostPopularLandmarks: string;
    closestLandmarks: string;
    closestLandmarksText: string;
    walkableScoreLandmarks: string;
    typesOfLandmark: string;
    landmarkGroupTransportation: string;
    landmarkGroupCulture: string;
    landmarkGroupShopping: string;
    landmarkGroupOutdoors: string;
    landmarkGroupEntertainment: string;
    landmarkGroupBeach: string;
    landmarkGroupDining: string;
    landmarkGroupSpa: string;
}

export interface PricingDisplay {
    riskFree: string;
    giftCardApplied: string;
    giftCardLocked: string;
    crossOutRatePriceBeforeGiftcardMessage: string;
    crossOutRatePriceBeforeCashBackMessage: string;
    priceAfterCashBackMessage: string;
    cashbackInCorBreakDown: string;
    cofundCashbackInCorBreakDown: string;
    giftCardRedeemed: string;
    yourPrice: string;
    nightlyRatesAsLowAs: string;
    totalPricePerNight: string;
}

export interface PromotionSnippet {
    autoApplyCampaignCouponPeekText: string;
    saveXByEnteringCouponCode: string;
    yourPriceAfterPromo: string;
    priceAfterApplyingCoupon: string;
    priceBeforeApplyingCoupon: string;
    saveXUsingYCard: string;
    saveXByApplyingWallet: string;
    priceAfterApplyingWallet: string;
}

export interface RecommendedPropertiesV2 {
    seeOtherRecommendedProperties: string;
    pricePerNightAsLowAs: string;
    kitchen: string;
    oneBedroom: string;
    oneBed: string;
    multipleBedrooms: string;
    multipleBeds: string;
    spaceSize: string;
    breakfast: string;
    freeWifi: string;
}

export interface ReviewFilterWordCloud {
    showReviewsThatMention: string;
    allReviews: string;
}

export interface ReviewRating {
    basedOnReviewsFormat: string;
    basedOnReviewsText: string;
    basedOnReviewsSingular: string;
    basedOnReviewsPlural: string;
    basedOnUnofficiallySourcedReviewsSingular: string;
    basedOnUnofficiallySourcedReviewsPlural: string;
    unofficiallySourcedReviewsHeading: string;
    seeWhatGuestsSaid: string;
    seeWhatReviewersSaid: string;
    wouldRecommendToFriend: string;
    wouldRecommendByReviewers: string;
    guestReviews: string;
    reviewsUnofficiallySourcedDescription: string;
    awaitingReviews: string;
    thisMonth: string;
    trendingReviewScorePercent: string;
    reviewAverageRatingText: string;
    reviewOverallRating: string;
    highReviewScoreForCity: string;
    thumbUpIcon: string;
}

export interface ReviewSnippet {
    reviewScore: ReviewScore;
    reviewTopic: ReviewTopic;
}

export interface ReviewScore {
    disappoint: string;
    aboveAverage: string;
    pleasant: string;
    good: string;
    veryGood: string;
    excellent: string;
    superb: string;
}

export interface ReviewTopic {
    staff: string;
    cleanliness: string;
    location: string;
    bathroomAndToilet: string;
    spaciousness: string;
    breakfast: string;
    safety: string;
}

export interface RoomGrid {
    freeWifi: string;
    moreFeatures: string;
    bedPreference: string;
    askAboutRoom: string;
    popularChoice: string;
    showMore: string;
    showLess: string;
    moreDeals: string;
    bookOnRequestQuestion: string;
    bookOnRequestDescription: string;
    bookOnRequestConfirmation: string;
    headerWhatIncluded: HeaderWhatIncluded;
    headerCapacityDefault: string;
    maxXGuestCanStayInRoom: string;
    extraBedSelectPopover: string;
    addExtraBed: string;
    withExtraBed: string;
    withExtraBeds: string;
    adult: string;
    adults: string;
    adultAndChildren: string;
    adultsAndChildren: string;
    adultAndChild: string;
    adultsAndChild: string;
    headerPrice: string;
    headerRooms: HeaderRooms;
    progressBar: string;
    soldOutAtText: string;
    soldOutText: string;
    soldOutForYourDate: string;
    availableOn: string;
    seeAvailability: string;
    seeAvailableRooms: string;
    luxuryCollectionTermsAndConditions: string;
    additionalBenefits: string;
    collectionBenefit1: string;
    collectionBenefit2: string;
    collectionBenefit3: string;
    collectionBenefit4: string;
    collectionBenefit5: string;
    collectionBenefit6: string;
    clickToRequest: string;
    whyDoINeedToDoThis: string;
    afterMakeRequest: string;
    hostsNormallyReply: string;
    someOfProperties: string;
    whyBookOnRequest: string;
}

export interface TranslationsSearchCriteria {
    checkIn: string;
    checkOut: string;
    roomText: string;
    roomsText: string;
    nightText: string;
    nightsText: string;
    fullDayNames: string;
    shortDayNames: string;
    fullMonthNames: string;
    dateFormat: string;
    bookTwoMins: string;
}

export interface SellOutPrediction {
    sellOutWithin: string;
    anHour: string;
    xHours: string;
    xDays: string;
}

export interface SimilarPropertiesSoldout {
    similarPropertySoldoutTitle: string;
    similarPropertySoldoutDescription: string;
    similarPropertySellingOutFast: string;
    similarPropertySellingOutFastDescriptionSingular: string;
    similarPropertySellingOutFastDescriptionPlural: string;
}

export interface SoldOut {
    headline: string;
    similarProperties: string;
    orCondition: string;
    searchSameDates: string;
    searchDifferentDates: string;
}

export interface StealTheDealBanner {
    agpText: string;
    nonAgpText: string;
    viewPropertyText: string;
}

export interface TranslationsStickyFooter {
    todayOnly: string;
    backToRoomResult: string;
    backToSearchResult: string;
    dontMissOutThisAmazingProperty: string;
    popularPropertyDontMissOut: string;
    soldOut: string;
    seeSimilarProperties: string;
    dismiss: string;
}

export interface SupplierBanner {
    wePartnerWith: string;
    bookBestDeal: string;
    bestPriceVerifiedWithOurPartners: string;
    bestPriceVerified: string;
    withOurPartners: string;
    verified: string;
    bestPrice: string;
}

export interface TranslationsTaxesAndSurcharges {
    includedInRoomPrice: string;
    excludedInRoomPrice: string;
    priceDoNotInclude: string;
    doNotInclude: string;
    priceInclude: string;
    include: string;
    excludedExtrabedInRoomPrice: string;
    includedExtrabedInRoomPrice: string;
}

export interface Urgency {
    riskFree: string;
    noCancellationFee: string;
    bookTwoMinutes: string;
    isPopularChoice: string;
    getAgodaCash: string;
}

export interface WelcomeUserInfo {
    currencyOnBack: boolean;
    currency: string;
    origin: string;
    stateCode: string;
    languageId: number;
    isInternational: boolean;
}

export interface Wysiwyp {
    isSingleRoom: boolean;
    page: string;
    currentPriceView: number;
    priceViewEnums: PriceViewEnums;
    applyGiftcard: {
        isApplyGiftcard: boolean;
    }
}

export interface PriceViewEnums {
    exclusive: number;
    inclusiveWithSurchargePerRoomPerNight: number;
    inclusiveWithSurchargePerBooking: number;
}
