import IncidentRegistrationSchema from '../../src/schema/IncidentRegistrationSchema'

describe('IncidentRegistrationSchema', () => {
  it('fails when all fields are empty', async () => {
    const data = {}
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow(
      'Status is required'
    )
  })

  it('fails when title is too short', async () => {
    const data = {
      title: 'abc',
      description: 'A valid description.',
      category: 'SOFTWARE',
      priority: 'MEDIUM',
      status: 'OPEN',
    }
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow(
      'Title must be at least 5 characters'
    )
  })

  it('fails when title is too long', async () => {
    const data = {
      title: 'a'.repeat(101),
      description: 'A valid description.',
      category: 'HARDWARE',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
    }
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow(
      'Title must be at most 100 characters'
    )
  })

  it('fails when description is too long', async () => {
    const data = {
      title: 'A valid title',
      description: 'a'.repeat(501),
      category: 'OTHER',
      priority: 'LOW',
      status: 'CLOSED',
    }
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow(
      'Description must be at most 500 characters'
    )
  })

  it('fails with invalid category', async () => {
    const data = {
      title: 'Valid Title',
      description: 'Valid description',
      category: 'NETWORK',
      priority: 'LOW',
      status: 'OPEN',
    }
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow()
  })

  it('fails with invalid priority', async () => {
    const data = {
      title: 'Valid Title',
      description: 'Valid description',
      category: 'SOFTWARE',
      priority: 'CRITICAL',
      status: 'OPEN',
    }
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow()
  })

  it('fails with invalid status', async () => {
    const data = {
      title: 'Valid Title',
      description: 'Valid description',
      category: 'SOFTWARE',
      priority: 'MEDIUM',
      status: 'DELAYED',
    }
    await expect(IncidentRegistrationSchema.validate(data)).rejects.toThrow()
  })

  it('passes with valid data', async () => {
    const data = {
      title: 'Valid incident title',
      description: 'Everything broke and nothing works. Please help.',
      category: 'HARDWARE',
      priority: 'HIGH',
      status: 'OPEN',
    }
    await expect(
      IncidentRegistrationSchema.validate(data)
    ).resolves.toBeTruthy()
  })
})
