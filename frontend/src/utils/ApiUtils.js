import { toast } from 'react-toastify'

export const performApiAction = async (apiCall, { successMessage, errorMessage, onSuccess, setLoading }) => {
  setLoading(true)
  try {
    const result = await apiCall()
    if (successMessage) toast.success(successMessage)
    if (onSuccess) onSuccess(result)
    return result
  } catch (err) {
    console.log(err)
    toast.error(errorMessage + '\n' + (err?.response?.data?.message || ''))
    throw err // re-throw in case caller wants to catch
  } finally {
    setLoading(false)
  }
}
