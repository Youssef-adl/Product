"use client";

import React from 'react';
import InfoPage from '../../components/InfoPage';

export default function Shipping() {
  const sections = [
    {
      title: "GLOBAL LOGISTICS NODES",
      text: "Solaris Lux hardware is dispatched from primary hubs in Casablanca, Paris, and Dubai. Our logistics network is optimized for 'Express Stasis,' ensuring that your system remains in pristine condition from manufacturing to deployment."
    },
    {
      title: "SECURE TRANSPORT",
      text: "Each unit is shipped in a hermetically sealed, anti-static titanium-lined enclosure. Tracking is available via encrypted telemetry link, updated in real-time as your package navigates the global supply grid."
    }
  ];

  return (
    <InfoPage 
      title="SHIPPING"
      subtitle="Logistique globale et nodes de distribution. Expédition haute vélocité."
      specCode="SHIPPING // LOG-89"
      sections={sections}
    />
  );
}
