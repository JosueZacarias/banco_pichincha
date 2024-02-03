import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iProduct } from 'src/app/core/interfaces/interfaces';
import { restApiService } from 'src/app/core/services/rest-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  counter: string = "4";
  limit!: Array<any>;
  products!: Array<iProduct>;
  filtredProducts: Array<iProduct> = [];

  constructor(private api: restApiService,private router: Router){

  }

  ngOnInit(): void {
    this.getProducts();
    this.limit = [
      {
        value: 5,
        name: "5"
      },
      {
        value: 10,
        name: "10"
      },
      {
        value: 20,
        name: "20"
      }
    ];
  }

  getProducts(){
    this.api.getProductList().subscribe({
      next: (response: any) => {
        this.counter = response.length;
        this.products = response;
        this.filtredProducts = response.slice(0,5);
      }
    });
  }

  searchProduct(filter:any){
    let productFinded: Array<iProduct> = []
    let data = Object.values(this.products);
    let regex = new RegExp(filter.target.value,"gi");
    productFinded = data.filter(d => {
      return d.name.search(regex)  !== -1  || d.description.search(regex) !== -1 || d.id.search(regex) !== -1
    })
    if(productFinded.length > 0){
      this.filtredProducts = productFinded;
      this.counter = this.filtredProducts.length.toString();
    }else{
      this.filtredProducts = [];
      this.counter = this.products.length.toString();
    }
  }

  limitProductList(count: any){
    let data = Object.values(this.products);
    let productFinded = data.slice(0,count.target.value);
    if(productFinded.length > 0){
      this.filtredProducts = productFinded;
      this.counter = this.filtredProducts.length.toString();
    }else{
      this.filtredProducts = [];
      this.counter = this.products.length.toString();
    }
  }

  goCreate(){
    this.router.navigate(['/create-product'])
  }

  
}
