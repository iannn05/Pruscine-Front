import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPeliculaComponent } from './informacion-pelicula.component';

describe('InformacionPeliculaComponent', () => {
  let component: InformacionPeliculaComponent;
  let fixture: ComponentFixture<InformacionPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
