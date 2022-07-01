import {IUser} from "./../types/user"
import {model, Schema} from "mongoose"

const userSchema: Schema = new Schema(
    {
        userType: {
            type: Number,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)
export default model<IUser>("User", userSchema)