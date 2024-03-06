import Head from 'next/head';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import Button from "../../components/ui/button";
import { Fragment } from "react";
import ErrorAlert from "../../components/error-alert/error-alert";
import { getEventById, getFeaturedEvents} from "../../helpers/api-utils";


const SpecificEvent = (props) => {

  const event = props.selectedEvent;
  {console.log(event)}

  if (!event) {
    return (
      <Fragment>
      <ErrorAlert>
      <p>Loading</p>
      </ErrorAlert>
      <Button href="/events">Show All Events</Button>
      </Fragment>
    );
  }


  return (
    <Fragment>
      <Head>
      <title>{event.title}</title>
      <meta name="description" content={event.description}/>
    </Head>
        <EventSummary title={event.title} />
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
  )
}

export async function getStaticProps(context){
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return{
    props:{
      selectedEvent : event[0]
    },
    revalidate:10
  }
}

export async function getStaticPaths(){
  const allEvents = await getFeaturedEvents();
  const paramsPath = allEvents.map(event=>({params: {eventId: event.id}}));
  return{
    paths:paramsPath,
    fallback:true
  }
}

export default SpecificEvent;