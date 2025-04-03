import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaBaseComponent } from './plantilla-base.component';

describe('PlantillaBaseComponent', () => {
  let component: PlantillaBaseComponent;
  let fixture: ComponentFixture<PlantillaBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
