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
