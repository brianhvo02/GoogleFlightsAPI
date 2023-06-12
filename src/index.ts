import AgodaSearch, { AgodaLocationSearch } from "./agoda";
import MomondoSearch, { airportSearch } from "./momondo";

(async () => {
    // const airports = await airportSearch('sfo');
    // console.log(airports);

    // const list = await MomondoSearch({
    //     depCode: 'SJC', 
    //     arrCode: 'IAH', 
    //     depDate: '2023-07-13',
    //     arrDate: '2023-07-16'
    // });
    // if (!list) return;
    // const results = Object.values(list);
    // const result = results[0];
    // console.log(result);
    
    // const { ViewModelList } = await AgodaLocationSearch('waikiki');
    // const viewModel = ViewModelList[1];
    // const { ObjectId, CityId } = viewModel;

    // const data = await AgodaSearch({
    //     cityId: CityId, 
    //     areaId: ObjectId, 
    //     checkIn: '2023-07-12', 
    //     checkOut: '2023-07-14',
    //     rooms: 1,
    //     adults: 2
    // });
    
    // data.properties.forEach(property => {
    //     console.log(property.content.informationSummary.displayName, property.pricing.offers[0].roomOffers[0].room.pricing[0].price.perNight.inclusive.display)
    // });
})();