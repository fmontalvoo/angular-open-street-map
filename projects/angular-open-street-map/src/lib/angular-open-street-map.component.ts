/**
 * @author Frank Montalvo Ochoa
 * 
 * @description Componente que inicializa el mapa y se encarga
 * de presentar la informacion y manejar la interaccion con el 
 * usuario. 
 */

import {
  Component, OnInit, AfterViewInit,
  OnDestroy, EventEmitter, Input, Output
} from '@angular/core';

import { Subscription } from 'rxjs';

import {
  Map, tileLayer, Icon, icon, Marker
} from 'leaflet';

import { Place } from '../models/place.model';

import { AngularOpenStreetMapService } from './angular-open-street-map.service';

@Component({
  selector: 'open-street-map',
  template: `
  <div class="map-container">
    <div class="map-frame">
        <div id="map"></div>
    </div>
  </div>
`,
  styles: [
    `
    .map-container {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 30px;
      height: 500px;
    }
    
    .map-frame {
      border: 2px solid black;
      height: 100%;
    }
    
    #map {
      width: 100%;
      height: 100%;
    }
  `
  ]
})

/**
 * 
 */
export class AngularOpenStreetMapComponent implements OnInit, AfterViewInit, OnDestroy {
  // Permite inicializar el mapa.
  private map!: Map;
  // Permite agregar un icono personalizado para el marcador.
  private icon!: Icon;
  // Permite crear un marcador para mostrar en el mapa.
  private marker!: Marker;

  // Recibe la latitud que se le pase como argumento.
  @Input() public lat!: number;
  // Recibe la longitud que se le pase como argumento.
  @Input() public lng!: number;
  // Recibe el nivel de zoom para mostrar en el mapa..
  @Input() public zoom!: number;

  // Emite una respuesta al componente padre con la informacion de un lugar.
  @Output() private placeData!: EventEmitter<Place>;

  // Maneja la subscripcion con los servicios de OSM.
  private subscription!: Subscription;

  constructor(private mapService: AngularOpenStreetMapService) {
    this.placeData = new EventEmitter();
  }

  /**
   * Establece valores por defecto en caso de no recibir los argumentos
   * necesarios.
   */
  ngOnInit(): void {
    this.lat = this.lat ?? 0.0;
    this.lng = this.lng ?? 0.0;
    this.zoom = this.zoom ?? 10;
  }

  /**
   * Inicializa el mapa una vez se haya cargado el componente.
   */
  ngAfterViewInit(): void {
    this.initMap();
  }

  /**
   * Cancela la subscripcion con el servicio cuando el componente
   * es desmontado.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Inicia todas las variables necesarias para el funcionamiento del mapa.
   */
  private initMap(): void {
    //Inicializa al mapa.
    this.map = new Map('map')
      .setView([this.lat, this.lng], this.zoom);

    //Carga la capa base para el mapa.
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);

    // Crea un nuevo icono personalizado para el marcador.
    this.icon = icon({
      iconUrl: 'assets/markers/marker.png',
      iconSize: [50, 90],
      iconAnchor: [22, 94],
    });

    this.marker = new Marker([this.lat, this.lng], { icon: this.icon });
    this.marker.addTo(this.map);

    this.map.on('click', this.changeMakerLatLng);
    this.marker.on('move', this.getMarkerLatLng);
  }

  /**
   * Cambia la latitud y longitud del marcador en el mapa.
   * 
   * @param event 
   */
  private changeMakerLatLng = (event: any) => {
    const latlng = event.latlng;
    this.marker.setLatLng(latlng);
    this.marker.addTo(this.map);
    this.emitLatLngData();
  }

  /**
  * Obtiene la latitud y longitud de la posición actual del marcador en el mapa.
  * 
  * @param event 
  */
  private getMarkerLatLng = (event: any) => {
    const latlng = event.latlng;
    this.lat = latlng.lat;
    this.lng = latlng.lng;
  }

  /**
   * Retorna la infromacion relativa a una latitud y longitud al 
   * componente padre.
   */
  private async emitLatLngData() {
    this.subscription = this.mapService
      .reverseLatLng({ latitude: this.lat, longitude: this.lng })
      .subscribe(response =>
        this.placeData.emit(response)
      );
  }
}
