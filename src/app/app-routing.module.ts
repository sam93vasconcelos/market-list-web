import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard-service.service';
import { HomeComponent } from './home/home.component';
import { CreateListComponent } from './lists/create-list/create-list.component';
import { ShowListComponent } from './lists/show-list/show-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'lista/:id',
    component: ShowListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'criar-lista',
    component: CreateListComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
