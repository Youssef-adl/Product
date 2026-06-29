"use client";

import React from 'react';
import InfoPage from '../../components/InfoPage';

export default function Terms() {
  const sections = [
    {
      title: "ACQUISITION PROTOCOLS",
      text: "The finality of a Solaris transaction is absolute. Once the magnetic seal is initiated and payment is verified, the procurement process enters an unalterable stase phase for logistics optimization."
    },
    {
      title: "HARDWARE USAGE LIMITS",
      text: "Solaris Lux chargers are precision instruments. Misuse, including exposure to non-compatible magnetic fields or extreme atmospheric conditions beyond the spec sheet, voids the celestial warranty."
    },
    {
      title: "INTELLECTUAL STASIS",
      text: "The architecture of the Solaris grid, including the Titanium Glass aesthetic and the Stasis recharge logic, is protected by international industrial patents. Replication is strictly forbidden."
    }
  ];

  return (
    <InfoPage 
      title="TERMS"
      subtitle="Conditions générales d'utilisation et protocoles d'acquisition. Le contrat de l'élite."
      specCode="TERMS // CORE-01"
      sections={sections}
    />
  );
}
