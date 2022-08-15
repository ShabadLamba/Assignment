import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceServiceService } from '../../services/maintenance-service.service';

@Component({
  selector: 'sp-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  listOfMaintenanceRequest: MaintenanceRequest[] = [];
  displayedColumns = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Input() set _listOfMaintenanceRequest(value: MaintenanceRequest[]) {
    this.listOfMaintenanceRequest = value;
    this.displayedColumns = Object.keys(value[0]).slice(1);
    this.generateMaintenanceRequestForm();
  }

  maintenanceRequestForm = this.fb.group({});

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

  generateMaintenanceRequestForm() {
    this.listOfMaintenanceRequest.forEach((maintRequest) => {
      this.maintenanceRequestForm.addControl(
        maintRequest.id.toString(),
        new FormControl(false, [])
      );
    });
  }

  closeMaintenanceRequest(id) {
    this.maintenanceRequestService
      .closeMaintenanceRequest(id)
      .subscribe((maintenanceRequest: MaintenanceRequest) => {
        this.listOfMaintenanceRequest.map(
          (maintReq) => {
            if (maintReq.id === maintenanceRequest.id) {
              maintReq.status = maintenanceRequest.status;
            }
            this.openSnackBar('Successfully closed maintenance request');
            return maintReq;
          },
          (err) => {
            console.log(err);
            this.openSnackBar(err.message);
          }
        );
      });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
