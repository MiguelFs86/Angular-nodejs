import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    
    user: any = {
        email: '',
        password: '',
        name: ''
    }

    registerForm: FormGroup;
    
    showSpinner: boolean = false;
    
    constructor( private userService: UserService, public dialog: MatDialog) {
        this.registerForm = new FormGroup({
            email: new FormControl(),
            password: new FormControl(),
            name: new FormControl()
         });
    }
    
    ngOnInit() {
    }

    showDialog(result, message?){
        const dialogRef = this.dialog.open(DialogComponent , {
            width: '400px',
            data: {action: 'Register ', name: this.user.fullName, message: message, result: result }
        });
        this.showSpinner = false;
        this.registerForm.reset();
    }
    
    register(){
        this.showSpinner = true;
        console.log(this.user);
        this.userService.registerUser(this.user).subscribe( (res:any) => {
            this.showDialog(true, res.message);
        },
        err => {
            let message = err.error.err.message;
            this.showDialog(false, message);
        })
    }
    
}
