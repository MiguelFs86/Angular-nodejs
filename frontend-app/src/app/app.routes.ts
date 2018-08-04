import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuardService } from './services/auth-guard.service';

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ] },
    { path: 'products', component: ProductsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
	// { 
	// 	path: 'protegida', 
	// 	component: ProtegidaComponent,
	// 	canActivate: [ AuthGuardService ]

	// },
	{ path: '**', pathMatch: 'full', redirectTo: 'login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);