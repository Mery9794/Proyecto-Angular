import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiscoFicticioComponent } from './agregar-disco-ficticio.component';

describe('AgregarDiscoFicticioComponent', () => {
  let component: AgregarDiscoFicticioComponent;
  let fixture: ComponentFixture<AgregarDiscoFicticioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarDiscoFicticioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarDiscoFicticioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
