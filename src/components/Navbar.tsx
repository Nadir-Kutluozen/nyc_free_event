import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-transparent position-absolute top-0 w-100 z-3 p-4">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link href="/" className="navbar-brand text-uppercase fw-bold text-white mb-0 text-decoration-none" style={{ letterSpacing: "0.2em", fontSize: "1.2rem" }}>
                    NYC Events
                </Link>
                <Link href="/events" className="nav-link text-uppercase text-white" style={{ letterSpacing: "0.15em", fontSize: "0.85rem" }}>
                    View Events
                </Link>
            </div>
        </nav>
    );
}
