import {IReservation} from "./../types/reservation"
import {model, Schema} from "mongoose"

//const timeZone = require('mongoose-timezone')

const reservationSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
            
        },
        tableSize: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
)
//reservationSchema.plugin(timeZone, { paths: ['arrivalTime', 'subDocument.subDate'] });
export default model<IReservation>("Reservation", reservationSchema)