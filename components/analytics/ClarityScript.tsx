"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * Routes where session replay must not run.
 *
 * The friction calculator asks for salary and headcount and tells the visitor
 * the calculation never leaves their browser. Clarity records session replays,
 * so the computed figure would reach Microsoft as ordinary page text even
 * though it is never sent as an analytics event. Excluding the route is what
 * makes that promise true. The inputs and result also carry
 * data-clarity-mask as a second layer.
 */
const REPLAY_EXCLUDED = ["/frictions-operationnelles"];

export default function ClarityScript() {
  const pathname = usePathname();

  if (process.env.NODE_ENV !== "production") return null;
  if (REPLAY_EXCLUDED.some((route) => pathname?.startsWith(route))) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
    >{`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script","vxom9khtm5");
      window.clarity("consent");
    `}</Script>
  );
}
