import { Controller, Post, Body } from '@nestjs/common';
import { AuthRequest } from '@suiteportal/api-interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @Post('login')
  public async login(@Body() authRequest: AuthRequest) {
    return await this.authService.login(authRequest);
  }
}
