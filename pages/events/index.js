import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";

const EventsPage = () => {

  const events = getAllEvents();

  const router = useRouter();


  function eventSearchHandler(year, month){
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={eventSearchHandler}/>
      <EventList items={events}/>
    </Fragment>
    
  )
}

export default EventsPage;