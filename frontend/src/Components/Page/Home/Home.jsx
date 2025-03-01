import React from 'react'
import Header from '../../Common/Layout/Header/Header'
import HomeCarsoul from './HomeCarsoul/HomeCarsoul'
import Laptop from './Laptop/Laptop'
import  Choose from './Choose/Choose'
import Mobile from './Mobile/Mobile'
import Parallex from './Parallex/Parallex'
import Headset from './Headset/Headset'
import Footer from '../../Common/Layout/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <HomeCarsoul/>
        <Laptop/>
        <Choose/>
        <Mobile/>
        <Parallex/>
        <Headset/>
        <Footer/>
      
    </div>
  )
}


export default Home
