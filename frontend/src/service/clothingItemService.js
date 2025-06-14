import ApiConfig from '../api/ApiConfig'

export const clothingItemService = {
  fetchClothingItems: async () => {
    return await ApiConfig.getAllClothingItems()
  },

  requestLoan: async (loanRequestDto) => ApiConfig.requestLoan(loanRequestDto),

  searchClothingItems: async (searchDto) => ApiConfig.searchClothingItems(searchDto),
  createClothingItem: async (itemData) => {
    const { image, name } = itemData
    if (!image) return await ApiConfig.createClothingItem(itemData)

    const imageUrl = await ApiConfig.uploadImage(image, name, import.meta.env.VITE_IMAGE_DIR_CLOTHING)
    return await ApiConfig.createClothingItem({ ...itemData, imageUrl })
  },

  updateClothingItem: async (id, itemData) => {
    const { image, name } = itemData
    let updatedItemData = { ...itemData }

    // If the user uploaded a new file:
    if (image && image instanceof File) {
      const imageUrl = await ApiConfig.uploadImage(image, name, import.meta.env.VITE_IMAGE_DIR_CLOTHING)
      updatedItemData.imageUrl = imageUrl
    }

    // If the user wants to remove the image:
    if (image === null) {
      updatedItemData.imageUrl = null
    }

    // Either way, we don't want to send the raw File object:
    delete updatedItemData.image

    return await ApiConfig.updateClothingItem(id, updatedItemData)
  },

  deleteClothingItem: async (id) => {
    return await ApiConfig.deleteClothingItem(id)
  },
}
