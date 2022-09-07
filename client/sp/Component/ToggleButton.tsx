import React, { FC, useState } from 'react'

interface IToggleButtonProps {
  isOn: boolean
  onToggle: (bool: boolean) => void
}

const ToggleButton: FC<IToggleButtonProps> = ({isOn, onToggle}) => {
  const handleClick = () => {
    onToggle(!isOn)
  }

  return (
    <div className={`toggle-button${isOn ? ' --active' : ''}`} onClick={handleClick}>
      <span className="toggle-button__bar --first" />
      <span className="toggle-button__bar --second" />
      <span className="toggle-button__bar --third" />
    </div>
  )
}

export default ToggleButton