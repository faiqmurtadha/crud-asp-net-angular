import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './players/list/list.component';
import { DetailsComponent } from './players/details/details.component';
import { CreateComponent } from './players/create/create.component';
import { EditComponent } from './players/edit/edit.component';

const routes: Routes = [
  { path: 'players', redirectTo: 'players/list', pathMatch: 'full' },
  { path: 'players/list', component: ListComponent },
  { path: 'players/detail/:id', component: DetailsComponent },
  { path: 'players/create', component: CreateComponent },
  { path: 'players/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
