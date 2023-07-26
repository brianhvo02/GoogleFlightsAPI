import GoogleFlightsAPI from "./GoogleFlightsAPI";
import { SeatClass, Stops } from "./types";

(async () => {
    const [ locationDep ] = await GoogleFlightsAPI.locationSearch('San Francisco');
    const [ locationArr ] = await GoogleFlightsAPI.locationSearch('honolulu');

    const params = {
        originIdentifier: locationDep.identifier,
        outboundDate: '2023-08-21',
        returnDate: '2023-08-25',
        seatClass: SeatClass.ECONOMY,
        roundtrip: true,
        passengers: {
            adults: 1
        },
        stops: Stops.NONSTOP,
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

    console.log(`New search! Going to Honolulu`);
    api.editConfig({
        destinationIdentifier: locationArr.identifier,
        roundtrip: false
    });

    const [result] = await api.search();
    console.log(`Found ${result.airlines[0]} flight from ${result.departure.airport.code} to ${result.arrival.airport.code} for $${result.price}`);
    
    const test = await api.book([result]);
    console.log(test)
    const [paradiseBookingInfo] = test;
    const paradiseBookingLink = await GoogleFlightsAPI.getBookingLink(paradiseBookingInfo);
    console.log(paradiseBookingLink);
})();