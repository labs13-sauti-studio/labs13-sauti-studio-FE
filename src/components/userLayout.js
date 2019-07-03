import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dashboard from '@/dashboard'
import { loadUserInfo } from 'actions'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
// const UserLayout = ({ children }) => <Dashboard>{children}</Dashboard>

class UserLayout extends Component {
  async componentDidMount() {
    await this.props.loadUserInfo()
    const status = localStorage.getItem('user')
    if (!status) {
      navigate('/')
    }
  }

  render() {
    const { children, user } = this.props
    return <Dashboard user={user}>{children}</Dashboard>
  }
}

UserLayout.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default connect(
  state => ({
    user: state.user,
    user_id: state.user.id,
  }),
  { loadUserInfo }
)(UserLayout)
