import React from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import Featured from "../Components/Featured"
import Destinations from '../Components/Destinations'
import MailList from '../Components/MailList'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Header />
      <div className="featured">
        <Destinations />
        <Featured />
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Home