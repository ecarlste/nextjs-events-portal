import { useRouter } from 'next/router';

export default function EventDetailPage() {
  const router = useRouter();
  const { eventId } = router.query;

  return (
    <div>
      <h1>Event detail page for eventId: {eventId}</h1>
    </div>
  );
}
