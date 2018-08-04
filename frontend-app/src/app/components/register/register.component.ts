import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    
    user: any = {
        email: 'newmail@user.com',
        password: '',
        fullName: ''
    }
    
    showSpinner: boolean = false;
    
    constructor( private userService: UserService, public dialog: MatDialog) { }
    
    ngOnInit() {
    }

    showDialog(result, message?){
        const dialogRef = this.dialog.open(DialogComponent , {
            width: '400px',
            data: {name: this.user.fullName, message: message, result: result }
        });
        this.showSpinner = false;
    }
    
    register(){
        this.showSpinner = true;
        this.userService.registerUser(this.user).subscribe( res => {
            this.showDialog(true);
        },
        err => {
            console.log(err);
            let message = err.json().err.message;
            this.showDialog(false, message);
        })
    }
    
}
