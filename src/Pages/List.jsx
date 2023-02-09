import React from 'react'
import Navbar from "../Components/Navbar"
import Header from "../Components/Header"
import { useState } from "react"
import { format } from "date-fns"
import { useLocation } from "react-router-dom"
import { DateRange } from 'react-date-range'
import SearchResult from '../Components/SearchResult'
import useFetch from '../utilities/useFetch'

const List = () => {
  const location = useLocation()
  // const [place, setPlace] = useState("")
  const [destination, setDestination] = useState(location.state.destination)
  const [options, setOptions] = useState(location.state.options)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [max, setMax] = useState(undefined)
  const [min, setMin] = useState(undefined)
  const { data1, error, loading, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = () => {
    reFetch()
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            {/* <h2 className="lsTitle">Search</h2> */}
            <div className="lsItem">
              <label className="label" htmlFor="Date">Destination</label>
              <input className="h-[35px] border-0 p-[5px] rounded-sm" onChange={event => setDestination(event.target.value)} type="text" name="" id="" placeholder={location.state.destination} />
            </div>
            <div className="lsItem">
              <label className="label" htmlFor="Check-in Date">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)} className="checkIn">{`${format(dates[0].startDate, "MMM d, y")} to ${format(dates[0].endDate, "MMM d, y")}`}</span>
              {openDate && (
                <DateRange
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />)}
            </div>
            <div className="lsItem">
              <label className="label" htmlFor="Destination">Options</label>
              <div className="lsOptions">
              <div className="max-options">
                <div className="flex">
                <span className="optionText">
                  Min Price <small> Per Night</small>
                </span>
                    <input type="number" min={1} onChange={event => setMin(event.target.value)} className="optionInput" id="" />
                    </div>
                    <div className="flex">
                  <span className="optionText">
                  Max Price <small> Per Night</small>
                </span>
                  <input type="number" min={1} onChange={event => setMax(event.target.value)} className="optionInput" id="" />
                  </div>
              </div>
              <div className="lsOptionItem">
                <span className="optionText">
                  Adult
                </span>
                  <input type="number" min={1} className="optionInput" placeholder={options.adult} id="" />
              </div>
              <div className="lsOptionItem">
                <span className="optionText">
                  Children
                </span>
                  <input type="number" min={0} className="optionInput" placeholder={options.children} id="" />
              </div>
              <div className="lsOptionItem">
                <span className="optionText">
                  Room
                </span>
                  <input type="number" min={1} className="optionInput" placeholder={options.rooms} id="" />
                </div>
                </div>
            </div>
            <button onClick={handleClick} className="searchBtn">Search</button>
          </div>
          <div className="listResult">
            {loading ? ("Loading. Please wait") : (
              <>
                {data1.map(item => (
                  <SearchResult item={item} key={item._id}/>
                ))}
            </>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List