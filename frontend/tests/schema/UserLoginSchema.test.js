import UserLoginSchema from '../../src/schema/UserLoginSchema'

describe('UserLoginSchema', () => {
  it('fails when fields are empty', async () => {
    const invalidData = {}
    await expect(UserLoginSchema.validate(invalidData)).rejects.toThrow(
      'Password is required'
    )
  })

  it('fails with missing username', async () => {
    const invalidData = { password: 'validPass123' }
    await expect(UserLoginSchema.validate(invalidData)).rejects.toThrow(
      'Username is required'
    )
  })

  it('fails with missing password', async () => {
    const invalidData = { username: 'validUser' }
    await expect(UserLoginSchema.validate(invalidData)).rejects.toThrow(
      'Password is required'
    )
  })

  it('fails when username is too short', async () => {
    const invalidData = { username: 'abc', password: 'validPass123' }
    await expect(UserLoginSchema.validate(invalidData)).rejects.toThrow(
      'Username must be at least 6 characters'
    )
  })

  it('fails when password is too short', async () => {
    const invalidData = { username: 'validUser', password: 'short' }
    await expect(UserLoginSchema.validate(invalidData)).rejects.toThrow(
      'Password must be at least 8 characters'
    )
  })
  it('fails when username is too large', async () => {
    const invalidData = {
      username: '012345678901234567890123',
      password: 'validPassword',
    }
    await expect(UserLoginSchema.validate(invalidData)).rejects.toThrow(
      'Username must be at most 20 characters'
    )
  })

  it('passes with valid data', async () => {
    const validData = { username: 'validUser', password: 'validPass123' }
    await expect(UserLoginSchema.validate(validData)).resolves.toBeTruthy()
  })
})
