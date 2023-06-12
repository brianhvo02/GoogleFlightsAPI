export interface AreaSearchResult {
    data: {
        areaSearch: AreaSearch;
    }
}

export default interface AreaSearch {
    searchResult: SearchResult;
    properties: Property[];
    searchEnrichment: SearchEnrichment;
    aggregation: Aggregation;
}

interface SearchResult {
    sortMatrix: {
        result: SortMatrix[];
    }
    searchInfo: {
        flexibleSearch: unknown;
        hasSecretDeal: boolean;
        isComplete: boolean;
        totalFilteredHotels: number;
        hasEscapesPackage: boolean;
        searchStatus: {
            searchCriteria: {
                checkIn: string;
            }
            searchStatus: 'Normal';
        }
        objectInfo: {
            objectName: string;
            cityName: string;
            cityEnglishName: string;
            countryId: number;
            countryEnglishName: string;
            mapLatitude: number;
            mapLongitude: number;
            mapZoomLevel: number;
            wlPreferredCityName: string | unknown;
            wlPreferredCountryName: string | unknown;
            cityId: number;
            cityCenterPolygon: CityCenterPolygon;
        }
    }
    urgencyDetail: unknown;
    histogram: {
        bins: unknown;
    }
    nhaProbability: string;
}

interface SortMatrix {
    fieldId: string;
    sorting: {
        sortField: string;
        sortOrder: string;
        sortParams: unknown;
    }
    display: {
        name: string;
    }
    childMatrix: SortMatrix[];
}

interface CityCenterPolygon {
    geopoints: {
        lon: number;
        lat: number;
    }[];
    touristAreaCenterPoint: unknown;
}

interface Property {
    propertyId: number;
    sponsoredDetail: {
        sponsoredType: string;
        trackingData: unknown;
        isShowSponsoredFlag: boolean;
    }
    propertyResultType: string;
    content: {
        informationSummary: {
            hotelCharacter: unknown;
            propertyLinks: {
                propertyPage: string;
            }
            atmospheres: unknown[];
            isSustainableTravel: boolean;
            localeName: string;
            defaultName: string;
            displayName: string;
            accommodationType: number;
            awardYear: unknown;
            hasHostExperience: boolean;
            address: {
                countryCode: string;
                country: {
                    id: number;
                    name: string;
                }
                city: {
                    id: 10921;
                    name: string;
                }
                area: {
                    id: 23971;
                    name: string;
                }
            }
            propertyType: string;
            rating: number;
            agodaGuaranteeProgram: boolean;
            remarks: unknown;
            spokenLanguages: { id: number }[];
            geoInfo: {
                latitude: number;
                longitude: number;
            }
        }
        propertyEngagement: unknown;
        nonHotelAccommodation: unknown;
        facilities: unknown[];
        images: unknown;
        reviews: unknown;
        familyFeatures: {
            hasChildrenFreePolicy: boolean;
            isFamilyRoom: boolean;
            hasMoreThanOneBedroom: boolean;
            isInterConnectingRoom: boolean;
            isInfantCottageAvailable: boolean;
            hasKidsPool: boolean;
            hasKidsClub: boolean
        }
        personalizedInformation: unknown;
        localInformation: unknown;
        highlight: unknown;
        rateCategories: unknown;
    }
    soldOut: unknown;
    pricing: {
        pulseCampaignMetadata: unknown;
        isAvailable: boolean;
        isReady: boolean;
        benefits: number[];
        cheapestRoomOffer: {
            agodaCash: {
                showBadge: boolean;
                giftcardGuid: string;
                dayToEarn: number;
                earnId: number;
                percentage: unknown;
                expiryDay: number;
            }
            cashback: unknown;
        }
        isEasyCancel: boolean;
        isInsiderDeal: boolean;
        isMultiHotelEligible: boolean;
        suggestPriceType: {
            suggestPrice: string;
        }
        roomBundle: unknown;
        pointmax: unknown;
        priceChange: unknown;
        payment: {
            cancellation: {
                cancellationType: string;
                freeCancellationDate: string;
            }
            payLater: {
                isEligible: boolean;
            }
            payAtHotel: {
                isEligible: boolean;
            }
            noCreditCard: {
                isEligible: boolean;
            }
            taxReceipt: {
                isEligible: boolean;
            }
        }
        cheapestStayPackageRatePlans: {
            stayPackageType: number;
            ratePlanId: number;
        }[];
        pricingMessages: [];
        suppliersSummaries: {
            id: number;
            supplierHotelId: string | null;
        }[];
        supplierInfo: unknown;
        offers: {
            roomOffers: {
                room: RoomOffer
            }[];
        }[];
    }
    metaLab: unknown;
    enrichment: {
        topSellingPoint:{
            tspType: string;
            value: unknown
        }[];
        pricingBadges: {
            badges: unknown[];
        }
        uniqueSellingPoint: unknown[];
        bookingHistory: unknown;
        showReviewSnippet: boolean;
        isPopular: boolean;
        roomInformation: {
            cheapestRoomSizeSqm: unknown;
            facilities: unknown[];
        }
    }
}

