"use client";

import React from 'react';
import InfoPage from '../../components/InfoPage';

export default function Support() {
  const sections = [
    {
      title: "TECHNICAL NEXUS",
      text: "Our engineering team provides direct support for the Solaris Lux grid. Whether it's a magnetic alignment issue or a thermal gradient anomaly, the tech nexus is active 24/7 to ensure your recharge cycle is uninterrupted."
    },
    {
      title: "REMOTE TELEMETRY",
      text: "Enable remote diagnostics on your device to allow our support nodes to analyze performance metrics in real-time. This secure link ensures precision troubleshooting without physical intrusion."
    }
  ];

  return (
    <InfoPage 
      title="SUPPORT"
      subtitle="Accès au nexus technique. Résolution de problèmes et télémesure."
      specCode="SUPPORT // NEXUS-01"
      sections={sections}
    />
  );
}
