import Navbar from "./NavBar"
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "./Footer"

const BodyContainer = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
      

    </div>
  )
}

export default BodyContainer
