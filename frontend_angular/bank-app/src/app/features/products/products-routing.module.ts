import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { UnsavedChangesGuard } from '../../core/guards/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: ProductFormComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    canDeactivate: [UnsavedChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
