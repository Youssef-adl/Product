import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const devices = [
  { model: 'iPhone 15 Pro Max', compatible: true, type: 'MagSafe' },
  { model: 'iPhone 15 Pro', compatible: true, type: 'MagSafe' },
  { model: 'iPhone 15', compatible: true, type: 'MagSafe' },
  { model: 'iPhone 14', compatible: true, type: 'MagSafe' },
  { model: 'iPhone 13', compatible: true, type: 'MagSafe' },
  { model: 'iPhone 12', compatible: true, type: 'MagSafe' },
  { model: 'iPhone 11', compatible: false, type: 'Qi (Needs Adapter)' },
  { model: 'iPhone SE (3rd gen)', compatible: false, type: 'Qi (Needs Adapter)' },
  { model: 'Samsung S24 Ultra', compatible: true, type: 'Qi2' },
  { model: 'Samsung S23', compatible: false, type: 'Qi (Needs Adapter)' },
]

function CompatibilityChecker() {
  const [ref, visible] = useReveal()
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)

  const handleCheck = () => {
    const found = devices.find(d => d.model.toLowerCase().includes(search.toLowerCase()))
    setResult(found || { model: search, compatible: false, unknown: true })
  }

  return (
    <section id="compatibility" ref={ref} className={`section container reveal ${visible ? 'is-visible' : ''}`}>
      <div className="glass-card compatibility-box">
        <h3 className="compatibility-title">Vérifiez votre compatibilité</h3>
        <p className="compatibility-desc">
          Lodestone utilise les dernières normes MagSafe et Qi2 pour une performance optimale.
        </p>
        
        <div className="compatibility-input-group">
          <input 
            type="text" 
            placeholder="Ex: iPhone 15 Pro..." 
            className="compatibility-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          />
          <button className="btn btn-primary compatibility-btn" onClick={handleCheck}>
            Vérifier
          </button>
        </div>

        {result && (
          <div className={`compatibility-result ${result.compatible ? 'success' : 'fail'}`}>
            <div className="result-icon">
              {result.compatible ? '✔' : '✖'}
            </div>
            <div className="result-text">
              <span className="result-model">{result.model}</span>
              <span className="result-status">
                {result.compatible 
                  ? `Parfaitement compatible (${result.type})` 
                  : (result.unknown 
                      ? "Modèle non répertorié. Contactez le support." 
                      : `Non compatible nativement (${result.type})`
                    )
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CompatibilityChecker
