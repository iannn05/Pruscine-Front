import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCrearComponent } from './lista-crear.component';

describe('ListaCrearComponent', () => {
  let component: ListaCrearComponent;
  let fixture: ComponentFixture<ListaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
