import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductCreateComponent } from '../pages/product-create/product-create.component';
import { ProductUpdateComponent } from '@app/pages/product-update/product-update.component';
import { ErrorsModule } from '@app/error/errors.module';
import { PaginationComponent } from '@app/layout/components/pagination/pagination.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductCreateComponent,
    PaginationComponent,
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorsModule
  ]
})
export class LayoutModule { }
