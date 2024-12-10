import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Form, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService, private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading= true;
    this.loadingCtrl
    .create({keyboardClose: true, message: "Logging in..."})
    .then(loadingEl => {
      loadingEl.present();
      let authObs: Observable<AuthResponseData>;
      if(this.isLogin){
        authObs = this.authService.login(email, password);
      }else {
        authObs = this.authService.signup(email, password);
      }
      authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 
      errRes => {
        console.log(errRes);
        loadingEl.dismiss();
        const code = errRes.error.error.message;
        let message = " Could not sign up, please try again!";
        if(code === 'EMAIL_EXISTS'){
          message = "Email already exists!";
        }else if ( code === 'EMAIL_NOT_FOUND'){
          message = "Email not found!";
        }else if ( code === 'INVALID_LOGIN_CREDENTIALS'){
          message = "Invalid Login Credentials!";
        }
        this.showAlert(message);
      }
    );
  });
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.authenticate(email, password);
    form.reset();
  }

  private showAlert(message: string){
    this.alertCtrl
    .create({header: 'Authentication failed', message, buttons: ['OK']})
    .then(alertEl => {
          alertEl.present();
          });
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }
}
