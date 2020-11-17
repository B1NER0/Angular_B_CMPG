import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {path: '', component: LoginScreenComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'new', component: NewUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
