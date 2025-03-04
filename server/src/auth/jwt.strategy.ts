// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
         // Log the entire request cookies for debugging
        //  console.log('Request cookies:', req.cookies);

         // Extract JWT from cookies
         const token = req.cookies?.access_token;
        //  console.log('Extracted token:', token); // Log the extracted token
         return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: String(process.env.ACCESS_TOKEN_SECRET) // Use a strong secret in production
    });
  }

  async validate(payload: any) {
    // console.log('JWT Payload:', payload);
    const user = await this.userService.findUser(payload.username);
    if (!user) {
      // console.log('User not found for username:', payload.username);
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}