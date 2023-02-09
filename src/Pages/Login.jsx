import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [credentials, setCredentials] = useState(
        {
            username: undefined,
            password: undefined
        }
    )
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = (event) => {
        setCredentials(prev => ({...prev, [event.target.id]: event.target.value}))
    }
    const handleClick = async (event) => {
        event.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }
    }
    console.log(user)
  return (
      <div className="login">
          <div className="login_container">
              <input type="text" className="login_input" id="username" placeholder="Username eg, John" onChange={handleChange} />
              <input type="password" className="login_input" id="password" placeholder="*******" onChange={handleChange} />
              <button className="login_button" disabled={loading} onClick={handleClick}>{loading ? "Logging In" : "Login"}</button>
              {error && <span className="login_error">{error.message}</span>}
          </div>
    </div>
  )
}

export default Login