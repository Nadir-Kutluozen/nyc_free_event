

const dummyEvents = [
    { id: 1, date: "OCT 24", title: "MoMA Free Friday Nights", location: "Midtown Manhattan", time: "4:00 PM - 8:00 PM", category: "Art & Culture" },
    { id: 2, date: "OCT 25", title: "Underground Jazz Session", location: "West Village", time: "9:00 PM - 12:00 AM", category: "Live Music" },
    { id: 3, date: "OCT 26", title: "Vintage Market Pop-Up", location: "Williamsburg", time: "11:00 AM - 6:00 PM", category: "Shopping" },
    { id: 4, date: "OCT 26", title: "Central Park Outdoor Cinema", location: "Sheep Meadow", time: "7:30 PM", category: "Film" },
    { id: 5, date: "OCT 27", title: "Lower East Side Gallery Crawl", location: "LES", time: "6:00 PM - 9:00 PM", category: "Art & Culture" },
];

export default function EventsPage() {
    return (
        <main className="min-vh-100 position-relative" style={{ paddingTop: "100px" }}>
            <div className="container pb-5">
                <header className="mb-5 pb-4 border-bottom border-dark">
                    <h1 className="text-uppercase mb-3" style={{ letterSpacing: "0.25em", fontWeight: "500", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                        Upcoming <span className="title-highlight">Events</span>
                    </h1>
                    <p className="text-white-50 text-uppercase" style={{ letterSpacing: "0.15em", fontSize: "0.85rem" }}>
                        Curated free happenings across the five boroughs.
                    </p>
                </header>

                <div className="event-list d-flex flex-column gap-4">
                    {dummyEvents.map((event) => (
                        <div key={event.id} className="event-card border border-dark p-4 transition-all" style={{ cursor: "pointer" }}>
                            <div className="row align-items-center">
                                <div className="col-md-2 col-4 border-end border-dark text-center py-2">
                                    <h3 className="mb-0 text-uppercase" style={{ letterSpacing: "0.1em", fontWeight: "600" }}>{event.date.split(" ")[0]}</h3>
                                    <h2 className="display-4 fw-bold mb-0" style={{ letterSpacing: "-0.05em" }}>{event.date.split(" ")[1]}</h2>
                                </div>
                                <div className="col-md-7 col-8 ps-md-5">
                                    <span className="badge border border-light text-light text-uppercase rounded-0 px-3 py-2 mb-3" style={{ letterSpacing: "0.1em", fontSize: "0.7rem" }}>
                                        {event.category}
                                    </span>
                                    <h4 className="text-uppercase mb-2" style={{ letterSpacing: "0.15em", fontSize: "1.25rem", fontWeight: "500" }}>{event.title}</h4>
                                    <p className="text-white-50 text-uppercase mb-0" style={{ letterSpacing: "0.1em", fontSize: "0.8rem" }}>
                                        <i className="bi bi-geo-alt me-2"></i>{event.location} &nbsp;|&nbsp; {event.time}
                                    </p>
                                </div>
                                <div className="col-md-3 mt-4 mt-md-0 text-md-end text-center">
                                    <button className="btn btn-outline-dark rounded-0 text-uppercase px-4 py-3 w-100" style={{ letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: "600" }}>
                                        RSVP
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
