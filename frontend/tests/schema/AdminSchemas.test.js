import { editUserSchema } from '../../src/schema/AdminSchemas'
import { createUserSchema } from '../../src/schema/AdminSchemas'

describe('editUserSchema', () => {
  it('fails when all fields are empty', async () => {
    const data = {}
    await expect(editUserSchema.validate(data)).rejects.toThrow(
      'Role is required'
    )
  })

  it('fails with short username', async () => {
    const data = { username: 'abc', email: 'test@example.com', role: 'USER' }
    await expect(editUserSchema.validate(data)).rejects.toThrow(
      'Username must be at least 6 characters'
    )
  })

  it('fails with long username', async () => {
    const data = {
      username: 'a'.repeat(21),
      email: 'test@example.com',
      role: 'USER',
    }
    await expect(editUserSchema.validate(data)).rejects.toThrow(
      'Username cannot be more than 20 characters'
    )
  })

  it('fails with invalid email', async () => {
    const data = { username: 'validUser', email: 'invalid-email', role: 'USER' }
    await expect(editUserSchema.validate(data)).rejects.toThrow(
      'Invalid email address'
    )
  })

  it('fails with missing role', async () => {
    const data = { username: 'validUser', email: 'test@example.com' }
    await expect(editUserSchema.validate(data)).rejects.toThrow(
      'Role is required'
    )
  })

  it('fails with invalid role', async () => {
    const data = {
      username: 'validUser',
      email: 'test@example.com',
      role: 'GUEST',
    }
    await expect(editUserSchema.validate(data)).rejects.toThrow('Invalid role')
  })

  it('passes with valid data', async () => {
    const data = {
      username: 'validUser',
      email: 'test@example.com',
      role: 'ADMIN',
    }
    await expect(editUserSchema.validate(data)).resolves.toBeTruthy()
  })
})

describe('createUserSchema', () => {
  it('fails when all fields are empty', async () => {
    const data = {}
    await expect(createUserSchema.validate(data)).rejects.toThrow(
      'Password is required'
    )
  })

  it('fails with weak password', async () => {
    const data = {
      username: 'validUser',
      email: 'test@example.com',
      role: 'ADMIN',
      password: 'password',
    }
    await expect(createUserSchema.validate(data)).rejects.toThrow(
      'Password must contain at least one uppercase, lowercase, number, and special character'
    )
  })

  it('fails with short password', async () => {
    const data = {
      username: 'validUser',
      email: 'test@example.com',
      role: 'ADMIN',
      password: 'Ab1!',
    }
    await expect(createUserSchema.validate(data)).rejects.toThrow(
      'Password must be at least 8 characters'
    )
  })

  it('fails with invalid role', async () => {
    const data = {
      username: 'validUser',
      email: 'test@example.com',
      role: 'MANAGER',
      password: 'Valid123!',
    }
    await expect(createUserSchema.validate(data)).rejects.toThrow(
      'Invalid role'
    )
  })

  it('passes with valid data', async () => {
    const data = {
      username: 'validUser',
      email: 'test@example.com',
      role: 'TECHNICIAN',
      password: 'Valid123!',
    }
    await expect(createUserSchema.validate(data)).resolves.toBeTruthy()
  })
})
