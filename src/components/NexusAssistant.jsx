import { useState, useEffect, useRef } from 'react'
import HackyText from './HackyText'
import AiHandshake from './AiHandshake'

const NEXUS_RESPONSES = {
  power: "LODESTONE_PWR: 15W Max Wireless. Qi Integrated System.",
  material: "CHASSIS: Aerospace-grade 6061 Aluminum. CNC Machined.",
  safety: "SAFE_GUARD: Heat-sync architecture active. Overcharge protection enabled.",
  compatibility: "LINK_SYNC: iPhone 12+ (MagSafe) and all Qi devices.",
  default: "READY: Scan complete. Awaiting technical inquiry."
}

const NexusAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([
    { type: 'bot', text: 'NEXUS_v4.0.0 INITIALIZED.' },
    { type: 'bot', text: 'AWAITING_COMMAND...' }
  ])
  const scrollRef = useRef()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input.toLowerCase()
    setHistory(prev => [...prev, { type: 'user', text: input }])
    setInput("")

    // Simulated AI Processing
    setTimeout(() => {
      let response = NEXUS_RESPONSES.default
      if (userMsg.includes("puissance") || userMsg.includes("pwr") || userMsg.includes("watt")) response = NEXUS_RESPONSES.power
      if (userMsg.includes("matière") || userMsg.includes("alu")) response = NEXUS_RESPONSES.material
      if (userMsg.includes("sécurité") || userMsg.includes("chauffe")) response = NEXUS_RESPONSES.safety
      
      if (userMsg.includes("iphone") || userMsg.includes("compatible") || userMsg.includes("test")) {
        setIsChecking(true)
        return // Handshake will trigger the final response
      }

      setHistory(prev => [...prev, { type: 'bot', text: response }])
    }, 600)
  }

  const handleHandshakeComplete = () => {
    setIsChecking(false)
    setHistory(prev => [...prev, { type: 'bot', text: NEXUS_RESPONSES.compatibility }])
  }

  return (
    <div className={`nexus-wrapper ${isOpen ? 'is-open' : ''}`}>
      {/* Nexus Floating Orb */}
      <button 
        className="nexus-orb"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Nexus Assistant"
      >
        <div className="nexus-orb__inner" />
        <div className="nexus-orb__ring" />
        <div className="nexus-orb__label">NEXUS</div>
      </button>

      {/* Terminal Interface */}
      <div className="nexus-terminal">
        <div className="nexus-terminal__header">
          <span className="tech-flicker">●</span> SYSTEM_NEXUS [DEBUG_MODE]
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
        
        <div className="nexus-terminal__body" ref={scrollRef}>
          {history.map((msg, i) => (
            <div key={i} className={`nexus-msg nexus-msg--${msg.type}`}>
              {msg.type === 'bot' ? (
                <>
                  <span className="nexus-prefix">{"> "}</span>
                  <HackyText text={msg.text} duration={600} />
                </>
              ) : (
                <>
                  <span className="nexus-prefix nexus-prefix--user">{"$ "}</span>
                  {msg.text}
                </>
              )}
            </div>
          ))}
        </div>

        <form className="nexus-terminal__footer" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type command..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">→</button>
        </form>
      </div>

      <AiHandshake active={isChecking} onComplete={handleHandshakeComplete} />
    </div>
  )
}

export default NexusAssistant
