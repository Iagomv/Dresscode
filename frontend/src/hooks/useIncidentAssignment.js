import { useState, useEffect, useMemo } from 'react'
import {ApiConfig} from '../api/ApiConfig'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { INCIDENT_ASSIGNMENT_TEXT } from '../constants/textConstants'

const useIncidentAssignment = () => {
  const { auth } = useAuth()
  const isAdmin = useMemo(() => auth?.user?.authorities?.includes('ROLE_ADMIN'), [auth?.user?.authorities])

  // State management
  const [incidents, setIncidents] = useState([])
  const [technicians, setTechnicians] = useState([])
  const [filters, setFilters] = useState({
    assignmentStatus: 'all',
    priority: 'all',
    incidentStatus: 'all',
  })
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  })
  const [loading, setLoading] = useState(true)
  const [selectedIncidents, setSelectedIncidents] = useState([])
  const [selectedTechnician, setSelectedTechnician] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedIncidentDetail, setSelectedIncidentDetail] = useState(null)

  // Data fetching
  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const [incidentsRes, techniciansRes] = await Promise.all([
          ApiConfig.getAllIncidentsWithTechnicianName({ signal: abortController.signal }),
          ApiConfig.getTechniciansWithActualIncidentCount({ signal: abortController.signal }),
        ])

        if (!abortController.signal.aborted) {
          setIncidents(incidentsRes.data)
          setTechnicians(techniciansRes.data)
          setLoading(false)
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          toast.error('Failed to load data: ' + (error.response?.data?.message || error.message))
          setLoading(false)
        }
      }
    }

    if (isAdmin) fetchData()
    return () => abortController.abort()
  }, [isAdmin])

  // Helper functions
  const updateTechnicianCounts = (technicians, technicianChanges) => {
    return technicians.map((tech) => ({
      ...tech,
      incidentCount: tech.incidentCount + (technicianChanges[tech.id] || 0),
    }))
  }

  const calculateTechnicianChanges = (selectedIncidents, incidents, selectedTechnicianId) => {
    const changes = { [selectedTechnicianId]: 0 }
    selectedIncidents.forEach((incidentId) => {
      const incident = incidents.find((inc) => inc.id === incidentId)
      if (incident) {
        if (incident.technicianId && incident.technicianId !== selectedTechnicianId) {
          changes[incident.technicianId] = (changes[incident.technicianId] || 0) - 1
        }
        if (incident.technicianId !== selectedTechnicianId) changes[selectedTechnicianId]++
      }
    })
    return changes
  }

  // Event handlers
  const handleIncidentSelect = (incidentId) => {
    setSelectedIncidents((prev) =>
      prev.includes(incidentId) ? prev.filter((id) => id !== incidentId) : [...prev, incidentId]
    )
  }

  const handleSelectAll = (checked) => {
    setSelectedIncidents(checked ? filteredIncidents.map((i) => i.id) : [])
  }

  const handleAssign = async () => {
    if (!selectedTechnician || !selectedIncidents.length) {
      toast.warn(INCIDENT_ASSIGNMENT_TEXT.warnSelectIncidentsAndTechnician)
      return
    }

    try {
      const selectedTechInfo = technicians.find((t) => String(t.id) === String(selectedTechnician))
      if (!selectedTechInfo) {
        toast.error(`${INCIDENT_ASSIGNMENT_TEXT.errorSelectedTechnicianNotFound}${selectedTechnician}`)
        return
      }

      await Promise.all(
        selectedIncidents.map((incidentId) =>
          ApiConfig.assignIncidents({ incidentId, technicianId: selectedTechnician })
        )
      )

      const technicianChanges = calculateTechnicianChanges(selectedIncidents, incidents, selectedTechnician)
      setTechnicians((prev) => updateTechnicianCounts(prev, technicianChanges))
      setIncidents((prev) =>
        prev.map((incident) =>
          selectedIncidents.includes(incident.id)
            ? {
                ...incident,
                technicianId: selectedTechnician,
                technicianName: selectedTechInfo.username,
              }
            : incident
        )
      )

      setSelectedIncidents([])
      setSelectedTechnician('')
      toast.success(`${selectedIncidents.length} ${INCIDENT_ASSIGNMENT_TEXT.successMessage}`)
    } catch (error) {
      toast.error(`${INCIDENT_ASSIGNMENT_TEXT.errorAssignmentFailed}${error.response?.data?.message || error.message}`)
    }
  }

  const handleShowDetails = (incident) => {
    setSelectedIncidentDetail(incident)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedIncidentDetail(null)
  }

  // Memoized filtered incidents
  const filteredIncidents = useMemo(
    () =>
      incidents
        .filter((incident) => {
          let matchesAssignment = false
          if (filters.assignmentStatus === 'all') {
            matchesAssignment = true
          } else if (filters.assignmentStatus === 'assigned') {
            matchesAssignment = incident.technicianId !== null
          } else {
            matchesAssignment = incident.technicianId === null
          }

          const matchesPriority = filters.priority === 'all' || incident.priority === filters.priority
          const matchesStatus = filters.incidentStatus === 'all' || incident.status === filters.incidentStatus
          return matchesAssignment && matchesPriority && matchesStatus
        })
        .sort((a, b) => {
          const modifier = sortConfig.direction === 'asc' ? 1 : -1
          let comparisonResult = 0
          if (sortConfig.key === 'technician') {
            comparisonResult = (a.technicianName || '').localeCompare(b.technicianName || '')
          } else {
            comparisonResult = a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
          }
          return comparisonResult * modifier
        }),
    [incidents, filters, sortConfig]
  )

  return {
    isAdmin,
    loading,
    filters,
    sortConfig,
    selectedIncidents,
    selectedTechnician,
    technicians,
    filteredIncidents,
    showModal,
    selectedIncidentDetail,
    handleIncidentSelect,
    handleSelectAll,
    handleAssign,
    handleShowDetails,
    handleCloseModal,
    setFilters,
    setSortConfig,
    setSelectedTechnician,
  }
}

export default useIncidentAssignment
