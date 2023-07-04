import React from 'react'
import '../styles/AlarmStatus.css'

const AlarmStatus = ({ isActivated }) => {
  return (
    <div className={`alarm-status ${isActivated ? 'activated' : 'deactivated'}`}>
      {isActivated ? 'Alarma Activada' : 'Alarma Desactivada'}
    </div>
  )
}

export default AlarmStatus
