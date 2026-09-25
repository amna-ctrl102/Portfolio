"use client";

import { useEffect, useState } from "react";

import PortfolioShell from "@/components/portfolio-shell";

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio-app-shell">
      <div className={`loader-screen ${isLoading ? "is-active" : "is-hidden"}`}>
        <div className="loader-logo-wrap">
          <img
            src="/Assests/Favicon.png"
            alt="Amna Atiq favicon"
            className="loader-logo"
          />
        </div>

        <div className="loader-track" aria-label="Loading portfolio">
          <div className="loader-fill" />
        </div>
      </div>

      <div className={`portfolio-viewport ${isLoading ? "is-hidden" : "is-visible"}`}>
        <PortfolioShell />
      </div>
    </div>
  );
}
