import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRequest } from '@suiteportal/api-interfaces';
import { AuthDao } from './auth.dao';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDao: AuthDao,
    private jwtService: JwtService
  ) {
    //
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.authDao.getUser(email);

      if (user) {
        if (user.password === password) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async login(authRequest: AuthRequest): Promise<any> {
    try {
      if (!authRequest?.email)
        throw new BadRequestException('Must provide a valid email');

      if (!authRequest?.role && authRequest.role !== 'admin')
        throw new BadRequestException('User is not an admin');

      if (!authRequest?.password && authRequest.role !== 'admin')
        throw new BadRequestException('User is not an admin');

      const { email, password, role } = authRequest;
      const user = await this.validateUser(email, password);
      if (!user) throw new Error('Invalid password or email');
      const accessToken = await this.jwtService.signAsync({
        email,
        password,
        role,
      });
      return { accessToken, user };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
