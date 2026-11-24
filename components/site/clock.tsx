"use client";

import { useEffect, useState } from "react";

/** Local time in Indonesia (WIB). Renders a stable placeholder on the server. */
export function Clock({ className }: { className?: string }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className}>
      <span className="tabular">{t ?? "--:--"}</span> WIB
    </span>
  );
}
