import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AngularOpenStreetMapService } from './angular-open-street-map.service';

import { AngularOpenStreetMapComponent } from './angular-open-street-map.component';

@NgModule({
  declarations: [
    AngularOpenStreetMapComponent
  ],
  imports: [
    HttpClientModule,
  ],
  exports: [
    AngularOpenStreetMapComponent
  ],
  providers: [
    AngularOpenStreetMapService,
  ]
})
export class AngularOpenStreetMapModule { }
