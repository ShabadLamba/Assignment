import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';
import { MaintenanceServiceService } from '../services/maintenance-service.service';
@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  maintenanceRequestForm = this.fb.group({
    unitNumber: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    serviceType: ['', Validators.required],
    summary: ['', Validators.required],
    details: [''],
    status: ['open'],
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private maintenanceRequestService: MaintenanceServiceService,
    private _snackBar: MatSnackBar
  ) {
    //
  }

  ngOnInit(): void {
    //
  }

  submitForm(value: MaintenanceRequest) {
    this.maintenanceRequestService.postMaintenanceRequest(value, {}).subscribe(
      (response) => {
        this.openSnackBar('Successfully created maintenance request');
        this.maintenanceRequestForm.reset();
      },
      (err) => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
