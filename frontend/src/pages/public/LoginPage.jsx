import React, { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { LoginForm } from '../../components/public/login/LoginForm.jsx'
import { SignUpForm } from '../../components/public/login/SignUpForm.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTranslation } from 'react-i18next'

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation('loginRegister')

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  useEffect(() => {
    if (auth?.token) {
      navigate('/', { replace: true })
    }
  }, [auth, navigate])

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Card style={{ minWidth: '450px' }} className="shadow-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4">{t('title')}</Card.Title>
          {isLogin ? <LoginForm /> : <SignUpForm toggleForm={toggleForm} />}
          <div className="text-center mt-3">
            <Button variant="link" onClick={toggleForm}>
              {isLogin ? t('createAnAccount') : t('alreadyHaveAnAccount')}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
