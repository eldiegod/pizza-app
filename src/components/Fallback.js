import React from 'react'

const Fallback = () => {
  return (
    <div className="mt-32 text-center">
      Heating ovens...{' '}
      <span role="img" aria-label="Thermometer Emoji">
        🌡
      </span>
    </div>
  )
}

export default Fallback
