import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { EventCard } from './EventCard'
import config from '../../../../config.json'

export const EventList = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = config.events.pagination.limit

  const sortedEvents = [...events].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))

  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage)
  const startIndex = (currentPage - 1) * eventsPerPage
  const currentEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="row">
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    </>
  )
}
