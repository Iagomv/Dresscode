import React from 'react'
import { TopNavigation } from './TopNavigation'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { COLORS, FONT_FAMILY } from '../constants/theme'

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <TopNavigation />

      {/* Page Content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ paddingTop: '60px' }}>
        <Outlet />
      </main>

      {/* Toast Notifications */}
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
