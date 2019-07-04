import React, { useState } from 'react'
import { List, ListItem, FormControlLabel, Switch } from '@material-ui/core'

const Settings = () => {
  const [sideBar, setSidebar] = useState(false)
  const [allExpanded, setAllExpanded] = useState(false)

  return (
    <List>
      <ListItem>
        {/* Keep Sidebar Open */}
        <FormControlLabel
          label="Keep Sidebar Open"
          labelPlacement="end"
          control={
            <Switch
              checked={sideBar}
              onChange={() => setSidebar(!sideBar)}
              value="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
        />
      </ListItem>
      {/* Auto Expand Workflow */}
      <ListItem>
        {/* Keep Sidebar Open */}
        <FormControlLabel
          label="Expanded Tree"
          color="primary"
          labelPlacement="end"
          control={
            <Switch
              checked={allExpanded}
              onChange={() => setAllExpanded(!allExpanded)}
              value="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
        />
      </ListItem>
    </List>
  )
}

export default Settings
