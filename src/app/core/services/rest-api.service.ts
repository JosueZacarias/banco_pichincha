import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { iHttpOptions, iProduct } from "../interfaces/interfaces";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class restApiService{
  private apiURL : string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { }

  getProductList(authorId: number): Observable<Array<iProduct>>{
    this.headers = new HttpHeaders({ 'authorId': authorId });
    let localOptions:iHttpOptions = {
      headers: this.headers
    };
    return this.http.get<any>(`${this.apiURL}/bp/products`,localOptions);
  }

  getProduct(authorId: number,id:string): Observable<Array<iProduct>>{
    this.headers = new HttpHeaders({ 'authorId': authorId });
    let localOptions:iHttpOptions = {
      headers: this.headers
    };
    localOptions.params = new HttpParams().set('id',id);
    return this.http.get<any>(`${this.apiURL}/bp/products`,localOptions);
  }

  validateProductId(authorId: number,id:string): Observable<any>{
    this.headers = new HttpHeaders({ 'authorId': authorId });
    let localOptions:iHttpOptions = {
      headers: this.headers
    };
    localOptions.params = new HttpParams().set('id',id);
    return this.http.get<any>(`${this.apiURL}/bp/products/verification`,localOptions);
  }

  createProduct(authorId: number,model:iProduct): Observable<iProduct>{
    this.headers = new HttpHeaders({ 'authorId': authorId });
    let localOptions:iHttpOptions = {
      headers: this.headers
    };
    return this.http.post<any>(`${this.apiURL}/bp/products`,model,localOptions)
  }

  deleteProduct(authorId: number,id:string) : Observable<any>{
    this.headers = new HttpHeaders({ 'authorId': authorId });
    let localOptions:iHttpOptions = {
      headers: this.headers
    };
    localOptions.params = new HttpParams().set('id',id);
    return this.http.delete<any>(`${this.apiURL}/bp/products`,localOptions);
  }

  updateProduct(authorId: number,model:iProduct) : Observable<any>{
    this.headers = new HttpHeaders({ 'authorId': authorId });
    let localOptions:iHttpOptions = {
      headers: this.headers
    };
    return this.http.put<any>(`${this.apiURL}/bp/products`,model,localOptions);
  }

}