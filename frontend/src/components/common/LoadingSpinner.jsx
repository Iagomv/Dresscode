import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="text-center">
        <Spinner data-testid="technician-spinner" animation="border" role="status" variant="primary" aria-live="polite">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div className="mt-2">Loading...</div>
      </div>
    </div>
  )
}

export default LoadingSpinner
