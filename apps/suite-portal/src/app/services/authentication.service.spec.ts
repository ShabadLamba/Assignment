import { inject, TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '@suiteportal/api-interfaces';

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  let authenticationService: AuthenticationService;
  const baseUrl = '/api/auth/login';
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    user = {
      id: 'BSZ6wzzzkIjasfbk',
      name: 'Shabad',
      password: '1234',
      role: 'admin',
      email: 'shabadlamba@gmail.com',
    };
  });

  beforeEach(inject(
    [AuthenticationService],
    (service: AuthenticationService) => {
      authenticationService = service;
    }
  ));
  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });
  it('should login', () => {
    authenticationService.login(user, {}).subscribe();

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: baseUrl,
    });
    expect(req.request.body).toEqual(user);
  });
});
