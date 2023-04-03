import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/helpers/api-util';
import { Fragment } from 'react';

export default function FilteredEventsPage(props: {
  events: Event[];
  date: Date;
}) {
  const { events, date } = props;

  if (!events) {
    return <p className="center">Loading...</p>;
  }

  if (events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the specified filter...</p>
        </ErrorAlert>
        <Button link="/">Show All Events</Button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context: {
  params: { slug: string[] };
}) {
  const { params } = context;
  const filteredData = params.slug;

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  const events = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: { events, date: new Date(numYear, numMonth - 1) },
  };
}
