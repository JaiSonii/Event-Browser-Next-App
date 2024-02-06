import { useRouter } from "next/router"
import { getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Button from "../../components/ui/button";
import { Fragment } from "react";
import ErrorAlert from "../../components/error-alert/error-alert";


const SpecificEvent = () => {

  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <Fragment>
      <ErrorAlert>
      <p>No event Found</p>
      </ErrorAlert>
      <Button href="/events">Show All Events</Button>
      </Fragment>
    );
  }


  return (
    <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
  )
}

export default SpecificEvent