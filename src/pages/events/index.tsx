import EventList from '@/components/events/event-list';
import { getAllEvents } from '@/fake-data';

export default function AllEventsPage() {
  const events = getAllEvents();

  return (
    <div>
      <EventList events={events} />
    </div>
  );
}
