import { useState, useEffect } from 'react'
import {ApiConfig} from '../api/ApiConfig'
import { priorityColors, statusColors } from '../utils/IncidentUtils'

export const useAllTimeStats = () => {
  const [data, setData] = useState({
    incidents: [],
    technicians: [],
    avgByPriority: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incidentsRes, techniciansRes, avgByPriorityRes] = await Promise.all([
          ApiConfig.getAllIncidents(),
          ApiConfig.getTechniciansWithTotalIncidentCount(),
          ApiConfig.getAvgClosingTimeByPriorityAndStatus(),
        ])
        setData({
          incidents: incidentsRes.data,
          technicians: techniciansRes.data,
          avgByPriority: avgByPriorityRes.data,
          loading: false,
        })
      } catch (error) {
        console.error('Error loading data:', error)
        setData((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchData()
  }, [])

  const processPriorityData = () => {
    const counts = { HIGH: 0, MEDIUM: 0, LOW: 0 }
    data.incidents.forEach((incident) => {
      counts[incident.priority] = (counts[incident.priority] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill: priorityColors[name],
    }))
  }

  const processStatusData = () => {
    const counts = { OPEN: 0, IN_PROGRESS: 0, CLOSED: 0 }
    data.incidents.forEach((incident) => {
      counts[incident.status] = (counts[incident.status] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill: statusColors[name],
    }))
  }

  const processTechnicianData = () => {
    return data.technicians.map((tech) => {
      const techIncidents = data.incidents.filter((incident) => incident.technicianId === tech.id)
      return {
        tech: tech.username,
        HIGH: techIncidents.filter((i) => i.priority === 'HIGH').length,
        MEDIUM: techIncidents.filter((i) => i.priority === 'MEDIUM').length,
        LOW: techIncidents.filter((i) => i.priority === 'LOW').length,
      }
    })
  }

  const processAvgClosingTime = () => {
    return data.avgByPriority.map((item) => ({
      name: item.priority,
      value: parseFloat((item.avgSecondsToClose / 3600).toFixed(2)),
      fill: priorityColors[item.priority],
      seconds: item.avgSecondsToClose,
    }))
  }

  return {
    loading: data.loading,
    priorityData: processPriorityData(),
    statusData: processStatusData(),
    technicianData: processTechnicianData(),
    avgClosingTimeData: processAvgClosingTime(),
    priorityColors,
  }
}
