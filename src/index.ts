import GoogleFlightsAPI from "./GoogleFlightsAPI";
import { SeatClass, Stops } from "./types/GoogleFlightsAPI";

(async () => {
    const [ locationDep ] = await GoogleFlightsAPI.locationSearch('San Francisco');
    const [ locationArr ] = await GoogleFlightsAPI.locationSearch('honolulu');

    const params = {
        originIdentifier: locationDep.identifier,
        outboundDate: '2023-08-21',
        // destinationIdentifier: locationArr.identifier,
        returnDate: '2023-08-25',
        seatClass: SeatClass.ECONOMY,
        roundtrip: true,
        passengers: {
            adults: 1,
            // adults: 2,
            // children: 1
        },
        // times: {
        //     departure: [0, 5],
        //     arrival: [0, 6]
        // }
        // returning: {
            // date: '2023-08-25',
            // times: {
            //     departure: [0, 7],
            //     arrival: [0, 8]
            // }
        // },
        stops: Stops.NONSTOP,
        // duration: 360,
        // roundtrip: true,
        // maxPrice: 100,
        // alliances: [
        //     AirlineAlliance.STAR_ALLIANCE,
        //     AirlineAlliance.SKYTEAM
        // ]
    }
    
    console.log(`Looking for somewhere to go from ${params.outboundDate} to ${params.returnDate}`);
    const api = new GoogleFlightsAPI(params);
    const [discoverResult] = await api.explore();
    console.log(`Discovered ${discoverResult.city} for $${discoverResult.flight.price}`);
    api.editConfig({
        destinationIdentifier: discoverResult.identifier
    });
    const [originResult] = await api.search();
    console.log(`Found ${originResult.airlines[0]} flight from ${originResult.departure.airport.code} to ${originResult.arrival.airport.code}`);
    const [destinationResult] = await api.search(originResult.legs[0]);
    console.log(`Found ${destinationResult.airlines[0]} flight from ${destinationResult.departure.airport.code} to ${destinationResult.arrival.airport.code}`);
    const [bookingInfo] = await api.book([originResult, destinationResult]);
    const bookingLink = await GoogleFlightsAPI.getBookingLink(bookingInfo);
    console.log(bookingLink);

    // console.log(`Grabbing flights from ${params.outboundDate} to ${params.returnDate}`);
    // const api = new GoogleFlightsAPI({
    //     ...params,
    //     destinationIdentifier: locationArr.identifier,
    //     roundtrip: false
    // });
    // const [result] = await api.search();
    // console.log(`Found ${result.airlines[0]} flight from ${result.departure.airport.code} to ${result.arrival.airport.code} for $${result.price}`);
    // const [bookingInfo] = await api.book([result]);
    // const bookingLink = await GoogleFlightsAPI.getBookingLink(bookingInfo);
    // console.log(bookingLink);
})();