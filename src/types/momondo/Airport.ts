export interface Airport {
    id:                  string;
    displayname:         string;
    loctype:             string;
    cid:                 number;
    rid:                 number;
    ctid:                number;
    lat:                 number;
    lng:                 number;
    cc:                  string;
    country:             string;
    rc:                  string;
    cityname:            string;
    timezone:            string;
    utc:                 string;
    airportname:         string;
    ap:                  string;
    apicode:             string;
    box_maxX:            number;
    box_maxY:            number;
    box_minX:            number;
    box_minY:            number;
    cityonly:            string;
    destination_images:  DestinationImages;
    displayType:         DisplayType;
    entityKey:           string;
    indexId:             string;
    isMetroOnly:         boolean;
    kayakId:             string;
    kayakType:           string;
    locationname:        string;
    name:                string;
    objectID:            string;
    placeID:             string;
    ptid:                string;
    region:              string;
    searchFormPrimary:   string;
    searchFormSecondary: string;
    secondary:           string;
    shortdisplayname:    string;
    smartyDisplay:       string;
}

export interface DestinationImages {
    image_jpeg: string;
    image_webp: string;
}

export interface DisplayType {
    type:        string;
    displayName: string;
}
