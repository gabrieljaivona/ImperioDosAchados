"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/meta-pixel";
import { getConsent, subscribeConsent } from "@/lib/consent";

/** Só carrega o Pixel depois que o usuário aceita os cookies. */
export function MetaPixel() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);

  if (!META_PIXEL_ID || consent !== "granted") return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
