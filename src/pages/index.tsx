import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/helpers/api-util';

export default function HomePage(props: any) {
  return (
    <div>
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