interface RoomOffer {
    extraPriceInfo: {
        displayPriceWithSurchargesPRPN: unknown;
        corDisplayPriceWithSurchargesPRPN: unknown;
    }
    availableRooms: number;
    isPromoEligible: boolean;
    promotions: {
        typeId: number;
        promotionDiscount: {
            value: number;
        }
        isRatePlanAsPromotion: boolean;
        cmsTypeId: number;
        description: string;
    }
    bookingDuration: unknown;
    supplierId: number;
    corSummary: {
        hasCor: boolean;
        corType: string;
        isOriginal: boolean;
        hasOwnCOR: boolean;
        isBlacklistedCor: boolean;
    }
    localVoucher: unknown;
    pricing: Pricing[];
    uid: string;
    payment: {
        cancellation: {
            cancellationType: string;
        }
    }
    discount: {
        deals: unknown[];
        channelDiscount: string;
    }
    saveUpTo: {
        perRoomPerNight: number;
    }
    benefits: [
        {
            id: number;
            targetType: number;
        }
    ];
    channel: {
        id: number;
    }
    mseRoomSummaries: unknown[];
    cashback: unknown;
    agodaCash: {
        showBadge: boolean;
        giftcardGuid: string;
        dayToEarn: number;
        expiryDay: number;
        percentage: unknown;
    }
    corInfo: {
        corBreakdown: {
            taxExPN: Tax[];
            taxInPN: Tax[];
            taxExPRPN: Tax[];
            taxInPRPN: Tax[];
        }
        corInfo: {
            corType: string;
        }
    }
    loyaltyDisplay: unknown;
    capacity: {
        extraBedsAvailable: boolean;
    }
    pricingMessages: unknown;
    campaign: unknown;
    stayPackageType: 0;
}

interface Pricing {
    currency: string;
    price: {
        perNight: PricePair;
        perBook: PricePair;
        perRoomPerNight: PricePair;
        totalDiscount: 56;
        priceAfterAppliedAgodaCash: unknown;
    }
    apsPeek: unknown;
    promotionPricePeek: unknown;
    channelDiscountSummary: {
        channelDiscountBreakdown: unknown[];
    }
    promotionsCumulative: unknown[];
}

interface PricePair {
    exclusive: Price;
    inclusive: Price;
}

interface Price {
    display: number;
    cashbackPrice: unknown;
    displayAfterCashback: unknown;
    rebatePrice?: number;
    originalPrice: number;
    autoAppliedPromoDiscount?: unknown;
    crossedOutPrice?: number;
    pseudoCouponPrice?: number;
}

interface Tax {
    price: number;
    id: number;
}

interface SearchEnrichment {
    suppliersInformation: SupplierInfo[];
    pageToken: unknown;
}

interface SupplierInfo {
    supplierId: number;
    supplierName: string;
    isAgodaBand: boolean;
}

interface Aggregation {
    matrixGroupResults: MatrixGroupResult[];
}

interface MatrixGroupResult {
    matrixGroup: string;
    matrixItemResults: unknown[];
}