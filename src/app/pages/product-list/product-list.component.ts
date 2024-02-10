import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iProduct } from '@app/core/interfaces/interfaces';
import { restApiService } from '@app/core/services/rest-api.service';
import { errormsg, successmsg } from '@app/helpers/helpers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  counter: string = "";
  limit!: Array<any>;
  products!: Array<iProduct>;
  filtredProducts: Array<iProduct> = [];
  productTitle: string = '';
  authorId: number = 10;
  productId : string = '';
  page: number = 1;
  limitCounter : number = 5;
  fullCounter : number = 0;
  totalPages: Array<number> = [];


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
      this.api.getProductList(this.authorId).subscribe({
        next: (response: any) => {
          this.products = response;
          this.filtredProducts = response.slice(0,this.limit[0].value);
          this.counter = this.filtredProducts.length.toString();
          this.fullCounter = this.products.length;
          this.limitCounter = parseInt(this.counter);
          if(this.fullCounter > 0){
            let pages = Math.round(this.fullCounter/this.limitCounter);
            for(let i = 1; i <= pages; i++){
              this.totalPages.push(i);
            }
          }else{
            this.totalPages.push(1);
          }
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
    this.fullCounter = parseInt(this.counter);
    this.limitCounter = this.filtredProducts.length;
  }

  goCreate(){
    this.router.navigate(['/products/create'])
  }

  showMenuContextual(elementIndex : number){
    document.getElementById(`myDropdown-${elementIndex}`)?.classList.toggle("show");
  }

  showModalDelete(id:string,name:string){
    document.getElementById('delete-Modal')?.classList.toggle("show");
    this.productTitle = name;
    this.productId = id;
  }

  hideModalDelete(){
    document.getElementById('delete-Modal')?.classList.toggle("show");
    this.productTitle = "";
  }

  editProduct(id:string){
    this.router.navigate([`/products/update/${id}`])
  }


  deleteProduct(id:string){
    this.api.deleteProduct(this.authorId,id).subscribe({
      next: (response: any) => {
        console.log(response)
        // if(response){
        //   successmsg(response);
        //   this.getProducts();
        // }else{
        //   errormsg(response);
        // }
      }
    });

  }

  
}
