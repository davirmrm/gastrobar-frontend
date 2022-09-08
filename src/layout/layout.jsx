import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Header from './header'
import Footer from './footer'
import './layout.scss'
import './layout-color.css'
import { loged } from './redux/layoutActions'
import SidebarLeft from './sidebarLeft'
import SidebarRight from './sidebarRight'
import LogOut from './logout'
import { Alert } from '../components'

export default ({ children }) => {
  const dispatch = useDispatch()
  
  const [heigthHeader, setHeigthHeader] = useState(0)
  useEffect(() => {
    // setHeigthHeader(document.getElementById('box-header').offsetHeight)
  }, [])
  const heightApp = { height: `calc(100vh - ${heigthHeader}px)` }

  useEffect(()=> {
    dispatch(loged())
  }, [dispatch])

  return (
    <>
      <Alert />
      {/* <Header /> */}
      <div id='box-app' style={heightApp}>
        <SidebarLeft style={heightApp} />
        <section id='box-container' style={heightApp}>
          {children}
          <Footer />
        </section>
        <SidebarRight />
        <LogOut />
      </div>
    </>
  )
}
