import React, { useState } from "react"

type Props = {
    saveReservation: (e: React.FormEvent, formData: IReservation | any) => void
}

const AddReservation: React.FC<Props> = ({ saveReservation }) => {
    
    const userId = JSON.parse(localStorage.getItem("user") || '{}')._id
    const [formData, setFormData] = useState<IReservation | { }>( { userId: userId } )

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    return (
        <form className="Form" onSubmit={(e) => saveReservation(e, formData)}>
            <div>
                <div>
                <label htmlFor='arrivalTime'>Arrival Time</label>
                <input onChange={handleForm} type='date' id='arrivalTime' />
                </div>
                <div>
                <label htmlFor='tableSize'>Table Size</label>
                <input onChange={handleForm} type='text' id='tableSize' pattern="[0-9]*"/>
                </div>
            </div>
            <button disabled={formData === undefined ? true: false} >Add Reservation</button>
        </form>
    )
}

export default AddReservation