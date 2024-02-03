import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { iProduct } from 'src/app/core/interfaces/interfaces';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { successmsg, errormsg, warningmsg } from 'src/app/helpers/helpers';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit{
  
  createForm!: FormGroup;
  today : any = new Date().toISOString().split('T')[0];
  
  constructor(private formBuilder: FormBuilder,private api: restApiService){

  }

  
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id: new FormControl('',[Validators.required,Validators.minLength(3), Validators.maxLength(10)]),
      name: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('',[Validators.required,Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl('',[Validators.required]),
      date_release: new FormControl('',[Validators.required, Validators.pattern(/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}/g)]),
      date_revision: new FormControl('',[Validators.required, Validators.pattern(/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}/g)])      
    });
  }

  createProduct(){
    if(this.createForm.valid){
      let model: iProduct = {
        id : this.createForm.value['id'],
        name:this.createForm.value['name'],
        description: this.createForm.value['description'],
        logo: this.createForm.value['logo'],
        date_release: this.formatDate(this.createForm.value['date_release']),
        date_revision: this.formatDate(this.createForm.value['date_revision'])
      }
      this.api.validateProductId(model.id).subscribe({
        next: (response: any) => {
          if(response === false){
            let today_date = new Date(this.today);
            let release = new Date(model.date_release);
            let revision = new Date(model.date_revision);
            let estimate_revision = new Date(`${today_date.getFullYear() + 1}-${today_date.getMonth()}-${today_date.getDate()}`);
            if(release.getTime() >= today_date.getTime()){
              if(revision.getTime() === estimate_revision.getTime()){
                this.api.createProduct(model).subscribe({
                  next: (res:iProduct) => {
                    if(res.id == model.id){
                      successmsg("Producto creado correctamente");
                    }
                  }
                })
              }else{
                this.createForm.get('date_revision')?.setErrors({'incorrect': true});
                warningmsg(`La fecha de revisión: ${model.date_revision} debe ser exactamente dentro de un año`);
              }
            }else{
              this.createForm.get('date_release')?.setErrors({'incorrect': true});
              warningmsg(`La fecha de liberación: ${model.date_release} debe ser mayor o igual a hoy`);
            }
          }else{
            this.createForm.get('id')?.setErrors({'incorrect': true});
            warningmsg(`El id: ${model.id} ya existe en sistema`);
          }
        }
      })

    }else{
      errormsg("Debe completar los datos marcados en rojo");
      Object.keys(this.createForm.controls).forEach(field => {
        const control = this.createForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  formatDate(dateString:string): any{
    let [day, month, year] = dateString.split('/')
    const dateObj = new Date(`${year}-${month}-${day}`)
    return dateObj.toISOString().split('T')[0];
  }

  cleanForm(){
    this.createForm.reset();
  }

}
