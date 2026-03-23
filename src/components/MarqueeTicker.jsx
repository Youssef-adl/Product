import React from 'react';

/**
 * MarqueeTicker — bannière horizontale en boucle continue
 * inspirée du marquee du site Lando Norris.
 * Affiche les specs clés du produit SmartCharge.
 */

const items = [
  { label: 'Puissance', value: '15W Qi' },
  { label: 'Vitesse', value: '2× Plus Rapide' },
  { label: 'Disponibilité', value: '24/7' },
  { label: 'Campus', value: 'ISTA Témara' },
  { label: 'Compatibilité', value: 'iOS & Android' },
  { label: 'Sécurité', value: 'Protection Thermique' },
  { label: 'Design', value: 'SmartCharge V1' },
  { label: 'Origine', value: 'Par Adlani & Zhar' },
];

function TickerItem({ label, value }) {
  return (
    <span className="marquee-item">
      <span>{label}</span>
      <span className="dot-sep" />
      <span className="value">{value}</span>
      <span className="dot-sep" />
    </span>
  );
}

export default function MarqueeTicker() {
  // Quadrupler le tableau pour la boucle continue CSS (écrans larges)
  const quadrupled = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-outer" aria-hidden="true">
      <div className="marquee-track">
        {quadrupled.map((item, i) => (
          <TickerItem key={i} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
