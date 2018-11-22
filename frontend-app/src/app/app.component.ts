import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  title = 'frontend-app';
//   static BACKEND_URL = 'https://51.38.184.194:8080';
static BACKEND_URL = 'https://backend.serantes.pro';
//   static BACKEND_URL = 'http://backend-serantes.ddns.net';
}
