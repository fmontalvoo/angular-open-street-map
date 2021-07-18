import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularOpenStreetMapComponent } from './angular-open-street-map.component';

describe('AngularOpenStreetMapComponent', () => {
  let component: AngularOpenStreetMapComponent;
  let fixture: ComponentFixture<AngularOpenStreetMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularOpenStreetMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularOpenStreetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
