import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iProduct } from '@app/core/interfaces/interfaces';
import { restApiService } from '@app/core/services/rest-api.service';
import { successmsg, errormsg, warningmsg } from '@app/helpers/helpers';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit{
  
  updateForm!: FormGroup;
  today : any = new Date().toLocaleDateString("en-CA");
  authorId: number = 10;
  productId: string = '';
  
  constructor(private formBuilder: FormBuilder,private api: restApiService,private router: Router,private _Activatedroute: ActivatedRoute,){}

  
  ngOnInit(): void {
    this._Activatedroute.url.subscribe((event) => {
      this.productId = event[1].path;
      this.getProductById(this.productId);
    });
    this.updateForm = this.formBuilder.group({
      id: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(10)]),
      name: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('',[Validators.required,Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl('',[Validators.required]),
      date_release: new FormControl('',[Validators.required, Validators.pattern(/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}/g)]),
      date_revision: new FormControl('',[Validators.required, Validators.pattern(/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}/g)])      
    });
    
  }

  updateProduct(){
    if(this.updateForm.valid){
      let model: iProduct = {
        id : this.updateForm.value['id'],
        name:this.updateForm.value['name'],
        description: this.updateForm.value['description'],
        logo: this.updateForm.value['logo'],
        date_release: this.formatDate(this.updateForm.value['date_release']),
        date_revision: this.formatDate(this.updateForm.value['date_revision'])
      }
      let today_date = new Date(this.today);
      let release = new Date(model.date_release);
      let revision = new Date(model.date_revision);
      let estimate_revision = new Date(`${release.getFullYear() + 1}-${release.getMonth() < 10 ? "0"+(release.getMonth() + 1).toString():release.getMonth() + 1}-${release.getDate() < 10 ?"0"+(release.getDate() + 1).toString(): release.getDate() + 1}`);
      if(release.getTime() >= today_date.getTime()){
        if(revision.getTime() == estimate_revision.getTime()){
          this.api.updateProduct(this.authorId,model).subscribe({
            next: (res:iProduct) => {
              if(res.id == model.id){
                successmsg("Producto actualizado correctamente");
              }
            }
          })
        }else{
          this.updateForm.get('date_revision')?.setErrors({'incorrect': true});
          warningmsg(`La fecha de revisión: ${model.date_revision} debe ser exactamente dentro de un año`);
        }
      }else{
        this.updateForm.get('date_release')?.setErrors({'incorrect': true});
        warningmsg(`La fecha de liberación: ${model.date_release} debe ser mayor o igual a hoy`);
      }
     

    }else{
      errormsg("Debe completar los datos marcados en rojo");
      Object.keys(this.updateForm.controls).forEach(field => {
        const control = this.updateForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  formatDate(dateString:string): any{
    let [day, month, year] = dateString.split('/')
    const dateObj = new Date(`${year}-${month}-${day}`)
    return dateObj.toISOString().split('T')[0];
  }

  reverseformatDate(dateString:string): any{
    let date = dateString.split('T')[0];
    const dateObj = new Date(date)
    return `${dateObj.getDate() < 10 ?"0"+(dateObj.getDate() + 1).toString(): dateObj.getDate() + 1}/${dateObj.getMonth() < 10 ? "0"+(dateObj.getMonth() + 1).toString():dateObj.getMonth() + 1}/${dateObj.getFullYear() + 1}`;
  }

  cleanForm(){
    this.updateForm.reset();
  }

  getProductById(id: string){
      this.api.getProduct(this.authorId,id).subscribe({
        next: (response: any) => {
          if(response.length > 0){
            let filtered = response.filter((data:iProduct) => {
              return data.id == id;
            })
            this.updateForm.setValue({
              'id':filtered[0].id,
              'name':filtered[0].name,
              'description':filtered[0].description,
              'logo':filtered[0].logo,
              'date_release':this.reverseformatDate(filtered[0].date_release),
              'date_revision':this.reverseformatDate(filtered[0].date_revision),
            })
          }
        }
      });
  }

}
