import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000"

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}` 

export const getReservations = async ( userId: string ): Promise<AxiosResponse<ReservationApiContract>> => {
    try {
        const param = userId === undefined ? "" : `?userId=${userId}`
        const reservations: AxiosResponse<ReservationApiContract> = await axios.get(
            baseUrl + "/reservation/list" + param
        )
        return reservations
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const addReservation = async ( formData: IReservation ): Promise<AxiosResponse<ReservationApiContract>> => {
    try {
        const reservation: Omit<IReservation, "_id"> = {
            arrivalTime: formData.arrivalTime,
            tableSize: formData.tableSize,
            status: formData.status,
            userId: formData.userId
        }
        const saveReservation: AxiosResponse<ReservationApiContract> = await axios.post(
            baseUrl + "/reservation/add",
            reservation
        )
        return saveReservation
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export const updateReservation = async ( formData: IReservation ): Promise<AxiosResponse<ReservationApiContract>> => {
    try {
        const reservation : IReservation = {
            _id: formData._id,
            userId: formData.userId,
            arrivalTime: formData.arrivalTime,
            tableSize: formData.tableSize,
            status: formData.status
        }

        const updateReservation: AxiosResponse<ReservationApiContract> = await axios.put(
            `${baseUrl}/reservation/${reservation._id}`,
            reservation
        )
        return updateReservation
    }
    catch(error){
        console.log(error)
        throw error
    }
}

export const deleteReservation = async (_id: string): Promise<AxiosResponse<ReservationApiContract>> => {
    try {
        const deleteReservation: AxiosResponse<ReservationApiContract> = await axios.delete(
            `${baseUrl}/reservation/${_id}`
        )
        return deleteReservation
    }
    catch(error){
        console.log(error)
        throw error
    }
}