import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStragey extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(private authSerive: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.secretKey,
    });
  }

  async validate(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const found = await this.authSerive.validateUser(email, password);

    if (!found) {
      throw new UnauthorizedException();
    }

    return found;
  }
}
