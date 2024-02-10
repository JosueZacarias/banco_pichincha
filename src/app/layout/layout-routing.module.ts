import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductCreateComponent } from '../pages/product-create/product-create.component';
import { LayoutComponent } from './layout.component';
import { ProductUpdateComponent } from '@app/pages/product-update/product-update.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'',
        component: ProductListComponent
      },
      {
        path: 'create',
        component: ProductCreateComponent
      },
      {
        path: 'update/:id',
        component: ProductUpdateComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
