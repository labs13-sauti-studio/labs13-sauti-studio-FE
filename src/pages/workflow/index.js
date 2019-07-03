/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { Divider, Tabs, Tab, LinearProgress } from '@material-ui/core'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserLayout from '@/userLayout'
import { loadWorkflow, fetchResponses } from 'actions'
import SortableTree from '@/SortableTree'
import { toggleDeleteModal, toggleResModal } from 'actions/responsesActions'
import { setWorkflowTab } from 'actions/uiActions'
import { Flex } from '@/utility'

const CenteredTabs = connect(
  state => ({
    tab: state.ui.workflowTab,
  }),
  { setWorkflowTab }
)(({ setWorkflowTab }) => {
  const [value, setValue] = React.useState(0)

  return (
    <Tabs
      value={value}
      onChange={(event, index) => setValue(index)}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Builder" onClick={() => setWorkflowTab(value)} />
      <Tab label="Clients" onClick={() => setWorkflowTab(value)} />
    </Tabs>
  )
})

class WorkflowPage extends Component {
  componentDidMount() {
    const workflow = this.props['*'].replace('workflow/', '')
    this.props.loadWorkflow(workflow)
    this.props.fetchResponses(workflow)
  }

  render() {
    const { category, name, responses, loading, tab, workflow } = this.props

    return loading ? (
      <LinearProgress />
    ) : (
      <UserLayout>
        <CenteredTabs />
        <Divider style={{ marginBottom: '1rem' }} />
        {tab === 0 ? (
          <div>CLIENT LIST</div>
        ) : (
          <>
            <Flex align="center">
              <Typography variant="h3">{name}</Typography>
              <Typography variant="h6" color="textSecondary">
                {category}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {workflow.code}
              </Typography>
            </Flex>
            <SortableTree items={responses} />
          </>
        )}
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
    workflow: state.workflow,
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
