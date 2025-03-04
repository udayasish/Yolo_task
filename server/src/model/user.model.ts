
import { Schema, Document } from 'mongoose';

import * as bcrypt from 'bcryptjs';


export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthDate: { type: String, required: true},
  gender: { type: String, required: true},
  description: { type: String},
 
}, { timestamps: true });



UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next() 
})

// UserSchema.methods.isPasswordCorrect = async function (password: string) { 
//   return await bcrypt.compare(password, this.password)
// }
// Define the isPasswordCorrect method inside Schema.methods
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Define User as a class
export class User extends Document {
  username: string;
  password: string;
  email: string;
  name: string
  birthDate: string
  gender: string
  description: string
  isPasswordCorrect: (password: string) => Promise<any>;
}