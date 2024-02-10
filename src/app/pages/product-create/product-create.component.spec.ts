import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCreateComponent } from './product-create.component';
import { restApiService } from '@app/core/services/rest-api.service';


let restApiServiceMock = {
  createProduct : jest.fn(),
  validateProductId : jest.fn(),
};

let productCreate: ProductCreateComponent
let fixture: ComponentFixture<ProductCreateComponent>;

describe('ProductCreateComponent', () => {
  beforeEach( async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductCreateComponent
      ],
      providers: [{
        provide: restApiService,
        useValue: restApiServiceMock
      }]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductCreateComponent);
    productCreate = fixture.componentInstance;

    const userService = TestBed.inject(restApiService);
  });

  it('should productCreate is rendered', () => {
    expect(productCreate).toBeTruthy();
  });
});