
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
   const { user } = useContext(AuthContext)
   const navigate = useNavigate()
  return (
      <nav className="h-[50px] bg-red-400 flex justify-center">
          <div className="flex justify-between items-center w-full max-w-[1024px] text-white">
              <span className="font-semibold font-monserrat text-3xl text-white">Booking.com</span>
              {user ? user.username : (
              <div className="flex space-x-3 items-center">
                <button className="navbar_btn" onClick={() => navigate("/login")}>Login</button>
                <button className="navbar_btn" onClick={() => navigate("/register")}>Register</button>
              </div>
            )}
          </div>
      </nav>
    )
}

export default Navbar