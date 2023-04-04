import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import Event from '@/models/event';

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);
  const router = useRouter();
  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-events-portal-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    console.log(`inside useEffect`);
    if (data) {
      const events: Event[] = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents || !filteredData) {
    return <p className="center">Loading...</p>;
  }

  if (error) {
    return <p className="center">Error loading data...</p>;
  }

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the specified filter...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}
