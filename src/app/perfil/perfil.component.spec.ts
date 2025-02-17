import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { AuthService } from '../services/auth.services';
import { UserService } from '../services/user.services';
import { of } from 'rxjs';  // to mock observables

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let authServiceMock: any;
  let userServiceMock: any;

  beforeEach(async () => {
    // Mock AuthService and UserService
    authServiceMock = {
      getData: jasmine.createSpy().and.returnValue({ idusuario: 1 })  // Mocked response
    };
    
    userServiceMock = {
      getOneUsuario: jasmine.createSpy().and.returnValue(of({ idusuario: 1, nombre: 'John', email: 'john@example.com' }))  // Mocked observable
    };

    await TestBed.configureTestingModule({
      imports: [PerfilComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on init', () => {
    // Ensure getData() was called and the user data is set
    expect(authServiceMock.getData).toHaveBeenCalled();
    expect(userServiceMock.getOneUsuario).toHaveBeenCalledWith(1);  // Check if getOneUsuario was called with the mocked idusuario
    expect(component.usuario.idusuario).toBe(1);  // Verify that the component's user data is set correctly
  });
});
