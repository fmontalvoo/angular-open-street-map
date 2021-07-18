import { Address } from "./address.model";
import { Coordinates } from "./coordinates.model";

export interface Place {
    placeId?: number;
    category?: string;
    latlng: Coordinates;
    name?: string;
    displayName?: string;
    address?: Address;
}