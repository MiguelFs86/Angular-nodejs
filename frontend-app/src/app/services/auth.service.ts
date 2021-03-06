import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient, private router: Router) { }
    
    login(credentials){
        return this.http.post( AppComponent.BACKEND_URL + '/login', 
        {credentials})
        .pipe(
            map((res:any) =>{
                let data = res;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.user.name);
                localStorage.setItem('userID', data.user._id);
                return true;
            }), 
        )
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    getToken(){
        return localStorage.getItem('token') || null;
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