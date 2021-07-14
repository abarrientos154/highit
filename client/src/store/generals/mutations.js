export function loginStart (state) {
  state.loggingIn = true
}
export function loginStop (state, errorMessage) {
  state.loggingIn = false
  state.loginError = errorMessage
}

export function updateAccessToken (state, HIGHIT_SESSION_INFO) {
  if (HIGHIT_SESSION_INFO) {
    state.HIGHIT_SESSION_INFO = HIGHIT_SESSION_INFO
    // state.userFullName = HIGHIT_SESSION_INFO.name + ' ' + HIGHIT_SESSION_INFO.lastName
  } else {
    state.HIGHIT_SESSION_INFO = {}
  }
}
export function setCurrentModule (state, payload) {
  state.currentModel = payload.currentModel
  state.currentModule = payload.currentModule
}
export function googleBtnShow (state) {
  state.isContacts = true
}

export function googleBtnHide (state) {
  state.isContacts = false
}

export function tabInfoSales (state) {
  state.listCustomerInfo = true
}

export function tabInfoDependents (state) {
  state.listCustomerInfo = false
}

export function showAll (state) {
  state.customShowListable = 'Todos'
}

export function showNextMonth (state) {
  state.customShowListable = 'Mes Siguiente'
}

export function showCurrentMonth (state) {
  state.customShowListable = 'Mes Actual'
}
export function login (state, data) {
  localStorage.setItem('HIGHIT_SESSION_INFO', JSON.stringify(data.HIGHIT_SESSION_INFO))
  state.HIGHIT_SESSION_INFO = data.HIGHIT_SESSION_INFO
  state.user = data.user
}
export function dataUser (state, data) {
  console.log(data)
  state.user = data
}
export function logout (state) {
  localStorage.removeItem('HIGHIT_SESSION_INFO')
  state.HIGHIT_SESSION_INFO = ''
  state.user = ''
}

export function saveDataEvent (state, data) {
  localStorage.setItem('HIGHIT_SESSION_INFO', JSON.stringify(data))
  state.HIGHIT_SESSION_INFO = data.HIGHIT_SESSION_INFO
  state.data_event = data.data_event
}
