import React from "react"
import { format } from "date-fns"

type Props = ReservationProps & {
    updateReservation: (reservation: IReservation) => void
    deleteReservation: (_id: string) => void
}
const Reservation: React.FC<Props> = ({reservation, updateReservation, deleteReservation}) => {
    
    const updateStatusAndSave = (reservation: IReservation) => {
        reservation.status = 1
        updateReservation(reservation)
    }

    const user = JSON.parse(localStorage.getItem("user") || '{}')

    return (
        <div className="Card">
        <div className="Card--text">
            <h2>Arrival Time</h2>
            <span>{format(new Date(reservation.arrivalTime), 'PPP')}</span>
        </div>
        <div className="Card--text">
            <h2>User ID</h2>
            <span>{reservation.userId}</span>
        </div>
        <div className="Card--text">
            <h2>Table Size</h2>
            <span>{reservation.tableSize.toString()}</span>
        </div>
        <div className="Card--text">
            <h2>Status</h2>
            <span>{reservation.status.toString()}</span>
        </div>
        <div className="Card--button">
            <button 
                onClick={() => updateStatusAndSave(reservation)}
                className={ (reservation.status !== 0 || user.userType === 0) ? "hide-button" : "Card--button__done"}
            >
            Confirm
            </button>
            <button
                onClick={() => deleteReservation(reservation._id)}
                className={ (reservation.status === 1 && user.userType === 0) ? "hide-button" : "Card--button__delete"}
            >
            Delete
            </button>
        </div>
        </div>
    ) 
}

export default Reservation