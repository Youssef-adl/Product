import { useReveal } from '../hooks/useReveal'

const comparisonData = [
  { feature: 'Puissance de charge', lodestone: '15W Sertifié', apple: '15W', belkin: '15W' },
  { feature: 'Matériau Premium', lodestone: 'Aluminium CNC', apple: 'Plastique/Silicone', belkin: 'Plastique' },
  { feature: 'Anneau LED Statut', lodestone: '✔ Oui (RGB)', apple: '✖ Non', belkin: '✔ Oui (Simple)' },
  { feature: 'Câble Tressé Inclus', lodestone: '✔ Oui (1.5m)', apple: '✖ Non', belkin: '✔ Oui (1.2m)' },
  { feature: 'Inclinaison ajustable', lodestone: '✔ 30° à 90°', apple: '✖ Fixe', belkin: '✔ Fixe' },
  { feature: 'Garantie', lodestone: '2 Ans', apple: '1 An', belkin: '2 Ans' },
]

function Specs() {
  const [ref, visible] = useReveal()

  return (
    <section id="specs" aria-labelledby="specs-heading" ref={ref} className={`section container reveal${visible ? ' is-visible' : ''}`}>
      <span className="section-label" aria-hidden="true">Comparatif</span>
      <h2 id="specs-heading" className="section-title">Pourquoi Lodestone ?</h2>
      <p className="section-subtitle">
        Une ingénierie supérieure pour ceux qui ne font aucun compromis.
      </p>

      <div className="comparison-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Caractéristique</th>
              <th className="highlight">Lodestone</th>
              <th>Apple MagSafe</th>
              <th>Belkin Boost</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, i) => (
              <tr key={i}>
                <td className="feature-name">{item.feature}</td>
                <td className="highlight">{item.lodestone}</td>
                <td>{item.apple}</td>
                <td>{item.belkin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '24px' }}>
        * Comparaison basée sur les modèles standards équivalents en 2026.
      </p>
    </section>
  )
}

export default Specs
