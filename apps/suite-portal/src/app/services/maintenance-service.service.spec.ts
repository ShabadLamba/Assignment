import { HttpHeaders } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MaintenanceRequest, ServiceType } from '@suiteportal/api-interfaces';

import { MaintenanceServiceService } from './maintenance-service.service';

describe('MaintenanceServiceService', () => {
  let httpTestingController: HttpTestingController;
  let maintenanceServiceService: MaintenanceServiceService;
  const baseUrl = '/api/maintenance-requests';
  let maintenanceRequest: MaintenanceRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    maintenanceRequest = {
      id: 'vrkXhgzfNt',
      unitNumber: 'fasasfa',
      name: 'asfaf',
      email: 'safasf',
      serviceType: ServiceType.Electrical,
      summary: 'asfaf',
      details: 'asfaf',
      status: 'close',
    };
  });

  beforeEach(inject(
    [MaintenanceServiceService],
    (service: MaintenanceServiceService) => {
      maintenanceServiceService = service;
    }
  ));
  it('should be created', () => {
    expect(maintenanceServiceService).toBeTruthy();
  });

  it('should return data', () => {
    let result: MaintenanceRequest[];
    maintenanceServiceService
      .getMaintenanceRequest()
      .subscribe((t: MaintenanceRequest[]) => {
        result = t;
      });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: baseUrl,
    });

    req.flush([maintenanceRequest]);

    expect(result[0]).toEqual(maintenanceRequest);
  });

  it('should call POST API to create a new maintenance request', () => {
    maintenanceServiceService
      .postMaintenanceRequest(maintenanceRequest, {})
      .subscribe();

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: baseUrl,
    });
    expect(req.request.body).toEqual(maintenanceRequest);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
