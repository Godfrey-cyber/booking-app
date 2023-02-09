import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { SearchContext } from "../context/searchContext"
import { AuthContext } from '../context/authContext';
const Header = ({type}) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    // date selection
    const [dates, setDates] = useState([
        {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
        }
    ])
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOption] = useState({
        adult: 1,
        children: 0,
        rooms: 1
    })
    const navigate = useNavigate()
    const handleOption = (name, operation) => {
        setOption((prev) => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }
    const { dispatch } = useContext(SearchContext)
    const { user } = useContext(AuthContext)
    const handleSearch = () => {
        dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
        navigate("/hotels/list", {state: {destination, dates, options}})
    }
  return (
    <div className="bg-red-400 text-white flex justify-center relative">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="flex gap-[40px]">
              <div className="items-center flex gap-[10px] group cursor-pointer active">
                  <FontAwesomeIcon className="group-hover:text-amber-400" icon={faBed} />
                  <span className="header_span">Stays</span>
              </div>
              <div className="items-center flex gap-[10px] group cursor-pointer">
                  <FontAwesomeIcon className="group-hover:text-amber-400" icon={faPlane} />
                  <span className="header_span">Flights</span>
              </div>
              <div className="items-center flex gap-[10px] group cursor-pointer">
                  <FontAwesomeIcon className="group-hover:text-amber-400" icon={faCar} />
                  <span className="header_span">Car Rentals</span>
              </div>
              <div className="items-center flex gap-[10px] group cursor-pointer">
                  <FontAwesomeIcon className="group-hover:text-amber-400" icon={faBed} />
                  <span className="header_span">Attractions</span>
              </div>
              <div className="items-center flex gap-[10px] group cursor-pointer">
                  <FontAwesomeIcon className="group-hover:text-amber-400" icon={faTaxi} />
                  <span className="header_span">Airport Taxis</span>
                </div>
              </div>
              { type !== "list" &&
                <>
                <h1 className="text-white font-bold text-3xl my-2 font-['Montserrat']">A lifetime of discounts. Its genious</h1>
                <p className="font-['Montserrat'] my-[20px] mx-[0px] text-lg font-semibold">Get rewarded for your travels - unlock instant savings of 10% or more  with a free Booking.com account</p>
               {!user && <button className="bg-white font-['Montserrat'] my-2 text-sm font-semibold text-red-500 rounded-2xl py-2 px-4 hover:bg-red-200 transition delay-300">Sign In/ Register</button>}
                {/* header search */}
                <div className="h-[45px] bg-white border-2 border-yellow-500 flex items-center justify-around py-[10px] px-[0px] rounded-[5px] absolute bottom-[-20px] w-full max-w-[1024px]">
                    <div className="searchitem">
                        {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                        <FontAwesomeIcon icon={faLocationDot} className="text-red-400 mr-2" />
                        <input className="input search-date focus:outline-0" placeholder="Destination" type="text" name="" id="" onChange={(e) => setDestination(e.target.value)} />
                    </div>
                    <div className="searchitem">
                        <FontAwesomeIcon icon={faCalendarDays} className="text-red-400 mr-2" />
                        <span onMouseOver={() => setOpenDate(!openDate)} className="search-date">{`${format(dates[0].startDate, "MMM d, y")} to ${format(dates[0].endDate, "MMM d, y")}`}</span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            minDate={new Date()}
                            className="absolute top-[50px] z-20"
                        />}
                    </div>
                    <div className="searchitem">
                        <FontAwesomeIcon icon={faPerson} className="text-red-400 mr-2" />
                        <span onClick={() => setOpenOptions(!openOptions)} className="search text-gray-600 text-sm font-['Montserrat'] font-semibold focus:transition delay-300 cursor-pointer hover:text-red-400">{`${options.adult} adult ${options.children} children ${options.rooms} room`}</span>
                        {openOptions && <div className="absolute top-[50px] bg-white text-gray-500 border rounded-[5px] ">
                            <div className="w-[200px] flex justify-between m-[10px]">
                                <div className="flex items-center justify-between w-full">
                                    <span className="adult text-sm font-['Montserrat'] font-bold">Adults</span>
                                    <div className="flex items-center text-gray-600 space-x-2">
                                        <button disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")} className="w-[30px] hover:rounded-full transition delay-200 h-[30px] border border-red-400 cursor-pointer bg-white text-red-400  text-sm font-['Montserrat'] font-bold">-</button>
                                        <span className="number  text-sm font-['Montserrat'] font-bold">{options.adult}</span>
                                        <button onClick={() => handleOption("adult", "i")} className="w-[30px] hover:rounded-full transition delay-200 h-[30px] border border-red-400 cursor-pointer bg-white text-red-400 text-sm font-['Montserrat'] font-bold">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[200px] flex justify-between m-[10px]">
                                <div className="flex items-center justify-between w-full">
                                    <span className="adult text-sm font-['Montserrat'] font-bold">Children</span>
                                    <div className="flex items-center text-gray-600 space-x-2">
                                        <button disabled={options.children <= 0} onClick={() => handleOption("children", "d")} className="w-[30px] hover:rounded-full transition delay-300 h-[30px] border border-red-400 cursor-pointer bg-white text-red-400  text-sm font-['Montserrat'] font-bold">-</button>
                                        <span className="number  text-sm font-['Montserrat'] font-bold">{options.children}</span>
                                        <button onClick={() => handleOption("children", "i")} className="w-[30px] hover:rounded-full transition delay-200 h-[30px] border border-red-400 cursor-pointer bg-white text-red-400 text-sm font-['Montserrat'] font-bold">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[200px] flex justify-between m-[10px]">
                                <div className="flex items-center justify-between w-full">
                                    <span className="adult text-sm font-['Montserrat'] font-bold">Rooms</span>
                                    <div className="flex items-center text-gray-600 space-x-2">
                                        <button disabled={options.rooms <= 1} onClick={() => handleOption("rooms", "d")} className="w-[30px] hover:rounded-full transition delay-200 h-[30px] border border-red-400 cursor-pointer bg-white text-red-400 text-sm font-['Montserrat'] font-bold">-</button>
                                        <span className="number text-sm font-['Montserrat'] font-bold">{options.rooms}</span>
                                        <button onClick={() => handleOption("rooms", "i")} className="w-[30px] hover:rounded-full transition delay-200 h-[30px] border border-red-400 cursor-pointer bg-white text-red-400 text-sm font-['Montserrat'] font-bold">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="searchitem">
                        <button className="bg-red-400 text-white px-4 py-1 rounded font-['Montserrat'] font-semibold" type="submit" onClick={handleSearch}>Search</button>
                    </div>
              </div>
                </>}
        </div>
    </div>
  )
}

export default Header