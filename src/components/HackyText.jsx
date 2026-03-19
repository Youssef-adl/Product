import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789-_/[]{}<>*#&@+!?'

const HackyText = ({ text, delay = 0, duration = 1500, className = "" }) => {
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef(null)
  const iterationRef = useRef(0)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsAnimating(true)
      iterationRef.current = 0
      
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterationRef.current) {
                return text[index]
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )

        if (iterationRef.current >= text.length) {
          clearInterval(interval)
          setIsAnimating(false)
        }

        iterationRef.current += text.length / (duration / 30)
      }, 30)

      timerRef.current = interval
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [text, delay, duration])

  return (
    <span className={className}>
      {displayText || text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")}
    </span>
  )
}

export default HackyText
