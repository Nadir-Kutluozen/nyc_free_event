import { supabase } from "@/lib/supabase";

// Tell Next.js to not aggressively cache this page so new events always appear instantly
export const revalidate = 0;

export default async function EventsPage() {

    // Fetch live events from your database! (Only future events, sorted by date)
    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .gte('date_start', new Date().toISOString())
        .order('date_start', { ascending: true })
        .limit(100);

    if (error) console.error("Database fetch error:", error);

    return (
        <main className="min-vh-100 position-relative" style={{ paddingTop: "100px" }}>
            <div className="container pb-5">
                <header className="mb-5 pb-4 border-bottom border-dark">
                    <h1 className="text-uppercase mb-3" style={{ letterSpacing: "0.25em", fontWeight: "500", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                        Upcoming <span className="title-highlight">Events</span>
                    </h1>
                    <p className=" text-uppercase" style={{ letterSpacing: "0.15em", fontSize: "0.85rem" }}>
                        Curated free happenings across the five boroughs.
                    </p>
                </header>

                <div className="event-list d-flex flex-column gap-4">
                    {/* If there are no events in the DB yet */}
                    {!events || events.length === 0 ? (
                        <div className="text-center p-5 border border-dark  text-uppercase" style={{ letterSpacing: "0.1em" }}>
                            No upcoming free events found. Try running the scrapers.
                        </div>
                    ) : (
                        events.map((event) => {
                            // Format the live timestamp into your required display strings
                            const eventDate = new Date(event.date_start);
                            const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                            const day = eventDate.getDate();
                            const timeString = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                            return (
                                <a key={event.id} href={event.source_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                                    <div className="event-card border border-dark p-4 transition-all" style={{ cursor: "pointer" }}>
                                        <div className="row align-items-center">
                                            {/* Date Column */}
                                            <div className="col-md-2 col-4 border-end border-dark text-center py-2">
                                                <h3 className="mb-0 text-uppercase" style={{ letterSpacing: "0.1em", fontWeight: "600" }}>{month}</h3>
                                                <h2 className="display-4 fw-bold mb-0 text-dark" style={{ letterSpacing: "-0.05em" }}>{day}</h2>
                                            </div>

                                            {/* Details Column */}
                                            <div className="col-md-7 col-8 ps-md-5">
                                                <span className="badge border border-dark text-dark text-uppercase rounded-0 px-3 py-2 mb-3" style={{ letterSpacing: "0.1em", fontSize: "0.7rem" }}>
                                                    {event.source_name || "NYC Events"}
                                                </span>
                                                <h4 className="text-uppercase mb-2 text-dark" style={{ letterSpacing: "0.15em", fontSize: "1.25rem", fontWeight: "500" }}>{event.title}</h4>

                                                <p className="text-muted text-uppercase mb-2" style={{ letterSpacing: "0.1em", fontSize: "0.8rem" }}>
                                                    <i className="bi bi-geo-alt me-2"></i>{event.location} &nbsp;|&nbsp; {timeString}
                                                </p>

                                                {event.description && (
                                                    <p className="text-muted mb-0 mt-3" style={{ fontSize: "0.85rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                        {event.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Image & Button Column */}
                                            <div className="col-md-3 mt-4 mt-md-0 d-flex flex-column align-items-end justify-content-center">
                                                {event.image_url && (
                                                    <img
                                                        src={event.image_url}
                                                        alt={event.title}
                                                        className="img-fluid mb-3 border border-dark object-fit-cover"
                                                        style={{ maxHeight: "120px", width: "100%" }}
                                                    />
                                                )}
                                                <button className="btn btn-outline-dark rounded-0 text-uppercase px-4 py-3 w-100 mt-auto" style={{ letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: "600" }}>
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })
                    )}
                </div>
            </div>
        </main>
    );
}
