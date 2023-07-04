import React, { useState } from 'react'
import Switch from 'react-switch'
import '../styles/Toggle.css'
import { writeToRealtimeDatabase } from '../config/databaseUtils'

const Toggle = ({ field, sensorName }) => {
  const [isToggled, setToggled] = useState(false)
  const handleToggle = async (checked) => {
    setToggled(checked)
    writeToRealtimeDatabase(field, checked)
  }

  return (
    <div className='toggle-container'>
      <label className='toggle-label'>{sensorName}:</label>
      <Switch checked={isToggled} onChange={handleToggle} />
    </div>
  )
}

export default Toggle
