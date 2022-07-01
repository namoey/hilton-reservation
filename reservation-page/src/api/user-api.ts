import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000"

export const userLogin = async (formData: IUser): Promise<AxiosResponse<UserLoginResult>> => {
    try {
        const user: Omit<IUser, "_id" | "userType" | "phone"> = {
            userName: formData.userName,
            password: formData.password
        }
        const userLogin: AxiosResponse<UserLoginResult> = await axios.post(
            baseUrl + "/user/login",
            user
        )
        return userLogin
    }
    catch (error) {
        console.log(error)
        throw error
    }
}