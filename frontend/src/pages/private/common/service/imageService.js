import ApiConfig from '../../../../api/ApiConfig'

const imageService = {
  uploadImage: async () => {
    return await ApiConfig.uploadImage()
  },
}

export default imageService
