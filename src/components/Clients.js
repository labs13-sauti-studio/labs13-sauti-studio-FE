/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadUserWorkflowsClient,
  closeWorkflowModal,
  addUserWorkflow,
  addUserWorkflowClient
} from 'actions'
import { axiosInstance } from 'helpers'
class Clients extends Component {
  constructor() {
    super()

    this.state = {
      phone_num: '',
      isActive: 'true',
      workflow_id: '1'
    }
  }

 
  componentDidMount() {
    axiosInstance.get(`https://sauti-studio.herokuapp.com/clients`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { phone_num, isActive, workflow_id } = this.state
    const obj = { phone_num, isActive, workflow_id }
    const { dispatch } = this.props

    dispatch(addUserWorkflowClient(obj))
    dispatch(loadUserWorkflowsClient())
  }

  render() {
    return (
    <div>
      <TextField id="time" type="text" />
    </div>

    )
  }
}

export default Clients