import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: Http, private router: Router) { }
    
    login(credentials){
        let headers = new Headers();
        
        return this.http.post( AppComponent.BACKEND_URL + '/login', 
        {headers, credentials})
        .pipe(
            map((res:any) =>{
                let data = res.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.user.name);
                return true;
            }), 
        )
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        
        if (token) {
            return true;
        } else {
            return false;
        }
    }
}