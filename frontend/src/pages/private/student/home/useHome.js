//TODO fetch needed data to display notifications or resume and return it to Home
import { useTranslation } from 'react-i18next'
import { PATHS } from '../../../../constants/routes'
export const useHome = () => {
  const { t } = useTranslation('student')
  const classesTitle = t('content.static.clases.title')
  const classesImage = t('content.static.clases.image')
  const clothingTitle = t('content.static.vestuario.title')
  const clothingImage = t('content.static.vestuario.image')
  const classesLink = PATHS.dresscode.student.classes
  const clothingLink = PATHS.dresscode.student.clothing

  return { classesTitle, classesImage, clothingTitle, clothingImage, classesLink, clothingLink }
}
