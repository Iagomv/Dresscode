import React from 'react'
import { LandingCard } from '../../../../components/private/student/LandingCard'
import { useHome } from './useHome'
export const StudentHome = () => {
  const { classesTitle, classesImage, clothingTitle, clothingImage, classesLink, clothingLink } = useHome()
  return (
    <div className="">
      <div className="d-flex align-items-center justify-content-center gap-4">
        <LandingCard image={classesImage} title={classesTitle} link={classesLink} />
        <LandingCard image={clothingImage} title={clothingTitle} link={clothingLink} />
      </div>
    </div>
  )
}
