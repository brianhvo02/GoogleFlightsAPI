import GoogleHotelsAPI from "../GoogleHotelsAPI.js";
import GoogleLocationSearch from "../GoogleLocationSearch.js";

const testHotels = async () => {
    const [ location ] = await GoogleLocationSearch('San Jose');
    const api = new GoogleHotelsAPI({
        locationIdentifier: location.identifier
    });
    await api.search();
}

export default testHotels;