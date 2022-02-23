import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from './product/view/view.component';
import { CreateComponent } from './product/create/create.component';

const routes: Routes = [
  {path: '', component: ViewComponent},
  {path: 'create', component: CreateComponent},
  {path: 'update/:id', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
