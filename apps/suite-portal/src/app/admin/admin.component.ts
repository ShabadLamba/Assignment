import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceRequest, User } from '@suiteportal/api-interfaces';
import { AuthenticationService } from '../services/authentication.service';
import { MaintenanceServiceService } from '../services/maintenance-service.service';

@Component({
  selector: 'sp-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminLoginForm = this.fb.group({
    name: ['Shabad'],
    password: ['1234', Validators.required],
    email: ['shabadlamba@gmail.com', Validators.required],
    role: ['admin'],
  });

  currentUser: User;
  accessToken = null;
  loginFailed = false;
  listOfMaintenanceRequest = [];

  constructor(
    private fb: FormBuilder,
    private maintenanceRequestService: MaintenanceServiceService,
    private authenticationService: AuthenticationService
  ) {
    //
  }

  ngOnInit(): void {

    //using static variable in authentication service because implementing NgRX store just to store
    //one variable was overkill and was gonna take more time.
    this.currentUser = AuthenticationService.user;
    if (this.currentUser) {
      this.getAllMaintenanceRequests();
    }
  }

  submitForm(formValue) {
    this.authenticationService.login(formValue, {}).subscribe(
      (response: any) => {
        this.loginFailed = false;
        window.localStorage.removeItem('accessToken');
        window.localStorage.setItem('accessToken', response.accessToken);
        this.currentUser = response.user as User;
        AuthenticationService.user = response.user;
        this.getAllMaintenanceRequests();
      },
      (err) => {
        console.log(err);
        this.loginFailed = true;
      }
    );
  }

  getAllMaintenanceRequests() {
    this.maintenanceRequestService.getMaintenanceRequest().subscribe(
      (response: MaintenanceRequest[]) => {
        this.listOfMaintenanceRequest = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
