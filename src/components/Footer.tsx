export default function Footer({ className = "" }: { className?: string }) {
    return (
        <footer className={`w-100 p-4 text-center z-3 ${className}`}>
            <p className="text-white-50 text-uppercase mb-0" style={{ letterSpacing: "0.2em", fontSize: "0.75rem" }}>
                &copy; {new Date().getFullYear()} NYC Events. Built for New York.
            </p>
        </footer>
    );
}
