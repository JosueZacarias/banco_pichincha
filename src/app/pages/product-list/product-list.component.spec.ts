import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { restApiService } from '../../core/services/rest-api.service';

let restApiServiceMock = {
  getProductList : jest.fn(),
};
let productList:ProductListComponent
let fixture: ComponentFixture<ProductListComponent>;

describe('ProductListComponent', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductListComponent
      ],
      providers: [{
        provide: restApiService,
        useValue: restApiServiceMock
      }]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    productList = fixture.componentInstance;

    const userService = TestBed.inject(restApiService);
  });

  it('should productList is rendered', () => {
    expect(productList).toBeTruthy();
  });

});