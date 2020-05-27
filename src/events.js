class Event {
  constructor(params){
    this.name = params.name
    this.start_date = params.start_date
    this.end_date = params.end_date
    this.location = params.location
  }
}


// Get all events (as an array of instances) given a date range
const getEvents = method => {
  return fetch('http://localhost:3000/events')
  .then( res => res.json() )
  .then( events => {
  events.forEach(event => {
    let e = new Event({
      name: event.name,
      location: event.location,
      start_date: new Date(Date.parse(event.start_date)),
      end_date: new Date(Date.parse(event.end_date))
    });
    method(e)
    });
  });
}

const log = i => {
  console.log(i)
}
