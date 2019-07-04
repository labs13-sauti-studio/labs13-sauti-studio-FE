/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-default */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  default as ReactSortableTree,
  addNodeUnderParent,
  changeNodeAtPath,
  toggleExpandedForAll,
  getTreeFromFlatData,
  getNodeAtPath,
  getFlatDataFromTree,
} from 'react-sortable-tree'
import { setActiveRes, saveTree } from 'actions/responsesActions'
import { axiosInstance } from 'helpers'
import { TreeStyles } from 'theme'
import { connect } from 'react-redux'
import {
  Button,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { Flex } from '@/utility'

// Example Demo Workflow
const exampleFlow = [
  { id: 1, title: 'Company Info', parent: null, index: 1 },
  { id: 2, title: 'Office Hours', parent: null, index: 2 },
  { id: 3, title: 'Sauti Studio Design', parent: 1, index: 1 },
  { id: 4, title: 'Monday - Friday 9AM-5PM', parent: 2, index: 1 },
  { id: 5, title: 'Company Holidays', parent: 2, index: 2 },
]

const compareTrees = (oldData, newData) => {
  const changed = []
  oldData.forEach(oldRow => {
    const newRow = newData.find(row => oldRow.id === row.id)
    if (oldRow.index != newRow.index) changed.push(newRow)
  })
  return changed
}

const indexGenerator = (treeData, node, nextParentNode) =>
  nextParentNode &&
  nextParentNode.children &&
  nextParentNode.children.length !== 0
    ? nextParentNode.children.findIndex(obj => obj.id === node.id) + 1
    : treeData.findIndex(obj => obj.id === node.id) + 1

const createTree = (rows, settings) =>
  getTreeFromFlatData({
    flatData: rows,
    getKey: node => node.id,
    getParentKey: node => node.parent,
    rootKey: null,
  })

const SortableTree = props => {
  // User Settings
  const [settings, setSettings] = useState({
    expanded: true,
    expandParent: true,
    addAsFirstChild: true,
  })

  // Initial tree state
  const [treeData, setTreeData] = useState(
    props.items.length === 0 ? [] : createTree(props.items, settings)
  )
  const [title, setTitle] = useState('')

  const getNodeKey = ({ treeIndex }) => treeIndex

  const flatData = getFlatDataFromTree({
    treeData,
    getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
    ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
  }).map(({ node, path }) => ({
    ...node,
    id: node.id,
    name: node.name,

    // The last entry in the path is this node's key
    // The second to last entry (accessed here) is the parent node's key
    parent: path.length > 1 ? path[path.length - 2] : null,
  }))

  return (
    <section>
      <Flex align="center">
        <Flex align="center" justify="flex-start">
          <TextField
            id="standard-name"
            variant="outlined"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onKeyDown={event => {
              if (event.keyCode === 13) {
                axiosInstance.post(`/responses/${props.workflow.id}`, {
                  title,
                })
                setActiveRes({ id: null })
                setTitle('')
              }
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: '1rem' }}
            onClick={() => {
              axiosInstance
                .post(`/responses/${props.workflow.id}`, {
                  title,
                })
                .then(({ data: { total } }) => {
                  setTreeData(createTree(total, settings))
                  setTitle('')
                })
            }}
          >
            Add Root
          </Button>
        </Flex>
        <div>
          <FormControlLabel
            label={settings.expanded ? 'Collapse' : 'Expand'}
            labelPlacement="start"
            control={
              <Switch
                checked={settings.expanded}
                onChange={() => {
                  setSettings({
                    ...settings,
                    expanded: !settings.expanded,
                  })
                  setTreeData(
                    toggleExpandedForAll({
                      treeData,
                      expanded: !settings.expanded,
                    })
                  )
                }}
                value="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
          />
        </div>
      </Flex>
      <TreeStyles>
        {/*
        SORTABLE
        TREE
        COMPONENT
         */}
        <ReactSortableTree
          treeData={treeData}
          onMoveNode={({ treeData, node, nextParentNode, path }) => {
            axiosInstance
              .put(`responses/${node.id}`, {
                ...node,
                parent: nextParentNode ? nextParentNode.id : null,
                index: indexGenerator(treeData, node, nextParentNode),
              })
              .then(({ data: { added, total: newData } }) => {
                const changedRows = compareTrees(flatData, newData)

                changedRows.forEach(row =>
                  axiosInstance.put(`/responses/${row.id}`, {
                    ...row,
                    index: indexGenerator(treeData, row, nextParentNode),
                  })
                )
              })
          }}
          onChange={treeData => setTreeData(treeData)}
          onClick={treeData => setTreeData(treeData)}
          generateNodeProps={({ node, path }) => ({
            title:
              node.id === props.active.id ? (
                <TextField
                  id="standard-name"
                  value={node.title}
                  onKeyDown={event => {
                    if (event.keyCode === 13) {
                      axiosInstance.put(`/responses/${node.id}`, node)
                      props.setActiveRes({ id: null })
                    }
                  }}
                  onChange={event =>
                    setTreeData(
                      changeNodeAtPath({
                        treeData,
                        path,
                        getNodeKey,
                        newNode: {
                          ...node,
                          title: event.target.value,
                        },
                      })
                    )
                  }
                />
              ) : (
                <Typography variant="h6">{node.title}</Typography>
              ),
            buttons: [
              // Add new response
              <IconButton
                aria-label="Add"
                size="small"
                onClick={async () =>
                  axiosInstance
                    .post(`responses/${props.workflow.id}`, {
                      title: 'new item',
                      parent: getNodeAtPath({
                        treeData,
                        path,
                        getNodeKey,
                      }).node.id,
                    })
                    .then(({ data: newNode }) => {
                      console.log(newNode)
                      props.setActiveRes(newNode.added)
                      setTreeData(
                        addNodeUnderParent({
                          treeData,
                          parentKey: path[path.length - 1],
                          getNodeKey,
                          newNode: newNode.added,
                          ...settings,
                        }).treeData
                      )
                    })
                }
              >
                <AddIcon />
              </IconButton>,
              // Edit clicked response
              <IconButton
                aria-label="Edit"
                size="small"
                onClick={() => props.setActiveRes(node)}
              >
                <EditIcon />
              </IconButton>,
              // Delete current response
              <IconButton
                aria-label="Delete"
                size="small"
                onClick={() =>
                  axiosInstance
                    .delete(
                      `responses/${
                        getNodeAtPath({
                          treeData,
                          path,
                          getNodeKey,
                        }).node.id
                      }`
                    )
                    .then(({ data: { current } }) =>
                      setTreeData(createTree(current, settings))
                    )
                }
              >
                <DeleteIcon />
              </IconButton>,
            ],
          })}
        />
      </TreeStyles>
    </section>
  )
}

export default connect(
  state => ({
    workflow: state.workflow,
    items: state.responses.unSaved,
    active: state.responses.modal,
    loading: state.responses.hasBeenLoaded,
  }),
  { setActiveRes, saveTree }
)(SortableTree)
