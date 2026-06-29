"use client";

import React from 'react';
import InfoPage from '../../components/InfoPage';

export default function Privacy() {
  const sections = [
    {
      title: "CRYPTO-GRAPHIC ENCRYPTION",
      text: "All platform data is protected by the STASIS encryption protocol. Your digital footprint is fragmented and secured via asymmetric key pairs, ensuring that your procurement history remains an enigma to external observers."
    },
    {
      title: "TELEMETRY LIMITATION",
      text: "We do not harvest behavioral metrics. Solaris Lux only monitors technical interface stability and transaction integrity. Your interaction with the solar grid is a private affair between you and the machine."
    },
    {
      title: "THIRD-PARTY NEUTRALITY",
      text: "We maintain a policy of absolute neutrality. Solaris does not engage with advertising networks or data brokers. Information is only shared with logistics nodes to ensure the physical arrival of your hardware."
    }
  ];

  return (
    <InfoPage 
      title="PRIVACY"
      subtitle="Protocole de protection des données et intégrité numérique. Votre stase est notre priorité."
      specCode="PRIVACY // SEC-77"
      sections={sections}
    />
  );
}
