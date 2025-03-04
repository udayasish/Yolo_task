// import { Controller, Get, Post, Request, Res, UseGuards, UsePipes } from '@nestjs/common';
// import { AuthService } from './auth.service';

// import { Response } from 'express';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
// import { CreateUserSchema } from 'src/zodSchemas/user.schema';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   // @UseGuards(LocalAuthGuard)
//   @Post('login')
//   async login(@Request() req, @Res({ passthrough: true }) res: Response) {
   
//     const { username, password } = req.body;
  
    
//     return this.authService.login(username, password, res);
//   }

//   @Post('signup')
//   @UsePipes(new ZodValidationPipe(CreateUserSchema))
//   async signup(@Request() req) {
//     const { username, password, email, name, birthDate, gender, description } = req.body;
//     return this.authService.signup(username, password, email, name, birthDate, gender, description);
//   }


//   @Post('logout')
//   async logout(@Res({ passthrough: true }) res: Response) {
//     // Clear the access_token cookie to log the user out
//     res.clearCookie('access_token');
//     return { message: 'Logged out successfully' };
//   }

//   @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
//   @Get('me')
//   async getLoggedInUser(@Request() req) {
//     // The user is attached to the request by the JwtStrategy
//     const user = req.user;
//     if (!user) {
//       throw new Error('User not found');
//     }
//     console.log('Searching for user : ', user);
//     return this.authService.getLoggedInUser(user.username);
//   }
// }






import { Controller, Get, Post, Body, Request, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CreateUserSchema, CreateUserDto } from 'src/zodSchemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { username, password } = req.body;
    return this.authService.login(username, password, res);
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async signup(@Body() userData: CreateUserDto) {
    // With proper validation, you can use the typed object directly
    return this.authService.signup(
      userData.username,
      userData.password,
      userData.email,
      userData.name,
      userData.birthDate,
      userData.gender,
      userData.description
    );
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getLoggedInUser(@Request() req) {
    const user = req.user;
    if (!user) {
      throw new Error('User not found');
    }
    return this.authService.getLoggedInUser(user.username);
  }
}