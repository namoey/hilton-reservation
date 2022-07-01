import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from 'react';
import './App.css';
import AddReservation from './components/add-reservation'; 
import Reservation from './components/reservation';
import { getReservations, addReservation, updateReservation, deleteReservation} from './api/reservation-api'
import UserLogin from './components/user-login';
import { userLogin } from './api/user-api';


const App: React.FC = () => {

  const [reservations, setReservation] = useState<IReservation[]>([])

  useEffect(() => {
    fetchReservations()
  }, [])

  const checkLoginStatus = (): [boolean, string] => {
    const token = localStorage.getItem("token");
    const userName = JSON.parse(localStorage.getItem("user") || '{}').userName;
    return [(token !== null && token !== undefined), userName]
  }

  const fetchReservations = (): void => {
    
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    const param = (user.userType === 1) ? undefined : user._id
    getReservations(param)
    .then(({ data: { reservations } }: IReservation[] | any) => setReservation(reservations))
    .catch((err: Error) => console.log(err))
  }

  const handleSaveReservation = (e: React.FormEvent, formData: IReservation): void => {
    e.preventDefault()
    const saveCall = addReservation(formData)
      .then( ({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Reservation no saved")
        }
        fetchReservations()
      })
      //.catch(err => console.log(err))
      toast.promise(saveCall, {
        success: "Reservation saved succesfully",
        error: {
          render({data}){
            return `Save failed: ${data.message}`
          }
        }
      })
  }

  const handleUpdateReservation = (reservation: IReservation): void => {
    const updateCall = updateReservation(reservation)
      .then(({status, data}) => {
          if (status !== 200) {
            throw new Error("Error! Reservation not updated")
          }
          fetchReservations()
      })
      //.catch(err => console.log(err))
      toast.promise(updateCall, {
        success: "Reservation updated succesfully",
        error: {
          render({data}){
            return `Update failed: ${data.message}`
          }
        }
      })
  }

  const handleDeleteReservation = (_id: string) : void => {
    const deleteCall = deleteReservation(_id)
      .then(({status, data}) => {
        if (status !== 200) {
          throw new Error('Error! Reservation not deleted')
        }
        fetchReservations()
      })

      toast.promise(deleteCall, {
        success: "Reservation deleted succesfully",
        error: {
          render({data}){
            return `Delete failed: ${data.message}`
          }
        }
      })
  }

  const handleUserLogin = (e: React.FormEvent, formData: IUser): void => {
    e.preventDefault()

    const login = userLogin(formData)
      .then( ({ status, data }) => {
        if (status === 200) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          window.location.reload()
        }
    })

    toast.promise(login, {
      error: {
        render({data}){
          return `Login failed: ${data.message}`
        }
      }
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload();
  }
  const [alreadyLogin, userName] = checkLoginStatus()

  if ( alreadyLogin === false) {
    return (
      <main className='App'>
        <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} newestOnTop={false}/>
        <h1>Hilton Reservation</h1>
        <UserLogin userLogin={handleUserLogin} />
      </main>
    )
  }

  return (
    <main className='App'>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} newestOnTop={false}/>
      <h1>Hi, {userName}! </h1>
      <h2>Welcome to Hilton Reservation</h2>
      <AddReservation saveReservation={handleSaveReservation} />
      {reservations.map((reservation: IReservation) => (
        <Reservation
          key={reservation._id}
          updateReservation={handleUpdateReservation}
          deleteReservation={handleDeleteReservation}
          reservation={reservation}
        />
      ))}
      <div className='BottomBar'><a onClickCapture={logout}>logout</a></div>
    </main>
  )
}

export default App;
