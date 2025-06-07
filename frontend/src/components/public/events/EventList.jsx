import { EventCard } from './EventCard'

export const EventList = ({ events }) => {
  // Sort events by eventDate in descending order
  const sortedEvents = [...events].sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))

  return (
    <div className="row">
      {sortedEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
