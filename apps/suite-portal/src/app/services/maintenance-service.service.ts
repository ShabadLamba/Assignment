import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceServiceService {
  maintenanceRequestUrl = '/api/maintenance-requests';

  constructor(private https: HttpClient) {}

  postMaintenanceRequest(data, headers) {
    const httpOptions = { ...headers };
    return this.https.post(this.maintenanceRequestUrl, data, httpOptions);
  }

  getMaintenanceRequest() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    });

    const httpOptions = { headers: headers };

    return this.https.get(this.maintenanceRequestUrl, httpOptions);
  }

  closeMaintenanceRequest(id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    });

    const url = this.maintenanceRequestUrl + `/${id}/close`;

    const httpOptions = { headers: headers };

    return this.https.put(url, httpOptions);
  }
}
