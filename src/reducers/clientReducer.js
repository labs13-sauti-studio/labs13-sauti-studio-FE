import {
    LOAD_CLIENTS_START,
    LOAD_CLIENTS_SUCCESS,
    LOAD_CLIENTS_FAILURE,
  } from 'actions'
  
  const clientState = {
    id: null,
    phone_num: null,
    isActive: null,
    workflow_id: null,
    client_id: null,
    code: null,
    loading: false,
    msg: null,
    error: null
  }
  
  const SET_ACTIVE_CLIENT = 'SET_ACTIVE_CLIENT'
  const clientReducer = (state = clientState, action) => {
    switch (action.type) {
      case LOAD_CLIENTS_START:
        return { ...state, loading: true }
  
      case LOAD_CLIENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          msg: 'Success',
          ...action.payload,
        }
  
      case LOAD_CLIENTS_FAILURE:
        return { ...state, error: true, msg: action.payload }
  
      case SET_ACTIVE_CLIENT:
        return { ...state, question_id: action.payload }
  
      default:
        return state
    }
  }
  export default clientReducer
  