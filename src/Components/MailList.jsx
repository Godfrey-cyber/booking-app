import React from 'react'

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mail_title">Save time, save Money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you'</span>
      <div className="mailInputContainer">
        <input type="text" name="" placeholder="Your Email" id="" className="input" />
        <button className="subscribe" type="submit">Subscribe</button>
      </div>
    </div>
  )
}

export default MailList