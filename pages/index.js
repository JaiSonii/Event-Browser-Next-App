import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
import useSWR from "swr";
import Head from 'next/head'

const HomePage = (props) => {
  const {featuredEvents} = props;

  return (
    <div>
    <Head>
      <title>Events</title>
      <meta name="description" content="Find all the great event and let yourself evolve.."/>
    </Head>
    <EventList items={featuredEvents}/>
    </div>
  )
}

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents();
  return{
    props:{featuredEvents},
    revalidate:1800
  }
}

export default HomePage;