import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/fake-data';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export default function FilteredEventsPage() {
  const router = useRouter();

  const filteredData = router.query.slug;

  console.log(filteredData);

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the specified filter...</p>
        </ErrorAlert>
        <Button link="/">Show All Events</Button>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}
