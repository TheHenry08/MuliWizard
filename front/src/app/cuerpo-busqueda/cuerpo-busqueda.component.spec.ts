import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuerpoBusquedaComponent } from './cuerpo-busqueda.component';

describe('CuerpoBusquedaComponent', () => {
  let component: CuerpoBusquedaComponent;
  let fixture: ComponentFixture<CuerpoBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuerpoBusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuerpoBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
