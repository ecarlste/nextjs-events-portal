import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/fake-data';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}
