// src/auth/auth.service.ts
import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string, ): Promise<any> {
  //   const user = await this.userService.findUser(username);
  //   if (user && bcrypt.compareSync(pass, user.password)) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null; // Return null if user is not found or password is invalid
  // }

  async login(username: string, password: string, @Res({ passthrough: true }) response: Response): Promise<any> {
   

  if (!(username)) {
    throw new BadRequestException("username is required");
  }

  const user = await this.userService.findUser(username);
  if (!user) {
    throw new BadRequestException("user doesnot not exists");
  }

  const isPasswordValid = await this.userService.comparePassword(username, password);
  if (!isPasswordValid) {
    throw new BadRequestException("Invalid user credentials");
  }

  const loggedInUser = await this.userService.findUser(username)
  const { password: _, ...result } = loggedInUser?.toObject();

  const payload = { username: loggedInUser?.username};

  const accessToken = this.jwtService.sign(payload);
    // Set the JWT token as a cookie
    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // use secure in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: 'lax'
    });

    return {
      user: result,
      accessToken,
      message: "Login successful",
    };
  }

  async signup(username: string, password: string, email: string, name: string, birthDate: String, gender: string, description: string = ""): Promise<any> {
    //Validate fields are not empty
    if (
      [username, email, name, password, gender].some((field) => field?.trim() === "")
    ) {
      throw new BadRequestException("Some fields are required");
    }

    const existingUser = await this.userService.findUser(username || email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser({
      username,
      password,
      email,
      name,
      birthDate,
      gender,
      description
    });
   
    const { password: _, ...result } = newUser.toObject();
    return result;
  }


  async getLoggedInUser(username: string) {
    // console.log('Fetching user with username:', username);
    const user = await this.userService.findUser(username);
    if (!user) {
     
      throw new BadRequestException('User not found');
    }

    const { password: _, ...result } = user.toObject();

    return result;
  }
}