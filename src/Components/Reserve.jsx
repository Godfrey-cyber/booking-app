import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useContext } from 'react'
import useFetch from '../utilities/useFetch'
import axios from "axios"
import {SearchContext} from "../context/searchContext"
import { useNavigate } from 'react-router'

const Reserve = ({ setOpenModal, hotelId }) => {
    const { data1, loading, error } = useFetch(`/hotels/rooms/${hotelId}`)
    const { dates } = useContext(SearchContext)
    const [selectedRooms, setSelectedRooms] = useState([])
    const navigate = useNavigate()
    console.log(data1)
    const handleSelect = (event) => {
        const checked = event.target.checked
        const value = event.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map((roomId) => {
                const res = axios.put(`/rooms/availability/${roomId}`, { dates: allDates })
                return res.data
            }))
            setOpenModal(false)
            navigate("/")
        } catch (error) {
            
        }
    }
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }

    console.log(selectedRooms)
    const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate)
    console.log(allDates)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime())
        )
        return !isFound
    }
  return (
      <div className="reserve_modal">
          <div className="reserve_container">
              <FontAwesomeIcon icon={faCircleXmark} className="close_reserve" onClick={() => setOpenModal(false)} />
              <span className="select_rooms">Select Rooms:</span>
              {data1.map(item => (
                  <div key={item._id} className="room_item">
                      <div className="room_info">
                          <div className="room_title">{item.title}</div>
                          <div className="room_desc">{item.desc}</div>
                          <div className="room_max">
                              Max People: <b>{item.maxPeople}</b>
                          </div>
                          <div className="room_price">$ {item.price} Inclusive</div>
                      </div>
                      <div className="room">
                          {item.roomNumbers.map(roomNumber => (
                          <div key={roomNumber._id} className="select_room">
                              <label htmlFor="roomNumber">{roomNumber.number}</label>
                              <input className="check_box" type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                          </div>
                          ))}
                      </div>
                      <hr />
                  </div>
              ))}
              <button className="btn-detail" onClick={handleClick}>Reserve Now</button>
          </div>
    </div>
  )
}

export default Reserve