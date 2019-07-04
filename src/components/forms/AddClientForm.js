import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'

export default function AddClientForm() {
  return (
    <React.Fragment>
      <form>
        <Typography variant="h6" gutterBottom>
          Assign Client
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone_num,"
              name="phone_num"
              label="Phone Number"
              minWidth
              autoComplete="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => console.log('cancel')}> Cancel</Button>
            <Button onClick={() => console.log('submitted')}> Submit</Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}
