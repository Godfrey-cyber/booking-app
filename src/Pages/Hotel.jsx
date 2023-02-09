import React, { useContext } from 'react'
import Navbar from "../Components/Navbar"
import Header from "../Components/Header"
import MailList from "../Components/MailList"
import Footer from "../Components/Footer"
import Reserve from "../Components/Reserve"
// import { data } from "../utilities/utiles"
import { faChevronLeft, faChevronRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router"
import useFetch from '../utilities/useFetch'
import { SearchContext } from '../context/searchContext'
import { AuthContext } from '../context/authContext'

const Hotel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const hotelId = location.pathname.split("/")[2]
  const { data1, loading, error } = useFetch(`/hotels/find/${hotelId}`)
  console.log(data1)
  const [sliderNum, setSliderNum] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = (index) => {
    setSliderNum(index)
    setOpen(true)
  }
   const { user } = useContext(AuthContext)
   const { dates, options } = useContext(SearchContext)
  console.log(dates)
  const MILLISECONDS_PER_DAY = 24*3600*1000
  function dateFunction(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }
  const days = dateFunction(dates[0]?.endDate, dates[0]?.startDate)
  const handleMove = (direction) => {
    let newSlideNum
    if (direction === "l") {
      newSlideNum = sliderNum === 0 ? 5 : sliderNum - 1
    } else {
      newSlideNum = sliderNum === 5 ? 0 : sliderNum + 1
    }
    setSliderNum(newSlideNum)
  }
  return (
    <section>
      <Navbar />
      <Header type="list" />
      {loading ? ("Loading") : (
      <>
        <div className="hotel_container">
        {/* slider Image */}
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} className="close" />
          <FontAwesomeIcon icon={faChevronLeft} className="arrow" onClick={() => handleMove("l")}/>
          <div className="slider_wrapper">
            <img className="slider_img object-cover"src={data1.photos[sliderNum]} alt="" />
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="arrow" onClick={() => handleMove("r")} />
        </div>}
        <div className="hotel_wrapper">
          <button className="book_now" onClick={handleClick}>Reserve Now</button>
          <h2 className="hotel_title">{data1.name}</h2>
          <div className="hotel_address">
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="address">{data1.address}</span>
          </div>
            <span className="hotel_location">Excellent Location {data1.distance}m from the center</span>
            <span className="hotel_price">{`Book a stay over $${data1.cheapestPrice} and enjoy free airport taxi`}</span>
            <div className="hotel_images">
              {data1.photos?.map((img, index) => (
                <div className="hotelimg_wrapper">
                  <img onClick={() => handleOpen(index)} src={img} className="hotel_img object-cover" alt="" />
                </div>
              ))}
            </div>
            <div className="hotel_details">
              <div className="hotel_text">
                <h2 className="hotel_title">{data1.title}</h2>
                <p className="hotel_desc">{data1.desc}</p>
              </div>
              <div className="hotel_price-detail">
                <h2 className="small-title">Perfect for a {days}-night stay</h2>
                <span className="price_span">Located at the heart of Nairobi, this plce has an excellent score of 9.8</span>
                <h2 className="price_title">
                  <b>$ {days * data1.cheapestPrice * options.rooms}</b> ({days} nights)
                </h2>
                <button className="price_btn" onClick={handleClick}>Book Now</button>
              </div>
            </div>
        </div>
        <MailList />
        <Footer />
          </div>
        </>
      )}
        {openModal && <Reserve setOpenModal={setOpenModal} hotelId={hotelId}/>}
    </section>
  )
}

export default Hotel