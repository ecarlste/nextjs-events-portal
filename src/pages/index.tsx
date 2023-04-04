import EventList from '@/components/events/event-list';
import NewsletterRegistration from '@/components/input/newsletter-registration';
import { getFeaturedEvents } from '@/helpers/api-util';
import Head from 'next/head';

export default function HomePage(props: any) {
  return (
    <div>
      <Head>
        <title>NextJS Events Portal</title>
        <meta
          name="description"
          content="A fun way to find events related to NextJS..."
        />
      </Head>
      <NewsletterRegistration />
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
