import React from 'react'

export const EventsHeader = ({ title, description }) => {
  return (
    <header className="text-center mb-5 events-header">
      <h1 className="events-title">{title}</h1>
      <p className="events-description">{description}</p>
    </header>
  )
}
