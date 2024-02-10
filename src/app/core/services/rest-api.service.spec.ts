import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { restApiService } from './rest-api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const HttpClientMock = {
  get: jest.fn()
};

const productListMock = [
  {
    "id": "tarj-001",
    "name": "tarj-001",
    "description": "tarj-00001",
    "logo": "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg",
    "date_release": "2024-02-01T00:00:00.000+00:00",
    "date_revision": "2025-02-01T00:00:00.000+00:00"
},
{
    "id": "tarj-002",
    "name": "tarj-002",
    "description": "tarj-00002",
    "logo": "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg",
    "date_release": "2024-02-02T00:00:00.000+00:00",
    "date_revision": "2025-02-02T00:00:00.000+00:00"
},
{
    "id": "tarj-003",
    "name": "tarj-003",
    "description": "tarj-00003",
    "logo": "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg",
    "date_release": "2024-02-03T00:00:00.000+00:00",
    "date_revision": "2025-02-03T00:00:00.000+00:00"
},
{
    "id": "tarj-004",
    "name": "tarj-004",
    "description": "tarj-00004",
    "logo": "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg",
    "date_release": "2024-02-04T00:00:00.000+00:00",
    "date_revision": "2025-02-04T00:00:00.000+00:00"
},
{
    "id": "tarj-005",
    "name": "tarj-005",
    "description": "tarj-00005",
    "logo": "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg",
    "date_release": "2024-02-05T00:00:00.000+00:00",
    "date_revision": "2025-02-05T00:00:00.000+00:00"
},
{
    "id": "tarj-006",
    "name": "tarj-006",
    "description": "tarj-00006",
    "logo": "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg",
    "date_release": "2024-02-06T00:00:00.000+00:00",
    "date_revision": "2025-02-06T00:00:00.000+00:00"
}
];

describe('restApiService', () => {
  let service : restApiService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        restApiService,
        {
          provide: HttpClient,
          useValue: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(restApiService);
    HttpClientMock.get.mockReturnValue(of(productListMock))
  });

  it('getProductList http have been called', () => {
    service.getProductList(1);
    expect(HttpClientMock.get).toHaveBeenCalled();
  });

  it('getProductList return ProductList', (done) => {
    service.getProductList(1).subscribe( (res: any) => {
      expect(res.length).toBeGreaterThan(0);
      done();
    } )
  });


});