export async function getAllEvents(){
    const data = await fetch("https://dummy-5f8b6-default-rtdb.firebaseio.com/events.json").then(response=>response.json());
  let events = [];
  for(const key in data){
    events.push({
      id:key,
      ...data[key]
    })
  }
  return events;
}

export async function getFeaturedEvents(){
    const allEvents = await getAllEvents();
    return allEvents.filter(event=>event.isFeatured);
}

export async function getEventById(eventId){
    const allEvents = await getAllEvents();
    return allEvents.filter(event => event.id === eventId);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  console.log(allEvents);

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

