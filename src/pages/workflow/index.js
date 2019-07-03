/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { LinearProgress } from '@material-ui/core'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserLayout from '@/userLayout'
import { loadWorkflow, fetchResponses } from 'actions'
import SortableTree from '@/SortableTree'
// import DeleteWarningModal from '@/DeleteWarningModal'
import { toggleDeleteModal, toggleResModal } from 'actions/responsesActions'
import { setWorkflowTab } from 'actions/uiActions'
// import AddModal from '@/AddModal'
import { makeStyles } from '@material-ui/core/styles'

import Clients from '../../components/Clients'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const CenteredTabs = connect(
  state => ({
    tab: state.ui.workflowTab,
  }),
  { setWorkflowTab }
)(({ setWorkflowTab }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Builder" onClick={() => setWorkflowTab(value)} />
        <Tab label="Clients" onClick={() => setWorkflowTab(value)} />
      </Tabs>
    </Paper>
  )
})

class WorkflowPage extends Component {
  componentDidMount() {
    const workflow = this.props['*'].replace('workflow/', '')
    this.props.loadWorkflow(workflow)
    this.props.fetchResponses(workflow)
  }

  render() {
    const { category, name, responses, code, loading } = this.props

    const TreeBuilder = () =>
      loading ? <LinearProgress /> : <SortableTree items={responses} />

    return (
      <UserLayout>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h6" color="textSecondary">
          {category}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {code}
        </Typography>
        {/* <Divider style={{ margin: '1rem 0' }} /> */}
        <CenteredTabs></CenteredTabs>
        <br></br>
        {this.props.tab === 0 ? <div>CLIENT LIST <Clients /></div> : <TreeBuilder />}
      </UserLayout>
    )
  }
}

export default connect(
  state => ({
    tab: state.ui.workflowTab,
    id: state.workflow.id,
    name: state.workflow.name,
    category: state.workflow.category,
    area_code: state.workflow.area_code,
    responses: state.responses.unSaved,
    loaded: state.responses.loaded,
    loading: state.responses.isLoadingResponses,
    isAddEditModalOpen: state.responses.isAddEditModalOpen,
    isDeleteModalOpen: state.responses.isDeleteModalOpen,
    active: state.responses.modal,
  }),
  {
    toggleDeleteModal,
    toggleResModal,
    loadWorkflow,
    fetchResponses,
  }
)(WorkflowPage)

WorkflowPage.propTypes = {
  '*': PropTypes.string.isRequired,
  category: PropTypes.string,
  name: PropTypes.string,
}
