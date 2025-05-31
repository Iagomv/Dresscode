import { userRegistrationSchema } from '../../src/schema/UserRegistrationSchema'

describe('userRegistrationSchema', () => {
  it('fails when all fields are empty', async () => {
    await expect(userRegistrationSchema.validate({})).rejects.toThrow(
      'Confirm Password is required'
    )
  })

  it('fails when username is too short', async () => {
    const data = {
      username: 'abc',
      email: 'user@example.com',
      password: 'Valid123!',
      confirmPassword: 'Valid123!',
    }
    await expect(userRegistrationSchema.validate(data)).rejects.toThrow(
      'Username must be at least 6 characters'
    )
  })

  it('fails when email is invalid', async () => {
    const data = {
      username: 'validUser',
      email: 'not-an-email',
      password: 'Valid123!',
      confirmPassword: 'Valid123!',
    }
    await expect(userRegistrationSchema.validate(data)).rejects.toThrow(
      'Invalid email address'
    )
  })

  it('fails when password is too weak', async () => {
    const data = {
      username: 'validUser',
      email: 'user@example.com',
      password: 'weakpass',
      confirmPassword: 'weakpass',
    }
    await expect(userRegistrationSchema.validate(data)).rejects.toThrow(
      'Password must contain'
    )
  })

  it('fails when confirmPassword does not match password', async () => {
    const data = {
      username: 'validUser',
      email: 'user@example.com',
      password: 'StrongP@ss1',
      confirmPassword: 'WrongP@ss1',
    }
    await expect(userRegistrationSchema.validate(data)).rejects.toThrow(
      'Passwords must match'
    )
  })

  it('passes when all fields are valid', async () => {
    const data = {
      username: 'validUser',
      email: 'user@example.com',
      password: 'StrongP@ss1',
      confirmPassword: 'StrongP@ss1',
    }
    await expect(userRegistrationSchema.validate(data)).resolves.toBeTruthy()
  })
})
