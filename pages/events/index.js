
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-utils";
import Head from "next/head";

const EventsPage = (props) => {
  const events = props.events;

  const router = useRouter();


  function eventSearchHandler(year, month){
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
    <Head>
      <title>All Events</title>
      <meta name="description" content="Find all the great event and let yourself evolve.."/>
    </Head>
      <EventSearch onSearch={eventSearchHandler}/>
      <EventList items={events}/>
    </Fragment>
    
  )
}

export async function getStaticProps(){
  const allEvents = await getAllEvents();
  return{
    props:{
      events : allEvents
    },
    revalidate:60
  }
}

export default EventsPage;