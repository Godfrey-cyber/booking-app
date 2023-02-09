import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/authContext'
import axios from "axios"

const Register = () => {
    const [userData, setuserData] = useState(
        {
            username: undefined,
            password: undefined,
            email: undefined
        }
    )
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = (event) => {
        setuserData(prev => ({...prev, [event.target.id]: event.target.value}))
    }
    const handleClick = async (event) => {
        event.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", userData)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }
    }
  return (
    <div className="login">
        <div className="login_container">
              <input type="text" className="login_input" id="username" placeholder="Username eg, John" onChange={handleChange} />
               <input type="email" className="login_input" id="email" placeholder="Username eg, John" onChange={handleChange} />
              <input type="password" className="login_input" id="password" placeholder="*******" onChange={handleChange} />
              <input type="password" className="login_input" id="password" placeholder="*******" onChange={handleChange} />
            <button className="login_button" onClick={handleClick}>{loading ? "Logging In" : "Login"}</button>
            {error && <span className="login_error">There was an error</span>}
        </div>
    </div>
  )
}

export default Register