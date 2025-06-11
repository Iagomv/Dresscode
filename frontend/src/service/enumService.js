import ApiConfig from '../api/ApiConfig'

export const enumService = {
  fetchClothingItemEnums: async () => ApiConfig.getAllClothingEnums(),
}
