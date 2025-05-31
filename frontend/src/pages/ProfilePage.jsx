import React, { useState } from 'react'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import ProfileInfoForm from '../components/common/profile/ProfileInfoForm'
import PasswordChangeForm from '../components/common/profile/PasswordChangeForm'

const ProfilePage = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleSuccess = (msg) => {
    setMessage(msg)
    setError('')
    if (msg === 'Password changed successfully') {
      setShowPasswordForm(false)
    }
  }

  const handleClosePasswordForm = () => {
    setShowPasswordForm(false)
    setMessage('')
    setError('')
  }

  const handleError = (msg) => {
    setError(msg)
    setMessage('')
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xl={8} lg={10}>
          <div className="bg-white p-4 rounded-3 shadow-sm">
            <h2 className="mb-4 d-flex align-items-center gap-2">
              <span className="text-primary">👤 </span>
              User Profile
            </h2>

            {message && (
              <Alert variant="success" className="mb-4">
                {message}
              </Alert>
            )}
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            {showPasswordForm ? (
              <div className="mt-4 pt-4 border-top">
                <PasswordChangeForm onSuccess={handleSuccess} onError={handleError} onClose={handleClosePasswordForm} />
              </div>
            ) : (
              <>
                <ProfileInfoForm onSuccess={handleSuccess} onError={handleError} />
                <div className="mt-4 pt-3 border-top">
                  <Button
                    variant="outline-warning"
                    onClick={() => setShowPasswordForm(true)}
                    className="d-flex align-items-center gap-2"
                  >
                    🔑 Change Password
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage
