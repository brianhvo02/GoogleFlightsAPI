import { GoogleFlightsAPI } from "./index.js";
import { AirlineAlliance, GoogleFlightsConfig, SeatClass, Stops, Month, TimeFrame } from "./types/flights.js";

(async () => {
    const [ locationDep ] = await GoogleFlightsAPI.locationSearch('San Jose');
    const [ locationArr ] = await GoogleFlightsAPI.locationSearch('Ho Chi Minh City');

    const params: GoogleFlightsConfig = {
        // bounds: [
        //     [ 35.77373969542965, 153.29958567499997 ],
        //     [ -16.351197671748228, 59.95974192499999 ]
        // ],
        originIdentifier: locationDep.identifier,
        // destinationIdentifier: locationArr.identifier,
        outboundDate: '2023-08-21',
        returnDate: '2023-08-25',
        // exploreTimeFrame: TimeFrame.ONE_WEEK,
        // exploreMonth: Month.ALL,
        seatClass: SeatClass.ECONOMY,
        roundtrip: true,
        passengers: {
            adults: 1
        },
        // stops: Stops.ONE_OR_FEWER,
        // alliances: ['STAR_ALLIANCE'],
        // airlines: ['AS'],
        // duration: 4 * 60,
        // maxPrice: 100,
        calendar: {
            outboundDateRange: ['2023-08-18', '2023-08-24'],
            returnDateRange: ['2023-08-22', '2023-08-28']
        },
    }

    console.log(`Looking for somewhere to go ${params.outboundDate ? `from ${params.outboundDate} to ${params.returnDate}`: ''}`);
    const api = new GoogleFlightsAPI(params);

    const [discoverResult] = await api.explore();
    console.log(`Discovered ${discoverResult.city}, where the cheapest flight is $${discoverResult.flight.price}`);

    api.editConfig({
        destinationIdentifier: discoverResult.identifier,
        outboundDate: discoverResult.outboundDate,
        returnDate: discoverResult.returnDate
    });

    const dates = await api.calendar();
    console.table(dates)

    const { flights: [originResult] } = await api.search();
    console.log(`Found ${originResult.airlines[0]} flight from ${originResult.departure.airport.code} to ${originResult.arrival.airport.code}`);

    const { flights: [destinationResult] } = await api.search(originResult);
    console.log(`Found ${destinationResult.airlines[0]} flight from ${destinationResult.departure.airport.code} to ${destinationResult.arrival.airport.code}`);

    const { bookings: [bookingInfo] } = await api.book([originResult, destinationResult]);
    if (bookingInfo.separateBookings) {
        for (const booking of bookingInfo.separateBookings) {
            if (!booking.link || !booking.linkData) continue;
            const bookingLink = await GoogleFlightsAPI.getBookingLink(booking.link, booking.linkData);
            console.log(bookingLink);
        }
    } else if (bookingInfo.link && bookingInfo.linkData) {
        const bookingLink = await GoogleFlightsAPI.getBookingLink(bookingInfo.link, bookingInfo.linkData);
        console.log(bookingLink);
    }

    console.log(`New search! Going to ${locationArr.type === 'city' ? locationArr.shortName : locationArr.city}.`);
    api.editConfig({
        destinationIdentifier: locationArr.identifier,
        roundtrip: false,
        calendar: {
            outboundDateRange: ['2023-08-01', '2023-08-31']
        }
    });

    const paradiseDates = await api.calendar();
    console.table(paradiseDates)

    const { flights: [result], trendData: td1 } = await api.search();
    console.log(`Found ${result.airlines.join(', ')} flight from ${result.departure.airport.code} to ${result.arrival.airport.code} for $${result.price}`);

    const { bookings: [paradiseBookingInfo], trendData: td2 } = await api.book([result]);
    if (paradiseBookingInfo.separateBookings) {
        for (const booking of paradiseBookingInfo.separateBookings) {
            if (!booking.link || !booking.linkData) continue;
            const bookingLink = await GoogleFlightsAPI.getBookingLink(booking.link, booking.linkData);
            console.log(bookingLink);
        }
    } else if (paradiseBookingInfo.link && paradiseBookingInfo.linkData) {
        const bookingLink = await GoogleFlightsAPI.getBookingLink(paradiseBookingInfo.link, paradiseBookingInfo.linkData);
        console.log(bookingLink);
    }

    // console.table(td1?.trends.map(t => [new Date(t[0]).toLocaleDateString(), t[1]]))
})();