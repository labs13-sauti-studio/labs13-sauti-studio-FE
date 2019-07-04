import { axiosInstance } from 'helpers'

export const LOAD_CLIENTS_START = 'LOAD_CLIENTS_START'
export const LOAD_CLIENTS_SUCCESS = 'LOAD_CLIENTS_SUCCESS'
export const LOAD_CLIENTS_FAILURE = 'LOAD_CLIENTS_FAILURE'

export const loadUserWorkflowsClient = () => dispatch => {
  dispatch({ type: LOAD_CLIENTS_START })
  return axiosInstance
    .get('/clients')
    .then(res => dispatch({ type: LOAD_CLIENTS_SUCCESS, payload: res.data }))
    .catch(err =>
      dispatch({
        type: LOAD_CLIENTS_FAILURE,
        payload: err.message,
      })
    )
}

export const ADD_CLIENT_START = 'ADD_CLIENT_START'
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS'
export const ADD_CLIENT_FAILURE = 'ADD_CLIENT_FAILURE'

export const addUserWorkflowClient = obj => dispatch => {
  dispatch({ type: ADD_WORKFLOW_START })
  axiosInstance
    .post('/clients', obj)
    .then(({ data }) => {
      console.log(data)

      dispatch({ type: ADD_WORKFLOW_SUCCESS, payload: data })
    })
    .catch(() =>
      dispatch({
        type: ADD_CLIENT_FAILURE,
        payload: 'Problem fetching clients',
      })
    )
}

export const SET_USER_WORKFLOWS_CLIENTS = 'SET_USER_WORKFLOWS_CLIENTS'

export const setUserWorkflows = workflows => dispatch => {
  dispatch({ type: 'SET_USER_WORKFLOWS_CLIENTS', payload: workflows })
}
