"use client";

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Web Vitals collected — wire up to your analytics here if needed:
    // navigator.sendBeacon('/analytics', JSON.stringify(metric))
    
    // Você pode enviar para o Google Analytics, Plausible, ou Vercel Analytics:
    // Exemplo: 
    // const body = JSON.stringify(metric)
    // const url = 'https://example.com/analytics'
    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon(url, body)
    // } else {
    //   fetch(url, { body, method: 'POST', keepalive: true })
    // }
  });

  return null;
}
