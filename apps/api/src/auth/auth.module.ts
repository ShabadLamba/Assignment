import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthDao } from './auth.dao';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStragey } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../environments/environment';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: environment.secretKey,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthDao, JwtStragey],
  exports: [AuthService, PassportModule, JwtStragey],
})
export class AuthModule {}
