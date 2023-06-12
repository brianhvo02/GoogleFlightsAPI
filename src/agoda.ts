import { AreaSearchResult } from './types/agoda/AreaSearch';
import LocationSearchResult from './types/agoda/LocationSearchResult';
import { PropertyDetailsSearchResult } from './types/agoda/PropertyDetailsSearch';
import { SecondaryData } from './types/agoda/SecondaryData';
import { checkDepArrDates } from './utils';

export const AgodaLocationSearch = async (searchText: string): Promise<LocationSearchResult> => {
	const body = new URLSearchParams({
		searchText,
		origin: 'US',
		pageTypeId: '103',
		// isHotelLandSearch: 'true',
	});
	
	return fetch(`https://www.agoda.com/api/cronos/search/GetUnifiedSuggestResult?${body.toString()}`).then(res => res.json());
}

export interface AgodaSearchParams {
	cityId: number;
	areaId: number;
	checkIn: string;
	checkOut: string;
	currency?: string;
	rooms: number;
	adults: number;
	children?: number;
}

export const AgodaSearch = async (params: AgodaSearchParams) => {
	const {
		cityId, areaId, 
		checkIn: localCheckInDate, 
		checkOut: localCheckoutDate,
		currency = 'USD',
		rooms,
		adults,
		children = 0
	} = params;
	
	const { currentDate, checkIn, checkOut } = checkDepArrDates(localCheckInDate, localCheckoutDate);

	const bookingDate = currentDate.toISOString();
	const checkInDate = checkIn.toISOString();
	const checkoutDate = checkOut.toISOString();

    const { data }: AreaSearchResult = await fetch('https://www.agoda.com/graphql/search', {
        method: 'POST',
        headers: {
            'ag-language-locale': 'en-us',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            operationName: 'areaSearch',
            variables: {
                AreaSearchRequest: {
                    cityId, areaId,
                    searchRequest: {
                        searchCriteria: {
                            isAllowBookOnRequest: true,
                            bookingDate,
                            itineraryCriteria: {
								checkInDate,
								// localCheckInDate,
								los: 2,
								rooms,
								adults,
								children,
								childAges: [],
							},
                            ratePlans: [],
                            isUserLoggedIn: false,
                            currency,
                            sorting: {
                                sortField: 'Ranking',
                                sortOrder: 'Desc',
                                sortParams: null
                            },
                        },
                        searchContext: {
                            memberId: 0,
                            locale: 'en-us',
                            cid: -1,
                            origin: 'US',
                            platform: 1,
                            pageTypeId: 103,
                            endpointSearchType: 'CitySearch'
                        },
                    }
                },
                ContentSummaryRequest: {
                    context: {
                        locale: 'en-us',
                        forceExperimentsByIdNew: [],
                    },
                    summary: {},
					rooms: {
						showRoomSize: true
					}
                },
                PricingSummaryRequest: {
                    cheapestOnly: false,
                    context: {
                        isAllowBookOnRequest: true,
                        abTests: [],
                        clientInfo: {
                            cid: -1,
                            languageId: 1,
                            languageUse: 1,
                            origin: 'US',
                            platform: 1,
                            searchId: '',
                            storefront: 3,
                            userId: ''
                        },
                        experiment: [],
                        sessionInfo: {
                            isLogin: false,
                            memberId: 0,
                            sessionId: 1
                        }
                    },
                    pricing: {
                        bookingDate,
                        checkIn: checkInDate,
                        checkout: checkoutDate,
                        localCheckInDate,
                        localCheckoutDate,
                        currency: 'USD',
                        details: {
                            cheapestPriceOnly: false,
                            itemBreakdown: true,
                            priceBreakdown: true
                        },
                        featureFlag: [],
                        features: {
                            crossOutRate: false,
                            isAPSPeek: false,
                            isAllOcc: false,
                            isApsEnabled: false,
                            isIncludeUsdAndLocalCurrency: false,
                            isRPM2Included: true,
                            newRateModel: false,
                            overrideOccupancy: false,
                            priusId: 0,
                            synchronous: false
                        },
                        filters: {
                            cheapestRoomFilters: [],
                            filterAPO: false,
                            ratePlans: [],
                            secretDealOnly: false,
                            suppliers: []
                        },
                        occupancy: {
                            adults: 2,
                            children: 0,
                            childAges: [],
                            rooms: 1
                        },
                        supplierPullMetadata: {
                            requiredPrecheckAccuracyLevel: 0
                        }
                    },
                    suggestedPrice: 'Exclusive'
                }
            },
            query: (
`query areaSearch(
	$AreaSearchRequest: AreaSearchRequest!
	$ContentSummaryRequest: ContentSummaryRequest!
	$PricingSummaryRequest: PricingRequestParameters
) {
	areaSearch(AreaSearchRequest: $AreaSearchRequest) {
		searchResult {
			sortMatrix {
				result {
					fieldId
					sorting {
						sortField
						sortOrder
						sortParams {
							id
						}
					}
					display {
						name
					}
					childMatrix {
						fieldId
						sorting {
							sortField
							sortOrder
							sortParams {
								id
							}
						}
						display {
							name
						}
						childMatrix {
							fieldId
							sorting {
								sortField
								sortOrder
								sortParams {
									id
								}
							}
							display {
								name
							}
						}
					}
				}
			}
			searchInfo {
				flexibleSearch {
					currentDate {
						checkIn
						price
					}
					alternativeDates {
						checkIn
						price
					}
				}
				hasSecretDeal
				isComplete
				totalFilteredHotels
				hasEscapesPackage
				searchStatus {
					searchCriteria {
						checkIn
					}
					searchStatus
				}
				objectInfo {
					objectName
					cityName
					cityEnglishName
					countryId
					countryEnglishName
					mapLatitude
					mapLongitude
					mapZoomLevel
					wlPreferredCityName
					wlPreferredCountryName
					cityId
					cityCenterPolygon {
						geoPoints {
							lon
							lat
						}
						touristAreaCenterPoint {
							lon
							lat
						}
					}
				}
			}
			urgencyDetail {
				urgencyScore
			}
			histogram {
				bins {
					numOfElements
					upperBound {
						perNightPerRoom
						perPax
					}
				}
			}
			nhaProbability
		}
		properties(
			ContentSummaryRequest: $ContentSummaryRequest
			PricingSummaryRequest: $PricingSummaryRequest
		) {
			propertyId
			sponsoredDetail {
				sponsoredType
				trackingData
				isShowSponsoredFlag
			}
			propertyResultType
			content {
				informationSummary {
					hotelCharacter {
						hotelTag {
							name
							symbol
						}
						hotelView {
							name
							symbol
						}
					}
					propertyLinks {
						propertyPage
					}
					atmospheres {
						id
						name
					}
					isSustainableTravel
					localeName
					defaultName
					displayName
					accommodationType
					awardYear
					hasHostExperience
					address {
						countryCode
						country {
							id
							name
						}
						city {
							id
							name
						}
						area {
							id
							name
						}
					}
					propertyType
					rating
					agodaGuaranteeProgram
					remarks {
						renovationInfo {
							renovationType
							year
						}
					}
					spokenLanguages {
						id
					}
					geoInfo {
						latitude
						longitude
					}
				}
				propertyEngagement {
					lastBooking
					peopleLooking
				}
				nonHotelAccommodation {
					masterRooms {
						noOfBathrooms
						noOfBedrooms
						noOfBeds
						roomSizeSqm
						highlightedFacilities
					}
					hostLevel {
						id
						name
					}
					supportedLongStay
				}
				facilities {
					id
				}
				images {
					hotelImages {
						id
						caption
						providerId
						urls {
							key
							value
						}
					}
				}
				reviews {
					contentReview {
						isDefault
						providerId
						demographics {
							groups {
								id
								grades {
									id
									score
								}
							}
						}
						summaries {
							recommendationScores {
								recommendationScore
							}
							snippets {
								countryId
								countryCode
								countryName
								date
								demographicId
								demographicName
								reviewer
								reviewRating
								snippet
							}
						}
						cumulative {
							reviewCount
							score
						}
					}
					cumulative {
						reviewCount
						score
					}
				}
				familyFeatures {
					hasChildrenFreePolicy
					isFamilyRoom
					hasMoreThanOneBedroom
					isInterConnectingRoom
					isInfantCottageAvailable
					hasKidsPool
					hasKidsClub
				}
				personalizedInformation {
					childrenFreePolicy {
						fromAge
						toAge
					}
				}
				localInformation {
					landmarks {
						transportation {
							landmarkName
							distanceInM
						}
						topLandmark {
							landmarkName
							distanceInM
						}
						beach {
							landmarkName
							distanceInM
						}
					}
					hasAirportTransfer
				}
				highlight {
					cityCenter {
						distanceFromCityCenter
					}
					favoriteFeatures {
						features {
							id
							title
							category
						}
					}
					hasNearbyPublicTransportation
				}
				rateCategories {
					escapeRateCategories {
						rateCategoryId
						localizedRateCategoryName
					}
				}
			}
			soldOut {
				soldOutPrice {
					averagePrice
				}
			}
			pricing {
				pulseCampaignMetadata {
					promotionTypeId
					webCampaignId
					campaignTypeId
					campaignBadgeText
					campaignBadgeDescText
					dealExpiryTime
					showPulseMerchandise
				}
				isAvailable
				isReady
				benefits
				cheapestRoomOffer {
					agodaCash {
						showBadge
						giftcardGuid
						dayToEarn
						earnId
						percentage
						expiryDay
					}
					cashback {
						cashbackGuid
						showPostCashbackPrice
						cashbackVersion
						percentage
						earnId
						dayToEarn
						expiryDay
						cashbackType
						appliedCampaignName
					}
				}
				isEasyCancel
				isInsiderDeal
				isMultiHotelEligible
				suggestPriceType {
					suggestPrice
				}
				roomBundle {
					bundleId
					bundleType
					saveAmount {
						perNight {
							...Fragdc09cbe0b5760dfhi772
						}
					}
				}
				pointmax {
					channelId
					point
				}
				priceChange {
					changePercentage
					searchDate
				}
				payment {
					cancellation {
						cancellationType
						freeCancellationDate
					}
					payLater {
						isEligible
					}
					payAtHotel {
						isEligible
					}
					noCreditCard {
						isEligible
					}
					taxReceipt {
						isEligible
					}
				}
				cheapestStayPackageRatePlans {
					stayPackageType
					ratePlanId
				}
				pricingMessages {
					location
					ids
				}
				suppliersSummaries {
					id
					supplierHotelId
				}
				supplierInfo {
					id
					name
					isAgodaBand
				}
				offers {
					roomOffers {
						room {
							extraPriceInfo {
								displayPriceWithSurchargesPRPN
								corDisplayPriceWithSurchargesPRPN
							}
							availableRooms
							isPromoEligible
							promotions {
								typeId
								promotionDiscount {
									value
								}
								isRatePlanAsPromotion
								cmsTypeId
								description
							}
							bookingDuration {
								unit
								value
							}
							supplierId
							corSummary {
								hasCor
								corType
								isOriginal
								hasOwnCOR
								isBlacklistedCor
							}
							localVoucher {
								currencyCode
								amount
							}
							pricing {
								currency
								price {
									perNight {
										exclusive {
											display
											cashbackPrice
											displayAfterCashback
											originalPrice
										}
										inclusive {
											display
											cashbackPrice
											displayAfterCashback
											originalPrice
										}
									}
									perBook {
										exclusive {
											display
											cashbackPrice
											displayAfterCashback
											rebatePrice
											originalPrice
											autoAppliedPromoDiscount
										}
										inclusive {
											display
											cashbackPrice
											displayAfterCashback
											rebatePrice
											originalPrice
											autoAppliedPromoDiscount
										}
									}
									perRoomPerNight {
										exclusive {
											display
											crossedOutPrice
											cashbackPrice
											displayAfterCashback
											rebatePrice
											pseudoCouponPrice
											originalPrice
										}
										inclusive {
											display
											crossedOutPrice
											cashbackPrice
											displayAfterCashback
											rebatePrice
											pseudoCouponPrice
											originalPrice
										}
									}
									totalDiscount
									priceAfterAppliedAgodaCash {
										perBook {
											...Frag7d8f125bi2hhec3e3372
										}
										perRoomPerNight {
											...Frag7d8f125bi2hhec3e3372
										}
									}
								}
								apsPeek {
									perRoomPerNight {
										...Fragdc09cbe0b5760dfhi772
									}
								}
								promotionPricePeek {
									display {
										perBook {
											...Fragdc09cbe0b5760dfhi772
										}
										perRoomPerNight {
											...Fragdc09cbe0b5760dfhi772
										}
										perNight {
											...Fragdc09cbe0b5760dfhi772
										}
									}
									discountType
									promotionCodeType
									promotionCode
									promoAppliedOnFinalPrice
									childPromotions {
										campaignId
									}
									campaignName
								}
								channelDiscountSummary {
									channelDiscountBreakdown {
										display
										discountPercent
										channelId
									}
								}
								promotionsCumulative {
									promotionCumulativeType
									amountPercentage
									minNightsStay
								}
							}
							uid
							payment {
								cancellation {
									cancellationType
								}
							}
							discount {
								deals
								channelDiscount
							}
							saveUpTo {
								perRoomPerNight
							}
							benefits {
								id
								targetType
							}
							channel {
								id
							}
							mseRoomSummaries {
								supplierId
								subSupplierId
								pricingSummaries {
									currency
									channelDiscountSummary {
										channelDiscountBreakdown {
											channelId
											discountPercent
											display
										}
									}
									price {
										perRoomPerNight {
											exclusive {
												display
											}
											inclusive {
												display
											}
										}
									}
								}
							}
							cashback {
								cashbackGuid
								showPostCashbackPrice
								cashbackVersion
								percentage
								earnId
								dayToEarn
								expiryDay
								cashbackType
								appliedCampaignName
							}
							agodaCash {
								showBadge
								giftcardGuid
								dayToEarn
								expiryDay
								percentage
							}
							corInfo {
								corBreakdown {
									taxExPN {
										...Frag113a4d8i6f141417ibf7
									}
									taxInPN {
										...Frag113a4d8i6f141417ibf7
									}
									taxExPRPN {
										...Frag113a4d8i6f141417ibf7
									}
									taxInPRPN {
										...Frag113a4d8i6f141417ibf7
									}
								}
								corInfo {
									corType
								}
							}
							loyaltyDisplay {
								items
							}
							capacity {
								extraBedsAvailable
							}
							pricingMessages {
								formatted {
									location
									texts {
										index
										text
									}
								}
							}
							campaign {
								selected {
									campaignId
									promotionId
									messages {
										campaignName
										title
										titleWithDiscount
										description
										linkOutText
										url
									}
								}
							}
							stayPackageType
						}
					}
				}
			}
			enrichment {
				topSellingPoint {
					tspType
					value
				}
				pricingBadges {
					badges
				}
				uniqueSellingPoint {
					rank
					segment
					uspType
					uspPropertyType
				}
				bookingHistory {
					bookingCount {
						count
						timeFrame
					}
				}
				showReviewSnippet
				isPopular
				roomInformation {
					cheapestRoomSizeSqm
					facilities {
						id
						propertyFacilityName
						symbol
					}
				}
			}
		}
		searchEnrichment {
			suppliersInformation {
				supplierId
				supplierName
				isAgodaBand
			}
			pageToken
		}
		aggregation {
			matrixGroupResults {
				matrixGroup
				matrixItemResults {
					id
					name
					count
					filterKey
					filterRequestType
					extraDataResults {
						text
						matrixExtraDataType
					}
				}
			}
		}
	}
}

fragment Frag7d8f125bi2hhec3e3372 on DisplayPrice {
	exclusive
	allInclusive
}

fragment Fragdc09cbe0b5760dfhi772 on DFDisplayPrice {
	exclusive
	allInclusive
}

fragment Frag113a4d8i6f141417ibf7 on DFCorBreakdownItem {
	price
	id
}`
            )
        })
    }).then(res => res.json());
    
    return data.areaSearch;
}

