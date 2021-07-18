import { Address } from "./address.model";

export interface ReverseGeocoding {
    place_id: number;
    licence?: string;
    osmType?: string;
    osmId?: number;
    lat: string;
    lon: string;
    placeRank?: number;
    category: string;
    type?: string;
    importance?: number;
    addresstype?: string;
    name: string;
    displayName: string;
    address: Address;
    boundingbox?: string[];
}