import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Update the return type to include null
  async findUser(username: string, email?: string): Promise<User | null> {
    return this.userModel.findOne({ 
      $or: [{ username }, { email }],
     }).exec();
  }
  // Update the return type to include null
 


  async comparePassword(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await user.isPasswordCorrect(password);
  }


  async createUser(userData: Object): Promise<User> {
    const newUser = new this.userModel(userData);
   
    return newUser.save();
  }

  async getProfile(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  async updateProfile(username: string, updateData: any): Promise<any> {
    if (!updateData) {
      throw new BadRequestException('No data to update');
    }
  
    // Check if the email is already used by another user
    if (updateData.email) {
      const existingUserWithEmail = await this.userModel
        .findOne({ email: updateData.email })
        .exec();
      if (existingUserWithEmail && existingUserWithEmail.username !== username) {
        throw new BadRequestException('Email is already registered by another user');
      }
    }
  
    // Check if the username is already used by another user
    if (updateData.username) {
      const existingUserWithUsername = await this.userModel
        .findOne({ username: updateData.username })
        .exec();
      if (existingUserWithUsername && existingUserWithUsername.username !== username) {
        throw new BadRequestException('Username is already taken by another user');
      }
    }
  
    // Update the user profile
     const updatedUser = await this.userModel
      .findOneAndUpdate({ username }, updateData, { new: true })
      .exec();

      if(!updatedUser) {
        throw new BadRequestException('User not found');
      }

      const { password, ...userWithoutPassword } = updatedUser.toObject();
      return userWithoutPassword;
  }
}



