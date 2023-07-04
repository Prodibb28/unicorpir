import '../styles/Dashboard.css'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { ref, get } from 'firebase/database'
import { Navigate } from 'react-router-dom'
import { db, auth } from '../config/firebase'
import Toggle from '../Components/Toggle'
import AlarmStatus from '../Components/AlarmStatus'

const Dashboard = () => {
  const [shouldNavigate, setShouldNavigate] = useState(false)
  const [sensorsData, setSensorData] = useState([])
  const [isAlarmS1, setAlarmS1] = useState(false)
  const [isAlarmS3, setAlarmS3] = useState(false)
  const [isAlarmS4, setAlarmS4] = useState(false)

  useEffect(() => {
    const getSensorData = async () => {
      const sensorOneRef = ref(db, '/sensores/sensor_1')
      const sensorThreeRef = ref(db, '/sensores/sensor_3')
      const sensorFourRef = ref(db, '/sensores/sensor_4')

      const senOne = await get(sensorOneRef)
      setAlarmS1(senOne.val().alarm)
      const data1 = Object.entries(senOne.val().reg).map(([key, value]) => {
        const fecha = obtenerFecha(value.date)
        const hora = obtenerHora(value.date)

        return {
          key,
          fecha,
          hora,
          sensor: 'sensor_1'
        }
      })

      const senThree = await get(sensorThreeRef)
      setAlarmS3(senThree.val().alarm)
      const data3 = Object.entries(senThree.val().reg).map(([key, value]) => {
        const fecha = obtenerFecha(value.date)
        const hora = obtenerHora(value.date)

        return {
          key,
          fecha,
          hora,
          sensor: 'sensor_3'
        }
      })

      const senFour = await get(sensorFourRef)
      setAlarmS4(senFour.val().alarm)
      const data4 = Object.entries(senFour.val().reg).map(([key, value]) => {
        const fecha = obtenerFecha(value.date)
        const hora = obtenerHora(value.date)

        return {
          key,
          fecha,
          hora,
          sensor: 'sensor_4'
        }
      })

      const InfoTable = data1.concat(data3, data4)
      setSensorData(InfoTable)
    }
    return () => getSensorData()
  }, [sensorsData])

  const obtenerFecha = (timestamp) => {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth() + 1 // Los meses en JavaScript son indexados desde 0
    const year = date.getFullYear()

    // Formatear la fecha en el formato deseado (ejemplo: DD/MM/YYYY)
    const fechaFormateada = `${day}/${month}/${year}`

    return fechaFormateada
  }

  const obtenerHora = (timestamp) => {
    const date = new Date(timestamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    // Formatear la hora en el formato deseado (ejemplo: HH:MM)
    const horaFormateada = `${hours}:${minutes}`

    return horaFormateada
  }

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setShouldNavigate(true)
      })
      .catch((error) => {
        console.log('Error occurred while signing out:', error)
      })
  }
  if (shouldNavigate) {
    return <Navigate to='/' replace />
  }

  const columns = [
    {
      name: 'Fecha',
      selector: row => row.fecha,
      sortable: true
    },
    {
      name: 'Hora',
      selector: row => row.hora,
      sortable: true
    },
    {
      name: 'Sensor',
      selector: row => row.sensor,
      sortable: true
    }
  ]

  return (

    <div className='dashboard-container'>
      <nav className='navbar'>
        <div className='navbar-left'>
          <span className='navbar-title'>Dashboard</span>
        </div>
        <div className='navbar-right'>
          <button onClick={handleSignOut} className='btn-exit'>Salir</button>
        </div>
      </nav>
      <div className='button-group'>
        <div className='button-column'>
          <span className='button-label'>Alarma S1: </span>
          <AlarmStatus isActivated={isAlarmS1} />
        </div>

        <div className='button-column'>
          <span className='button-label'>Alarma S3: </span>
          <AlarmStatus isActivated={isAlarmS3} />
        </div>
        <div className='button-column'>
          <span className='button-label'>Alarma S4: </span>
          <AlarmStatus isActivated={isAlarmS4} />
        </div>
      </div>

      <div className='toggle-group'>
        <Toggle sensorName='Sensor 1' field='/sensores/sensor_1/state' />
        <Toggle sensorName='Sensor 3' field='/sensores/sensor_3/state' />
        <Toggle sensorName='Sensor 4' field='/sensores/sensor_4/state' />
      </div>
      <div className='sensor-table'>
        <DataTable columns={columns} data={sensorsData} pagination />
      </div>
    </div>
  )
}

export default Dashboard
