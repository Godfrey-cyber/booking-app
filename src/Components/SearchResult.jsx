import React from 'react'
import { Link } from "react-router-dom"

const SearchResult = ({ item }) => {
  return (
      <div className="searchItem">
          <img src="https://images.pexels.com/photos/587839/pexels-photo-587839.jpeg?auto=compress&cs=tinysrgb&w=600" className="img object-fit" alt="" />
          <div className="siDesc">
              <h1 className="siTitle">{item.name}</h1>
              <span className="distance">{item.distance}m from the center</span>
              <span className="taxiOp">Free Airport Taxi</span>
              <span className="subTitle">Studio Apartment with air conditioning</span>
              <span className="features">{item.description}</span>
              <span className="cancelation">Free cancelation</span>
              <span className="cancelLater">You can cancel later so lock in this great price today</span>
          </div>
          <div className="details">
            {item.rating && <div className="rating">
                <span className="excellent">Excellent</span>
                <button className="btn-rating">{item.rating}</button>
            </div>}
            <div className="details-text">
                <span className="price">${item.cheapestPrice}</span>
          <span className="tax">include Taxes & fees</span>
          <Link to={`/hotels/${item._id}`}>
              <button className="btn-detail">See More...</button>
            </Link>
            </div>
          </div>
    </div>
  )
}

export default SearchResult