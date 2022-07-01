import { Document } from "mongoose";

export interface IReservation extends Document {
    userId: string
    arrivalTime: Date
    tableSize: number
    status: number
}