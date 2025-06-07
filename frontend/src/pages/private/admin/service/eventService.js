import ApiConfig from '../../../../api/ApiConfig'
const eventService = {
  fetchEvents: async () => {
    return await ApiConfig.getAllEvents()
  },

  createEvent: async (eventData) => {
    const { image } = eventData
    if (!image) return await ApiConfig.createEvent(eventData)

    const imageUrl = await ApiConfig.uploadImage(image)
    return ApiConfig.createEvent({ ...eventData, imageUrl })
  },

  updateEvent: async (id, eventData) => {
    return await ApiConfig.updateEvent(id, eventData)
  },

  deleteEvent: async (id) => {
    return await ApiConfig.deleteEvent(id)
  },
}

export default eventService
