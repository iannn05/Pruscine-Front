import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionListaComponent } from './informacion-lista.component';

describe('InformacionListaComponent', () => {
  let component: InformacionListaComponent;
  let fixture: ComponentFixture<InformacionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
