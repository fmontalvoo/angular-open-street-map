# AngularOpenStreetMap

Esta librería contiene una implementación de [OpenStreetMap](https://www.openstreetmap.org) utilizando [Leaflet](https://leafletjs.com/) y los servicios de búsqueda de [Nominatim](https://nominatim.org/).

## Configuración

Para poder utilizar esta librería es necesario instalar primero Leaflet, para eso ejecuta el siguiente comando:
* `npm install leaflet --save`

También necesitaras cambiar los estilos css de Leaflet, por lo que necesitaras añadir las siguientes líneas en el archivo `angular.json`:
```json
"styles": [
	... 
	 "./node_modules/leaflet/dist/leaflet.css"
],
```

Para usar el marcador que viene por defecto, agregue las siguientes líneas en el archivo `angular.json`:
```json
"assets": [
    ...
    {
        "glob": "**/*",
        "input": "./node_modules/angular-open-street-map/assets",
        "output": "/assets/"
    }
],
```

## Uso

Agrega el módulo AngularOpenStreetMapModule a las importaciones del módulo que utilizará:

```typescript
import { NgModule } from '@angular/core';
import { AngularOpenStreetMapModule } from 'angular-open-street-map';

@NgModule({
    imports: [
        ...
        AngularOpenStreetMapModule
    ],
    ...
})
export class YourModule {
}
```

Añade el elemento al HTML:

```html
<open-street-map 
    [lat]="-0.17239496915142513" 
    [lng]="-78.48261026997494" 
    [zoom]="15">
</open-street-map>
```

Si quieres obtener información del lugar donde esta ubicado el marcador puedes agregar el siguiente código en tu componente:

```typescript
...
import { Place } from 'angular-open-street-map/models/place.model';

export class YourComponent {

  public getPlaceInfo(place: Place): void {
    console.log(place);
  }

}
```

Y deberás agregar el siguiente evento en los atributos del componente:

```html
<open-street-map 
    ...
    (placeData)="getPlaceInfo($event)"
    ...
>
</open-street-map>
```