export const AgodaListing = async (propertyIds: number | number[]) => {
	if (!Array.isArray(propertyIds)) propertyIds = [ propertyIds ];
	const { data }: PropertyDetailsSearchResult = await fetch('https://www.agoda.com/graphql/search', {
        method: 'POST',
        headers: {
            'ag-language-locale': 'en-us',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            operationName: 'propertyDetailsSearch',
			variables: {
				PropertyDetailsRequest: {
					propertyIds
				},
				ContentInformationSummaryRequest: {},
				ContentHighlightsRequest: {},
				ContentLocalInformationRequest: {
					showWalkablePlaces: true,
					images: {
						imageSizes: [
							{
								key: "main",
								size: {
									width: 360,
									height: 270
								}
							}
						]
					}
				},
				ContentInformationRequest: {
					showDynamicShortDescription: true
				},
				ContentFeaturesRequest: {
					includeFacilityHighlights: true,
					occupancyRequest: {
						numberOfAdults: 2,
						numberOfChildren: 0,
						travelerType: 1,
						lengthOfStay: 2
					},
					images: {
						imageSizes: [
							{
								key: "original",
								size: {
									width: 360,
									height: 270
								}
							}
						]
					}
				}
			},
            query: (
`query propertyDetailsSearch($PropertyDetailsRequest: PropertyDetailsRequest!, $ContentInformationSummaryRequest: ContentInformationSummaryRequest, $ContentHighlightsRequest: ContentHighlightsRequest, $ContentLocalInformationRequest: ContentLocalInformationRequest, $ContentInformationRequest: ContentInformationRequest, $ContentFeaturesRequest: ContentFeaturesRequest) {
    propertyDetailsSearch(PropertyDetailsRequest: $PropertyDetailsRequest) {
        propertyDetails {
            propertyId
            propertyMetaInfo {
                propertyMetaRanking {
                    numberOfProperty
                    metrics {
                        metricName
                        rank
                        absoluteValue
                    }
                }
            }
            contentDetail {
                propertyId
                contentSummary(ContentInformationSummaryRequest: $ContentInformationSummaryRequest) {
                    propertyId
                    displayName
                    defaultName
                    localeName
                    accommodation {
                        accommodationType
                        accommodationName
                    }
                    propertyType
                    address {
                        address1
                        address2
                        countryCode
                        area {
                            id
                            name
                        }
                        city {
                            id
                            name
                        }
                        country {
                            id
                            name
                        }
                        postalCode
                        stateInfo {
                            id
							name
                        }
                    }
                    awardsAndAccolades {
                        goldCircleAward {
                            year
                        }
                        advanceGuaranteeProgram {
                            logo
                            description
                        }
                    }
                    remarks {
                        renovationInfo {
                            year
                            renovationType
                        }
                    }
                    hasHostExperience
                    geoInfo {
                        latitude
                        longitude
                    }
                    rating
                    asqType
                    asqInfos {
                        asqTypeId
                    }
                }
                contentEngagement {
                    peopleLooking
                    todayBooking
                }
                contentHighlights(ContentHighlightsRequest: $ContentHighlightsRequest) {
                    favoriteFeatures {
                        category
                        id
                        images {
                            id
                            urls {
                                key
                                value
                            }
                        }
                        name
                        symbol
                        tooltip
                    }
                    locationHighlightMessage {
                        title
                    }
                    locationHighlights {
                        distanceKm
                        highlightType
                        message
                    }
                    locations {
                        tooltip
                        symbol
                        name
                        images {
                            id
                            urls {
                                key
                                value
                            }
                        }
                    }
                    atfPropertyHighlights {
                        id
                        name
                        symbol
                        icon
                        category
                        images {
                            id
                            urls {
                                key
                                value
                            }
                        }
                        tooltip
                    }
                }
                contentLocalInformation(ContentLocalInformationRequest: $ContentLocalInformationRequest) {
                    walkablePlaces {
                        title
                        totalCount
                        description
                        walkableCategories {
                            categoryName
                            totalCount
                            topPlaces {
                                name
                                distanceInKm
                                images {
                                    urls {
                                        value
                                    }
                                }
                            }
                        }
                    }
                    nearbyProperties {
                        categoryName
                        categorySymbol
                        id
                        places {
                            abbr
                            distanceInKm
                            duration
                            durationIcon
                            geoInfo {
                                latitude
                                longitude
                                obfuscatedLat
                                obfuscatedLong
                            }
                            images {
                                urls {
                                    value
                                    key
                                }
                                id
                            }
                            landmarkId
                            name
                            typeId
                            typeName
                        }
                    }
                    cuisines {
                        id
                        images {
                            urls {
                                value
                                key
                            }
                            id
                        }
                        name
                        restaurants {
                            cuisinesOffered
                            distance
                            id
                            name
                        }
                    }
                    locationSubscore {
                        airportScore
                        poiScore
                        transportationScore
                    }
                    nearbyPlaces {
                        abbr
                        distanceInKm
                        duration
                        durationIcon
                        geoInfo {
                            latitude
                            longitude
                            obfuscatedLat
                            obfuscatedLong
                        }
                        images {
                            urls {
                                value
                                key
                            }
                            id
                        }
                        landmarkId
                        name
                        typeId
                        typeName
                    }
                    nearbyShops {
                        abbr
                        distanceInKm
                        duration
                        durationIcon
                        geoInfo {
                            latitude
                            longitude
                            obfuscatedLat
                            obfuscatedLong
                        }
                        images {
                            urls {
                                value
                                key
                            }
                            id
                        }
                        landmarkId
                        name
                        typeId
                        typeName
                    }
                    popularLandmarkNumber
                    topPlaces {
                        abbr
                        distanceInKm
                        duration
                        durationIcon
                        geoInfo {
                            latitude
                            longitude
                            obfuscatedLat
                            obfuscatedLong
                        }
                        images {
                            urls {
                                value
                                key
                            }
                            id
                        }
                        landmarkId
                        name
                        typeId
                        typeName
                    }
                }
                contentInformation(ContentInformationRequest: $ContentInformationRequest) {
                    usefulInfoGroups {
                        id
                        usefulInfo {
                            id
                            description
                        }
                    }
                    certificate {
                        name
                        imageUrl
                        description
                    }
                    staffVaccinationInfo {
                        details
                        status
                    }
                    messaging {
                        responsiveRate
                    }
                    description {
                        short
                    }
                    notes {
                        criticalNotes
                    }
                    sustainabilityInfo {
                        isSustainableTravel
                        practiceCategories {
                            categoryId
                            categoryName
                            practices {
                                practiceId
                                practiceName
                            }
                        }
                    }
                }
                contentFeatures(ContentFeaturesRequest: $ContentFeaturesRequest) {
                    featureGroups {
                        features {
                            available
                            featureName
                            featureNameLocalizationList {
                                locale
                                value
                            }
                            id
                            order
                            symbol
                            images {
                                id
                                urls {
                                    key
                                    value
                                }
                                groupId
                                groupEntityId
                                typeId
                                uploadedDate
                                providerId
                                caption
                                highResolutionSizes
                            }
                        }
                        id
                        name
                        order
                        symbol
                    }
                    hotelFacilities {
                        id
                        name
                    }
                    summary {
                        chineseFriendly
                        staycationFacilityIds {
                            activities
                            drinkingAndDining
                            sportAndEntertainment
                            wellness
                        }
                        hygienePlusFacilities {
                            healthAndMedical
                            safetyFeature
                            preventiveEquipment
                        }
                    }
                    facilityHighlights {
                        facilityId
                        facilityName
                        images {
                            id
                            urls {
                                key
                                value
                            }
                            groupId
                            groupEntityId
                            typeId
                            uploadedDate
                            providerId
                            caption
                            highResolutionSizes
                        }
                    }
                }
                hostProfile {
                    displayName
                    picture
                    averageReviewScore
                    totalReviews
                    hostLevel
                    responseRate
                    responseTimeSeconds
                    properties {
                        id
                        bookings
                        reviewAvg
                        reviewCount
                    }
                }
            }
        }
    }
}`
            )
        })
    }).then(res => res.json());

	return data.propertyDetailsSearch.propertyDetails;
}

export const AgodaListingSecondary = async (propertyId: number): Promise<SecondaryData> => {
	const query = new URLSearchParams({
		finalPriceView: '1',
		adults: '2',
		children: '0',
		rooms: '1',
		checkIn: '2023-07-12',
		hotel_id: propertyId.toString(),
		priceView: '2',
		pagetypeid: '7',
		los: '2'
	});

	return fetch(`https://www.agoda.com/api/cronos/property/BelowFoldParams/GetSecondaryData?${query.toString()}`).then(res => res.json());
}