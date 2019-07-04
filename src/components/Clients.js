/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUserWorkflowsClient, addUserWorkflowClient } from 'actions'
import { axiosInstance } from 'helpers'
import AddClientForm from './forms/AddClientForm'

class Clients extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      phone_num: '',
      isActive: 'true',
    }
  }

  componentDidMount() {
    axiosInstance
      .get(`/clients`)
      .then(({ data }) => this.setState({ clients: data }))
      .catch(err => console.log(err))
  }

  activeAccount = event => {
    event.preventDefault()
    console.log('STATE', this.state)
    axiosInstance
      .post('/clients', {
        phone_num: this.state.phone_num,
        isActive: this.state.isActive,
      })
      .then(res => {
        console.log('CLIENTS:', res.data)
      })
      .catch(err => this.setState({ errorMsg: 'ERROR: cant add client' }))
  }

  // TOGGLE CHECKBOX / BUTTON THAT WILL BE USED
  toggleCheck = e => {
    console.log('TOGGLE CHECK')
    this.setState(state => ({ isActive: !state.isActive }))
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
    const { clients } = this.state
    return (
      <div>
        <ul>
          {clients.map((client, i) => (
            <li key={i}>
              <span>{client.phone_num}</span>
              <br></br>
              <span>{client.workflow_id}</span>
            </li>
          ))}
        </ul>
        <div>
          <AddClientForm />
        </div>
      </div>
    )
  }
}

export default Clients
