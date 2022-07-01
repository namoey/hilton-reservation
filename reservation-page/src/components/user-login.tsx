import React, { useState } from "react"

type Props = {
    userLogin: (e: React.FormEvent, formData: IUser | any) => void
}

const UserLogin: React.FC<Props> = ({ userLogin }) => {
    const [formData, setFormData] = useState<IUser | { }>( )

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    return (
        <form className="Form" onSubmit={(e) => userLogin(e, formData)}>
            <div>
                <div>
                <label htmlFor='userName'>User Name</label>
                <input onChange={handleForm} type='text' id='userName' />
                </div>
                <div>
                <label htmlFor='password'>Password</label>
                <input onChange={handleForm} type='password' id='password'/>
                </div>
            </div>
            <button disabled={formData === undefined ? true: false} >Login</button>
        </form>
    )
}

export default UserLogin