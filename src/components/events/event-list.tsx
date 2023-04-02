import EventItem from './event-item';

import classes from './event-list.module.css';

function EventList(props: any) {
  const { events } = props;
  const eventList = events.map((event: any) => (
    <EventItem
      key={event.id}
      id={event.id}
      title={event.title}
      location={event.location}
      date={event.date}
      image={event.image}
    />
  ));

  return <ul className={classes.list}>{eventList}</ul>;
}

export default EventList;
