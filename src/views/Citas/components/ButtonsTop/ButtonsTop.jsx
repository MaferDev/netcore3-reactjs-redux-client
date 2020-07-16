import React from 'react'
import{makeStyles}from '@material-ui/styles'

import { Button , Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const useStyles = makeStyles(theme=>({
  root: {
    padding: theme.spacing(3),
    paddingTop:0,
    width:'100%'
  },
  buttons:{
    textAlign:'end',
  },
  button: {
    margin: theme.spacing(1),
  },
}))
const ButtonsTop = ()=> {  
  const classes = useStyles()
  return (
    <div className={classes.root} >
      <div className={classes.buttons}>
          <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Nueva Cita
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<ImportExportIcon />}
        >
          Exportar
        </Button>
      </div>
    </div>
  )
}

export default ButtonsTop