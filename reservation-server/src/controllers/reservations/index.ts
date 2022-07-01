import { Response, Request } from "express"
import { IReservation } from "../../types/reservation"
import Reservation from "../../models/reservation"
import { ReservationStatus } from "../../enums/reservation-status"

const getReservations = async(req: Request, res: Response): Promise<void> => {
    try{
        let reservations: IReservation[] | null
        if (req.query.userId !== undefined) {
            reservations = await Reservation.find({userId: req.query.userId as string})
        }
        else {
            reservations = await Reservation.find()
        }
        res.status(200).json({reservations})
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getUtcDate = (localDate: Date) => {
    const now = new Date()
    const utcOffset = (now.getTimezoneOffset() * 60000)
    return new Date(localDate.getTime() + utcOffset)
}

const addReservation = async(req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IReservation, "userId" | "arrivalTime" | "tableSize" | "status">
        const reservation: IReservation = new Reservation({
            userId: body.userId,
            arrivalTime: body.arrivalTime,
            tableSize: body.tableSize,
            status: ReservationStatus.Pending
        })
        const newReservation: IReservation = await reservation.save();
        res.status(201).json({message: "Reservation added", reservation: newReservation})
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const updateReservation = async(req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const body = req.body as Pick<IReservation, "userId" | "arrivalTime" | "tableSize" | "status">
        const updateReservation: IReservation | null = await Reservation.findByIdAndUpdate(id, body)
        res.status(200).json({
            message: "Reservation updated",
            reservation: updateReservation
        })
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const deleteReservation = async(req: Request, res: Response): Promise<void> => {
    try {
        const deleteReservation: IReservation | null = await Reservation.findByIdAndDelete (
            req.params.id
        )
        res.status(200).json({
            message: "Reservation deleted",
            reservation: deleteReservation
        })
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export { getReservations, addReservation, updateReservation, deleteReservation }