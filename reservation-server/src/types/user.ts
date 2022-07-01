import { Document } from "mongoose";

export interface IUser extends Document {
    userType: number
    userName: string
    phone: string
    password: string
}