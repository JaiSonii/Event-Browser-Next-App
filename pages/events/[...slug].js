import { useRouter } from "next/router"
import {  getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/error-alert/error-alert";

const FilterPage = () => {

  const router = useRouter();

  const filterData = router.query.slug;

  if(!filterData){
    return(
      <p className="center">Loading...</p>
    )
  }

  console.log(filterData);
  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numMonth<1 || numMonth > 12){
    return(
      <Fragment>
      <ErrorAlert>
      <p>Please enter valid filter values</p>
      </ErrorAlert>
      <div>
        <Button href="/events">Show All Events</Button>
      </div>
      </Fragment>
    )
  }


  const events = getFilteredEvents({
    year:numYear,
    month:numMonth
  })

  console.log(events);

  if(!events || events.length == 0){
    return(
      <Fragment>
      <ErrorAlert>
      <p>No events found</p>
      </ErrorAlert>
      <div className="center">
      <Button href="./events">Show All Events</Button>
      </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
    <ResultsTitle date={date} />
    <EventList items={events}/>
    </Fragment>
  )
}

export default FilterPage