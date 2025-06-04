import React from 'react'
import { TopNavigation } from './TopNavigation'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { COLORS, FONT_FAMILY } from '../constants/theme'

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100 mx-auto">
      <TopNavigation />
      <div className="m-5 d-flex m-auto">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme="light"
        style={{
          marginTop: '4rem',
          zIndex: 10000,
          fontFamily: FONT_FAMILY,
        }}
        toastStyle={{
          borderRadius: '4px',
          border: `1px solid ${COLORS.border}`,
        }}
      />
      <Footer />
    </div>
  )
}

export default Layout
