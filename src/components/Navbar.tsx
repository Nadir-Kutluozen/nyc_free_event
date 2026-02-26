import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark position-absolute top-0 w-100 z-3 p-4" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link href="/" className="navbar-brand text-uppercase mb-0 text-decoration-none" style={{ letterSpacing: "0.25em", fontSize: "1.2rem", fontWeight: "300", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                    NYC Events
                </Link>
                <Link href="/events" className="nav-link text-uppercase fw-medium" style={{ letterSpacing: "0.2em", fontSize: "0.85rem", color: "#ffffff", fontFamily: "var(--font-sans)" }}>
                    View Events
                </Link>
            </div>
        </nav>
    );
}
