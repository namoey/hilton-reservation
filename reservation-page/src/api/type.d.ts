interface IReservation {
    _id: string
    userId: string
    arrivalTime: string
    tableSize: number
    status: number
}

interface ReservationProps {
    reservation: IReservation
}

type ReservationApiContract = {
    message: string
    status: string
    reservation: IReservation
}

interface IUser {
    _id: string
    userName: string
    password: string
    userType: number
    phone: string
}

interface UserProps {
    user: IUser
}

type UserLoginResult = {
    token: string
    user: IUser
}