"use client";

import React from 'react';
import InfoPage from '../../components/InfoPage';

export default function Returns() {
  const sections = [
    {
      title: "STASIS GUARANTEE",
      text: "If the Solaris Lux system does not resonate with your environment within 30 days, we honor a full stasis exit. Simply initiate the return protocol via your member dashboard to receive a pre-paid encrypted shipping label."
    },
    {
      title: "REFUND NEXUS",
      text: "Refunds are processed via direct bank wire once the unit's metabolic integrity is verified by our QA engineering team. Once the return is confirmed, the credit is dispatched within 72 atomic hours."
    }
  ];

  return (
    <InfoPage 
      title="RETURNS"
      subtitle="Protocole de retour et garantie de stase. Politique de remboursement 30 jours."
      specCode="RETURNS // RE-001"
      sections={sections}
    />
  );
}
