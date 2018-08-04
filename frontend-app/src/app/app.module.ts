import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

import { 
    MatInputModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatSnackBarModule,
    MatProgressSpinnerModule, 
    MatFormFieldModule, MatCardModule} from '@angular/material';

    import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProductsComponent,
    RegisterComponent,
    UsersComponent
  ],
  imports: [
    RouterModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
