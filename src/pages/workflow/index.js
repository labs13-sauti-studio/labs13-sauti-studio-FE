/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { Button, Container, Divider, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserLayout from '@/userLayout'
import { loadWorkflow, fetchResponses } from 'actions'
import styled from 'styled-components'
import { palette, spacing, borders } from '@material-ui/system'
import SortableList from '@/tree'

class WorkflowPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const workflow = this.props['*'].replace('workflow/', '')
    this.props.loadWorkflow(workflow)
    this.props.fetchResponses(workflow)
  }

  render() {
    const { category, name, responses, questions } = this.props

    return (
      <UserLayout>
        <Container>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h6" color="textSecondary">
            {category}
          </Typography>
          <Divider style={{ margin: '1rem 0' }} />
          {!questions || questions.length < 1 ? (
            <Typography variant="h4">Add first question</Typography>
          ) : null}
        </Container>
        <Container style={{ marginBottom: '1rem' }}>
          <InputWrapper style={{ width: '50%' }}>
            <TextField
              id="outlined-name"
              label="New Question"
              name="question_text"
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
              style={{ width: '100%' }}
            />
            <Button
              size="large"
              color="primary"
              variant="contained"
              aria-label="Add"
              onClick={() => console.log('add')}
            >
              Add
            </Button>
          </InputWrapper>
        </Container>
        <Container>
          {this.props.isLoadingResponses ? null : (
            <SortableList items={responses} />
          )}
        </Container>
      </UserLayout>
    )
  }
}

export default connect(
  state => ({
    id: state.workflow.id,
    name: state.workflow.name,
    category: state.workflow.category,
    area_code: state.workflow.area_code,
    responses: state.responses.unSaved,
    isLoadingResponses: state.responses.isLoadingResponses,
  }),
  {
    loadWorkflow,
    fetchResponses,
  }
)(WorkflowPage)

const Box = styled.div`
  ${palette}
  ${spacing}
  ${borders}
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  button {
    margin-left: 1rem;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  button {
    margin-left: 1rem;
  }
`

WorkflowPage.propTypes = {
  '*': PropTypes.string.isRequired,
  answers: PropTypes.array,
  category: PropTypes.string,
  dispatch: PropTypes.func,
  id: PropTypes.number,
  isDeleteQuestionModalOpen: PropTypes.bool,
  name: PropTypes.string,
  question_id: PropTypes.number,
  questions: PropTypes.array,
}
