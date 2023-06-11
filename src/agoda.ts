const AgodaSearch = async () => {
    const { data } = await fetch('https://www.agoda.com/graphql/search', {
        method: 'POST',
        headers: {
            'ag-language-locale': 'en-us',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "operationName": "areaSearch",
            "variables": {
                "AreaSearchRequest": {
                    "cityId": 10921,
                    "areaId": 23971,
                    "searchRequest": {
                        "searchCriteria": {
                            "isAllowBookOnRequest": true,
                            "bookingDate": "2023-06-11T10:47:40.635Z",
                            "checkInDate": "2023-07-12T07:00:00.000Z",
                            "localCheckInDate": "2023-07-12",
                            "los": 2,
                            "rooms": 1,
                            "adults": 2,
                            "children": 0,
                            "childAges": [],
                            "ratePlans": [],
                            "featureFlagRequest": {
                                "fetchNamesForTealium": true,
                                "fiveStarDealOfTheDay": true,
                                "isAllowBookOnRequest": false,
                                "showUnAvailable": true,
                                "showRemainingProperties": true,
                                "isMultiHotelSearch": false,
                                "enableAgencySupplyForPackages": true,
                                "flags": [
                                    {
                                        "feature": "FamilyChildFriendlyPopularFilter",
                                        "enable": true
                                    },
                                    {
                                        "feature": "FamilyChildFriendlyPropertyTypeFilter",
                                        "enable": true
                                    },
                                    {
                                        "feature": "FamilyMode",
                                        "enable": false
                                    }
                                ],
                                "enablePageToken": true,
                                "enableDealsOfTheDayFilter": false,
                                "isEnableSupplierFinancialInfo": false,
                                "ignoreRequestedNumberOfRoomsForNha": false
                            },
                            "isUserLoggedIn": false,
                            "currency": "USD",
                            "travellerType": "Couple",
                            "isAPSPeek": false,
                            "enableOpaqueChannel": false,
                            "isEnabledPartnerChannelSelection": null,
                            "sorting": {
                                "sortField": "Ranking",
                                "sortOrder": "Desc",
                                "sortParams": null
                            },
                            "requiredBasis": "PRPN",
                            "requiredPrice": "Exclusive",
                            "suggestionLimit": 0,
                            "synchronous": false,
                            "supplierPullMetadataRequest": null,
                            "isRoomSuggestionRequested": false,
                            "isAPORequest": false,
                            "hasAPOFilter": false
                        },
                        "searchContext": {
                            "userId": "3e54bef6-8841-4105-b685-e18f9edebd71",
                            "memberId": 0,
                            "locale": "en-us",
                            "cid": -1,
                            "origin": "US",
                            "platform": 1,
                            "deviceTypeId": 1,
                            "experiments": {
                                "forceByVariant": null,
                                "forceByExperiment": [
                                    {
                                        "id": "UMRAH-B2B",
                                        "variant": "B"
                                    },
                                    {
                                        "id": "UMRAH-B2C-REGIONAL",
                                        "variant": "B"
                                    },
                                    {
                                        "id": "UMRAH-B2C",
                                        "variant": "Z"
                                    },
                                    {
                                        "id": "JGCW-204",
                                        "variant": "B"
                                    }
                                ]
                            },
                            "isRetry": false,
                            "showCMS": false,
                            "storeFrontId": 3,
                            "pageTypeId": 103,
                            "whiteLabelKey": null,
                            "ipAddress": "76.133.223.198",
                            "endpointSearchType": "CitySearch",
                            "trackSteps": null,
                            "searchId": "d782a613-0065-4eb1-bb08-d0d36efaadef"
                        },
                        "matrix": null,
                        "matrixGroup": [
                            {
                                "matrixGroup": "NumberOfBedrooms",
                                "size": 100
                            },
                            {
                                "matrixGroup": "GroupedBedTypes",
                                "size": 100
                            },
                            {
                                "matrixGroup": "RoomBenefits",
                                "size": 100
                            },
                            {
                                "matrixGroup": "PopularForFamily",
                                "size": 5
                            },
                            {
                                "matrixGroup": "RoomAmenities",
                                "size": 100
                            },
                            {
                                "matrixGroup": "AffordableCategory",
                                "size": 100
                            },
                            {
                                "matrixGroup": "HotelFacilities",
                                "size": 100
                            },
                            {
                                "matrixGroup": "BeachAccessTypeIds",
                                "size": 100
                            },
                            {
                                "matrixGroup": "StarRating",
                                "size": 20
                            },
                            {
                                "matrixGroup": "KidsStayForFree",
                                "size": 5
                            },
                            {
                                "matrixGroup": "AllGuestReviewBreakdown",
                                "size": 100
                            },
                            {
                                "matrixGroup": "FamilyFacilities",
                                "size": 5
                            },
                            {
                                "matrixGroup": "MetroSubwayStationLandmarkIds",
                                "size": 20
                            },
                            {
                                "matrixGroup": "CityCenterDistance",
                                "size": 100
                            },
                            {
                                "matrixGroup": "ProductType",
                                "size": 100
                            },
                            {
                                "matrixGroup": "Themes",
                                "size": 4
                            },
                            {
                                "matrixGroup": "BusStationLandmarkIds",
                                "size": 20
                            },
                            {
                                "matrixGroup": "IsSustainableTravel",
                                "size": 2
                            },
                            {
                                "matrixGroup": "ReviewLocationScore",
                                "size": 3
                            },
                            {
                                "matrixGroup": "LandmarkSubTypeCategoryIds",
                                "size": 20
                            },
                            {
                                "matrixGroup": "ReviewScore",
                                "size": 100
                            },
                            {
                                "matrixGroup": "AccommodationType",
                                "size": 100
                            },
                            {
                                "matrixGroup": "PaymentOptions",
                                "size": 100
                            },
                            {
                                "matrixGroup": "TrainStationLandmarkIds",
                                "size": 20
                            },
                            {
                                "matrixGroup": "HotelChainId",
                                "size": 10
                            },
                            {
                                "matrixGroup": "RecommendedByDestinationCity",
                                "size": 10
                            },
                            {
                                "matrixGroup": "Deals",
                                "size": 100
                            }
                        ],
                        "filterRequest": {
                            "idsFilters": [],
                            "rangeFilters": [],
                            "textFilters": []
                        },
                        "page": {
                            "pageSize": 45,
                            "pageNumber": 1,
                            "pageToken": ""
                        },
                        "apoRequest": {
                            "apoPageSize": 10
                        },
                        "searchHistory": null,
                        "searchDetailRequest": {
                            "priceHistogramBins": 50
                        },
                        "isTrimmedResponseRequested": false,
                        "featuredAgodaHomesRequest": null,
                        "featuredLuxuryHotelsRequest": null,
                        "highlyRatedAgodaHomesRequest": {
                            "numberOfAgodaHomes": 30,
                            "minimumReviewScore": 7.5,
                            "minimumReviewCount": 3,
                            "accommodationTypes": [
                                28,
                                29,
                                30,
                                102,
                                103,
                                106,
                                107,
                                108,
                                109,
                                110,
                                114,
                                115,
                                120,
                                131
                            ],
                            "sortVersion": 0
                        },
                        "extraAgodaHomesRequest": null,
                        "extraHotels": {
                            "extraHotelIds": [],
                            "enableFiltersForExtraHotels": false
                        },
                        "packaging": null,
                        "flexibleSearchRequest": {
                            "fromDate": "2023-06-11",
                            "toDate": "2023-08-11",
                            "alternativeDateSize": 4,
                            "isFullFlexibleDateSearch": false
                        },
                        "rankingRequest": {
                            "isNhaKeywordSearch": false,
                            "isPulseRankingBoost": false
                        },
                        "rocketmilesRequestV2": null,
                        "featuredPulsePropertiesRequest": null
                    }
                },
                "ContentSummaryRequest": {
                    "context": {
                        "rawUserId": "3e54bef6-8841-4105-b685-e18f9edebd71",
                        "memberId": 0,
                        "userOrigin": "US",
                        "locale": "en-us",
                        "forceExperimentsByIdNew": [
                            {
                                "key": "UMRAH-B2B",
                                "value": "B"
                            },
                            {
                                "key": "UMRAH-B2C-REGIONAL",
                                "value": "B"
                            },
                            {
                                "key": "UMRAH-B2C",
                                "value": "Z"
                            },
                            {
                                "key": "JGCW-204",
                                "value": "B"
                            }
                        ],
                        "apo": false,
                        "searchCriteria": {
                            "cityId": 10921
                        },
                        "platform": {
                            "id": 1
                        },
                        "storeFrontId": 3,
                        "cid": "-1",
                        "occupancy": {
                            "numberOfAdults": 2,
                            "numberOfChildren": 0,
                            "travelerType": 2,
                            "checkIn": "2023-07-12T07:00:00.000Z"
                        },
                        "deviceTypeId": 1,
                        "whiteLabelKey": "",
                        "correlationId": ""
                    },
                    "summary": {
                        "highlightedFeaturesOrderPriority": null,
                        "description": false,
                        "includeHotelCharacter": true
                    },
                    "reviews": {
                        "commentary": null,
                        "demographics": {
                            "providerIds": null,
                            "filter": {
                                "defaultProviderOnly": true
                            }
                        },
                        "summaries": {
                            "providerIds": null,
                            "apo": true,
                            "limit": 1,
                            "travellerType": 2
                        },
                        "cumulative": {
                            "providerIds": null
                        },
                        "filters": null
                    },
                    "images": {
                        "page": null,
                        "maxWidth": 0,
                        "maxHeight": 0,
                        "imageSizes": null,
                        "indexOffset": null
                    },
                    "rooms": {
                        "images": null,
                        "featureLimit": 0,
                        "filterCriteria": null,
                        "includeMissing": false,
                        "includeSoldOut": false,
                        "includeDmcRoomId": false,
                        "soldOutRoomCriteria": null,
                        "showRoomSize": true,
                        "showRoomFacilities": true,
                        "showRoomName": false
                    },
                    "nonHotelAccommodation": true,
                    "engagement": true,
                    "highlights": {
                        "maxNumberOfItems": 0,
                        "images": {
                            "imageSizes": [
                                {
                                    "key": "full",
                                    "size": {
                                        "width": 0,
                                        "height": 0
                                    }
                                }
                            ]
                        }
                    },
                    "personalizedInformation": false,
                    "localInformation": {
                        "images": null
                    },
                    "features": null,
                    "rateCategories": true,
                    "contentRateCategories": {
                        "escapeRateCategories": {}
                    },
                    "synopsis": true
                },
                "PricingSummaryRequest": {
                    "cheapestOnly": true,
                    "context": {
                        "isAllowBookOnRequest": true,
                        "abTests": [
                            {
                                "testId": 9021,
                                "abUser": "B"
                            },
                            {
                                "testId": 9023,
                                "abUser": "B"
                            },
                            {
                                "testId": 9024,
                                "abUser": "B"
                            },
                            {
                                "testId": 9025,
                                "abUser": "B"
                            },
                            {
                                "testId": 9027,
                                "abUser": "B"
                            },
                            {
                                "testId": 9029,
                                "abUser": "B"
                            }
                        ],
                        "clientInfo": {
                            "cid": -1,
                            "languageId": 1,
                            "languageUse": 1,
                            "origin": "US",
                            "platform": 1,
                            "searchId": "d782a613-0065-4eb1-bb08-d0d36efaadef",
                            "storefront": 3,
                            "userId": "3e54bef6-8841-4105-b685-e18f9edebd71",
                            "ipAddress": "76.133.223.198"
                        },
                        "experiment": [
                            {
                                "name": "UMRAH-B2B",
                                "variant": "B"
                            },
                            {
                                "name": "UMRAH-B2C-REGIONAL",
                                "variant": "B"
                            },
                            {
                                "name": "UMRAH-B2C",
                                "variant": "Z"
                            },
                            {
                                "name": "JGCW-204",
                                "variant": "B"
                            }
                        ],
                        "isDebug": false,
                        "sessionInfo": {
                            "isLogin": false,
                            "memberId": 0,
                            "sessionId": 1
                        },
                        "packaging": null
                    },
                    "isSSR": true,
                    "roomSortingStrategy": null,
                    "pricing": {
                        "bookingDate": "2023-06-11T10:47:40.622Z",
                        "checkIn": "2023-07-12T07:00:00.000Z",
                        "checkout": "2023-07-14T07:00:00.000Z",
                        "localCheckInDate": "2023-07-12",
                        "localCheckoutDate": "2023-07-14",
                        "currency": "USD",
                        "details": {
                            "cheapestPriceOnly": false,
                            "itemBreakdown": false,
                            "priceBreakdown": false
                        },
                        "featureFlag": [
                            "ClientDiscount",
                            "PriceHistory",
                            "VipPlatinum",
                            "RatePlanPromosCumulative",
                            "PromosCumulative",
                            "CouponSellEx",
                            "MixAndSave",
                            "APSPeek",
                            "StackChannelDiscount",
                            "AutoApplyPromos",
                            "EnableAgencySupplyForPackages",
                            "EnableCashback",
                            "CreditCardPromotionPeek",
                            "EnableCofundedCashback",
                            "DispatchGoLocalForInternational",
                            "EnableGoToTravelCampaign"
                        ],
                        "features": {
                            "crossOutRate": false,
                            "isAPSPeek": false,
                            "isAllOcc": false,
                            "isApsEnabled": false,
                            "isIncludeUsdAndLocalCurrency": false,
                            "isMSE": true,
                            "isRPM2Included": true,
                            "maxSuggestions": 0,
                            "isEnableSupplierFinancialInfo": false,
                            "isLoggingAuctionData": false,
                            "newRateModel": false,
                            "overrideOccupancy": false,
                            "filterCheapestRoomEscapesPackage": false,
                            "priusId": 0,
                            "synchronous": false,
                            "enableRichContentOffer": true,
                            "showCouponAmountInUserCurrency": false,
                            "disableEscapesPackage": false,
                            "enablePushDayUseRates": false,
                            "enableDayUseCor": false
                        },
                        "filters": {
                            "cheapestRoomFilters": [],
                            "filterAPO": false,
                            "ratePlans": [
                                1
                            ],
                            "secretDealOnly": false,
                            "suppliers": [],
                            "nosOfBedrooms": []
                        },
                        "includedPriceInfo": false,
                        "occupancy": {
                            "adults": 2,
                            "children": 0,
                            "childAges": [],
                            "rooms": 1,
                            "childrenTypes": []
                        },
                        "supplierPullMetadata": {
                            "requiredPrecheckAccuracyLevel": 0
                        },
                        "mseHotelIds": [],
                        "ppLandingHotelIds": [],
                        "searchedHotelIds": [],
                        "paymentId": -1,
                        "externalLoyaltyRequest": null
                    },
                    "suggestedPrice": "Exclusive"
                },
                "PriceStreamMetaLabRequest": {
                    "attributesId": [
                        8,
                        1,
                        18,
                        7,
                        11,
                        2,
                        3
                    ]
                }
            },
            "query": (
`query areaSearch(
	$AreaSearchRequest: AreaSearchRequest!
	$ContentSummaryRequest: ContentSummaryRequest!
	$PricingSummaryRequest: PricingRequestParameters
	$PriceStreamMetaLabRequest: PriceStreamMetaLabRequest
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
			PriceStreamMetaLabRequest: $PriceStreamMetaLabRequest
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
			metaLab {
				attributes {
					attributeId
					dataType
					value
					version
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
    
    return data;
}

export default AgodaSearch;