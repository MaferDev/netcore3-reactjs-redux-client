import React from 'react'
import{makeStyles}from '@material-ui/styles'

import { Grid } from '@material-ui/core';

import {
  ButtonsTop as ButtonsTopView,
  ListPacientes as ListPacientesView
} from './components'
const useStyles = makeStyles(theme=>({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1),
  },
}))
const Citas = ()=> {  
  const classes = useStyles()
  return (
    <div className={classes.root} >
      <Grid
          container
          spacing={3}
        >          
          <ButtonsTopView/>
          <ListPacientesView />
        </Grid>
    </div>
  )
}

export default Citas