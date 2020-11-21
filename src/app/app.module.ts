import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/AuthGuard/auth.guard';
import { NewUserComponent } from './new-user/new-user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewDatabaseComponent } from './view-database/view-database.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    HomeComponent,
    NewUserComponent,
    ViewDatabaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
