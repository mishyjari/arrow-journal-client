class Event {
  constructor(name,start_date,end_date,location,journal_id){
    this.name = name
    this.start_date = start_date
    this.end_date = end_date
    this.location = location
  }
}


// Get all events (as an array of instances) given a date range
const getEvents = () => {
  const allEvents = [];

  fetch('http://localhost:3000/events')
  .then( res => res.json() )
  .then( ev => {
    ev.forEach(e => {
      allEvents.push(new Event(e))
    })
  })
  return allEvents;
};
