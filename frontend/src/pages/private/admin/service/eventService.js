import ApiConfig from '../../../../api/ApiConfig'
const eventService = {
  fetchEvents: async () => {
    return await ApiConfig.getAllEvents()
  },

  createEvent: async (eventData) => {
    const { image } = eventData
    const { title } = eventData
    if (!image) return await ApiConfig.createEvent(eventData)

    const imageUrl = await ApiConfig.uploadImage(image, title)
    return ApiConfig.createEvent({ ...eventData, imageUrl })
  },

  updateEvent: async (id, eventData) => {
    const { image, title } = eventData
    let updatedEventData = { ...eventData }

    // If the user uploaded a new file:
    if (image && image instanceof File) {
      const imageUrl = await ApiConfig.uploadImage(image, title)
      updatedEventData.imageUrl = imageUrl
    }

    // If the user wants to remove the image:
    if (image === null) {
      updatedEventData.imageUrl = null
    }

    // Either way, we don't want to send the raw File object:
    delete updatedEventData.image

    return await ApiConfig.updateEvent(id, updatedEventData)
  },

  deleteEvent: async (id) => {
    return await ApiConfig.deleteEvent(id)
  },
}

export default eventService
