import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductUpdateComponent } from './product-update.component';
import { restApiService } from '@app/core/services/rest-api.service';


let restApiServiceMock = {
  createProduct : jest.fn(),
  validateProductId : jest.fn(),
};

let productCreate: ProductUpdateComponent
let fixture: ComponentFixture<ProductUpdateComponent>;

describe('ProductCreateComponent', () => {
  beforeEach( async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProductUpdateComponent
      ],
      providers: [{
        provide: restApiService,
        useValue: restApiServiceMock
      }]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductUpdateComponent);
    productCreate = fixture.componentInstance;

    const userService = TestBed.inject(restApiService);
  });

  it('should productCreate is rendered', () => {
    expect(productCreate).toBeTruthy();
  });
});