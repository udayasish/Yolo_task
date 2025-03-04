// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // Import UserModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
// import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true}),
    UserModule, 
    PassportModule,
    JwtModule.register({
      secret: `${process.env.ACCESS_TOKEN_SECRET}`, 
      // secret: "secret", 
      // signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
      signOptions: { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}` },
    }),
  ],
  controllers: [AuthController],
  // providers: [AuthService, JwtStrategy, LocalStrategy],
  providers: [AuthService, JwtStrategy,],
})
export class AuthModule {}