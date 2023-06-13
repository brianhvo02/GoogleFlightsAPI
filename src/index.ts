import { AgodaSearch, AgodaLocationSearch, AgodaListing, AgodaListingSecondary } from "./agoda";
import { MomondoSearch, AirportSearch } from "./momondo";
import _ from 'lodash';

(async () => {
    const { ViewModelList } = await AgodaLocationSearch('waikiki');
    const viewModel = ViewModelList[1];
    const { ObjectId, CityId } = viewModel;

    const search = await AgodaSearch({
        cityId: CityId, 
        areaId: ObjectId, 
        checkIn: '2023-07-12', 
        checkOut: '2023-07-14',
        rooms: 1,
        adults: 2
    });

    console.log(search.properties[0])
    
    // const properties = search.properties.map(({ propertyId, content, pricing }) => ({
    //     propertyId, 
    //     name: content.informationSummary.displayName,
    //     price: pricing.offers[0].roomOffers[0].room.pricing[0].price.perBook.exclusive.display,
    //     priceWithFees: pricing.offers[0].roomOffers[0].room.pricing[0].price.perBook.inclusive.display
    // }));
    // console.table(properties);

    // const listing = await AgodaListing(292749);
    // const { hotelInfo, roomGridData } = listing;
    // console.log(listing)

    // const { name, engagement, starRating, address } = hotelInfo;
    // console.log(name, engagement.todayBooking && `(${engagement.todayBooking})`);
    // console.log('%i stars', starRating.value);
    // console.log(address.full);
    
    // roomGridData.masterRooms.forEach(({ name, lastBooked, rooms }) => {
    //     console.log(name, lastBooked && `(${lastBooked})`);

    //     const formattedRooms = rooms.map(room => ({
    //         occupancy: room.occupancy,
    //         availability: room.availability,
    //         currentPrice: room.totalPrice.display,
    //         highestHistoryPrice: room.totalPrice.crossedOut,
    //         cancellation: room.cancellation.title
    //     }));

    //     console.table(formattedRooms);
    // });

    // const airports = await AirportSearch('sunnyvale')
    //     .then(results =>
    //         results.map(result => 
    //             ({
    //                 iataCode: result.ap, 
    //                 location: result.locationname,
    //                 latitude: result.lat,
    //                 longitude: result.lng
    //             })
    //         )
    //     );
    // console.table(airports);

    // const list = await MomondoSearch({
    //     depCode: 'SJC', 
    //     arrCode: 'IAH', 
    //     depDate: '2023-07-13',
    //     arrDate: '2023-07-16'
    // });
    // if (!list || _.isEmpty(list)) return;
    // const results = Object.values(list);

    // results.forEach(({ legs, optionsByFare }) => {
    //     if (!legs || !optionsByFare) return;

    //     legs.forEach(({ legIndex, legDurationDisplay, segments }) => {
    //         console.log(`Segment ${legIndex + 1}`, legDurationDisplay);
    //         const formatedSegments = segments.map(segment => ({
    //             airline: segment.airline.name, 
    //             flightNumber: segment.flightNumber, 
    //             duration: segment.duration, 
    //             departureAirport: `${segment.departure.airport.fullDisplayName} ${segment.departure.airport.code}`, 
    //             departureTime: segment.departure.isoDateTimeLocal, 
    //             arrivalAirport: `${segment.arrival.airport.fullDisplayName} ${segment.arrival.airport.code}`, 
    //             arrivalTime: segment.arrival.isoDateTimeLocal
    //         }));
    //         console.table(formatedSegments);
    //     });

    //     optionsByFare.forEach(({ fareName, options }) => {
    //         console.log(fareName.displayName);

    //         const formatedOptions = options.map(option => ({
    //             provider: option.providerInfo.displayName,
    //             price: option.fees.totalPrice,
    //             amenities: option.fareAmenities?.map(amenity => amenity.message).join(', ')
    //         }));

    //         console.table(formatedOptions);
    //     });

    //     console.log('\n');
    // });
        
    // const listing = await AgodaListingSecondary([75825, 292749]);
    // listing.forEach(property => {
    //     const content = property.contentDetail.contentSummary;
    //     const { displayName, address } = content;
    //     const { address1, address2, area, city, country, stateInfo, postalCode } = address;
    //     console.log(displayName);
    //     console.log(address1);
    //     if (address2) console.log(address2);
    //     console.log(`${area.name}, ${city.name}`);
    //     console.log(`${stateInfo.name} ${postalCode}`);
    //     console.log(country.name);
    //     console.log();
    // });
})();