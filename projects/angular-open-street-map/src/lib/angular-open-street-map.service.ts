import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Place } from '../models/place.model';
import { Coordinates } from '../models/coordinates.model';
import { ReverseGeocoding } from '../models/reverse.geocoding.model';

@Injectable({
  providedIn: 'root'
})
export class AngularOpenStreetMapService {

  private url: string = 'https://nominatim.openstreetmap.org';

  constructor(private http: HttpClient) {
  }

  public reverseLatLng(latlng: Coordinates, format: string = 'jsonv2'): Observable<Place> {
    const api = `${this.url}/reverse?format=${format}`;
    const params = { lat: latlng.latitude, lon: latlng.longitude };

    return this.http.get<ReverseGeocoding>(api, { params: params })
      .pipe(
        map((response: ReverseGeocoding) => {
          const place: Place = { latlng: latlng };
          if (response.hasOwnProperty('address')) {
            place.placeId = response.place_id;
            place.category = response.category;
            place.latlng = latlng;
            place.name = response.name;
            place.displayName = response.displayName;
            place.address = response.address;
            return place;
          }
          return place;
        }),
      );
  }
}
