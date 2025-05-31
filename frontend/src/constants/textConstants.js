export const ROLES = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
}

export const TOP_NAVIGATION_TEXT = {
  title: 'Dresscode frontend',
  myIncidents: 'My Incidents',
  createIncident: 'Create Incident',
  myAssignedIncidents: 'My Assigned Incidents',
  userManagement: 'User Management',
  assignIncidents: 'Assign Incidents',
  statistics: 'Statistics',
  profile: 'Profile',
  profileInfo: 'Profile info',
  logout: 'Logout',
}

export const INCIDENT_STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  CLOSED: 'Closed',
}
export const INCIDENT_PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
}

export const INCIDENTS_TABLE_TEXT = {
  tableTitle: 'Incidents list',
  thTitle: 'Title',
  thCategory: 'Category',
  thPriority: 'Priority',
  thStatus: 'Status',
  thDescription: 'Description',
  thCreatedAt: 'CreatedAt',
  thActions: 'Actions',
  noIncidents: 'There are no incidents',
  modalTitle: 'Incident Details',
  modalCloseButton: 'Close',
}
export const FORM_TEXT = {
  username: 'Username',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  email: 'Email',
  role: 'Role',
  submitButton: 'Submit',
}

// Incident assignment is the page where admins can assign incidents to technicians
export const INCIDENT_ASSIGNMENT_TEXT = {
  page_title: 'Incident Assignment Management',
  assignmentStatus: 'Assignment Status',
  priority: 'Priority',
  incidentStatus: 'Incident Status',
  technician: 'Technician',
  labelAssignStatusSelect: 'Assigned',
  labelPrioritySelect: 'Priority',
  labelIncidentStatusSelect: 'Status',
  technicianSelectDefaultOption: 'Select a technician',
  all: 'All',
  assigned: 'Assigned',
  unassigned: 'Unassigned',
  avaliableTechniciansTitle: 'Technicians',
  warnSelectIncidentsAndTechnician: 'Please select incidents and a technician',
  errorSelectedTechnicianNotFound: 'Selected technician not found. ID: ',
  errorAssignmentFailed: 'Assignment failed: ',
  successMessage: 'incident(s) assigned',
  table: {
    titleTh: 'Title',
    priorityTh: 'Priority',
    statusTh: 'Status',
    assignedToTh: 'Assigned To',
    createdAtTh: 'Created At',
    detailsTh: 'Details',
  },
}
// Charts on the statistics page
export const STATS_TEXT = {
  allTimeStats: 'All-Time Stats',
  actualStats: 'Actual Stats',
  showActualStats: 'Show Actual Stats',
  showAllTimeStats: 'Show All-Time Stats',
  priorityDistribution: 'Priority Distribution',
  statusDistribution: 'Status Distribution',
  avgResolutionTime: 'Average Resolution Time',
  technicianPerformance: 'Technician Performance',
  techniciansHistory: 'Technician History',
}
//* Page where admins can manage users
export const ADMIN_USER_MANAGEMENT_TEXT = {
  pageTitle: 'User Management',
  createUser: 'Create New User',
  editUser: 'Edit User',
  userTable: {
    username: 'Username',
    email: 'Email',
    role: 'Role',
    createdAt: 'Created At',
    actions: 'Actions',
  },
  userModal: {
    editTitle: 'Edit User',
    createTitle: 'Create User',
  },
}

export const ERROR_MESSAGES = {
  dataLoadError: 'Error al cargar los datos.',
  noRoleError: 'Error de credenciales.',
}

export const TOKEN_KEY = 'DresscodeWeb'