import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuerpoHomeComponent } from './cuerpo-home.component';

describe('CuerpoHomeComponent', () => {
  let component: CuerpoHomeComponent;
  let fixture: ComponentFixture<CuerpoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuerpoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuerpoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
