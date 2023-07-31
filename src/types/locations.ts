interface City {
    type: 'city';
    fullName: string;
    shortName: string;
    description: string;
    identifier: string;
    airports: Airport[];
}

interface Airport {
    type: 'airport';
    name: string;
    city: string;
    identifier: string;
    description?: string;
    code: string;
    distance?: string;
}

export type LocationSearchResult = (City | Airport)[];