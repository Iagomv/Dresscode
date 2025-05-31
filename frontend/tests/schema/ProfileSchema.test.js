import {
  profileChangeSchema,
  passwordChangeSchema,
} from '../../src/schema/ProfileSchema'

describe('profileChangeSchema', () => {
  it('fails when all fields are empty', async () => {
    await expect(profileChangeSchema.validate({})).rejects.toThrow('Required')
  })

  it('fails with short username', async () => {
    const data = {
      username: 'abc',
      password: 'Valid123!',
      email: 'user@example.com',
    }
    await expect(profileChangeSchema.validate(data)).rejects.toThrow()
  })

  it('fails with invalid password (missing special char)', async () => {
    const data = {
      username: 'validUser',
      password: 'Password1',
      email: 'user@example.com',
    }
    await expect(profileChangeSchema.validate(data)).rejects.toThrow(
      'Password must contain'
    )
  })

  it('fails with invalid email', async () => {
    const data = {
      username: 'validUser',
      password: 'Password1!',
      email: 'invalidEmail',
    }
    await expect(profileChangeSchema.validate(data)).rejects.toThrow(
      'Invalid email'
    )
  })

  it('passes with valid data', async () => {
    const data = {
      username: 'validUser',
      password: 'StrongP@ss1',
      email: 'user@example.com',
    }
    await expect(profileChangeSchema.validate(data)).resolves.toBeTruthy()
  })
})

describe('passwordChangeSchema', () => {
  it('fails when all fields are empty', async () => {
    await expect(passwordChangeSchema.validate({})).rejects.toThrow('Required')
  })

  it('fails when newPassword and confirmPassword don’t match', async () => {
    const data = {
      currentPassword: 'CurrentP@ss1',
      newPassword: 'NewP@ss1!',
      confirmPassword: 'WrongP@ss1!',
    }
    await expect(passwordChangeSchema.validate(data)).rejects.toThrow(
      'Passwords must match'
    )
  })

  it('fails when newPassword is same as currentPassword', async () => {
    const data = {
      currentPassword: 'SameP@ss1',
      newPassword: 'SameP@ss1',
      confirmPassword: 'SameP@ss1',
    }
    await expect(passwordChangeSchema.validate(data)).rejects.toThrow(
      'New password must be different from current password'
    )
  })

  it('fails with weak new password', async () => {
    const data = {
      currentPassword: 'CurrentP@ss1',
      newPassword: 'weakpass',
      confirmPassword: 'weakpass',
    }
    await expect(passwordChangeSchema.validate(data)).rejects.toThrow(
      'Password must contain'
    )
  })

  it('passes with valid and different passwords', async () => {
    const data = {
      currentPassword: 'OldP@ss1!',
      newPassword: 'NewP@ss1!',
      confirmPassword: 'NewP@ss1!',
    }
    await expect(passwordChangeSchema.validate(data)).resolves.toBeTruthy()
  })
})
