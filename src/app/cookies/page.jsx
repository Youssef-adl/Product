"use client";

import React from 'react';
import InfoPage from '../../components/InfoPage';

export default function Cookies() {
  const sections = [
    {
      title: "SYSTEM STABILITY",
      text: "Essential cookies are used to maintain your session bridge between nodes. These are strictly technical and do not track your location or identity outside of the Solaris environment."
    },
    {
      title: "ANALYTIC TELEMETRY",
      text: "We use high-performance cookies to analyze interface latency and interaction flow. This raw data helps us optimize the Titanium Glass rendering for your specific hardware environment."
    }
  ];

  return (
    <InfoPage 
      title="COOKIES"
      subtitle="Gestion des cookies et optimisation de l'interface. Optimisation du flux technique."
      specCode="COOKIES // OPT-09"
      sections={sections}
    />
  );
}
