export const formatImageUrl = (url) => {
  const replacedImages = url.replace('/images/', '/uploads/')
  // const fullUrl = `${import.meta.env.VITE_IMAGES_URL}${replacedImages}`
  return replacedImages
}
