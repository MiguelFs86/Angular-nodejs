import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(private http: Http, private router: Router) { }

    registerUser(userData: any){
        let headers = new Headers();
        return this.http.post( AppComponent.BACKEND_URL + '/register', {headers, 
            email: userData.email,
            password: userData.password,
            name: userData.fullName});
    }
}
