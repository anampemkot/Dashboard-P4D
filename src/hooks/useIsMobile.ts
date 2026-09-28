import * as React from "react";

// Matches Tailwind's `lg` breakpoint (1024px) — below this, SidebarApp's
// persistent icon rail should behave as an overlay drawer instead of a
// permanent layout column.
const MOBILE_QUERY = "(max-width: 1023px)";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : false
  );

  React.useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
} 
