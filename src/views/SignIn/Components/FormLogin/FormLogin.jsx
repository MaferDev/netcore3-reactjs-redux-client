import React, { useState, useEffect, useRef } from 'react'
import{makeStyles}from '@material-ui/styles'
import validate from 'validate.js'
import { 
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core'

import CircularProgress from '@material-ui/core/CircularProgress'
import WarningIcon from '@material-ui/icons/Warning'

const useStyles = makeStyles(theme=>({
  form:{
    marginBottom:'1rem',
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    '& *':{
      textAlign:'left'
    }   
  },
  textField: {    
    marginTop: theme.spacing(2),
    '& *':{
      borderRadius:'1rem',
    },
    '& label':{
      color:theme.palette.text.secondary,
    },

  },
  signInButton: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    borderRadius:'1rem',    
  },
  mensajeLogin:{
    ...theme.typography.caption,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    textAlign:'center',
    color:theme.palette.danger.main,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }

}))

const schema = {
  user: {
    presence: { allowEmpty: false, message: '. Su usuario es incorrecto!' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: '. Su contraseña es incorrecta!' },
    length: {
      maximum: 20
    }
  }
}

const FormLogin = props => {
  const classes = useStyles()
  const { history } = props

  const listSedes=[
    {
      id:'04',
      name:'CHICLAYO'
    },
    {
      id:'03',
      name:'LOS OLIVOS'
    },
    {
      id:'02',
      name:'MIRAFLORES'
    },
    {
      id:'01',
      name:'SURCO'
    },
  ]

  const [sede, setSede] = useState('02');

  const handleChangeSede = (event) => {
    setSede(event.target.value);
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values])

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  
  const [loading, setLoading] = useState(false)
  const [mensajeLogin,setMensajeLogin] = useState(null)
  const timer = useRef()
  
  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleSignIn = event => {
    event.preventDefault()

    //history.push('/')
    
    if (!loading) {
      setLoading(true)
      setMensajeLogin(null)

      timer.current = setTimeout(() => {
        setLoading(false)
        setMensajeLogin('Su correo y contraseña estan incorrectos.')
        

      }, 2000)
    }
  }  
  return (
    <form
      className={classes.form}
      onSubmit={handleSignIn}
    >
      <TextField
        className={classes.textField}
        error={hasError('user')}
        fullWidth
        helperText={
          hasError('user') ? formState.errors.user[0] : null
        }
        label="Usuario"
        name="user"
        onChange={handleChange}
        type="text"
        value={formState.values.user || ''}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        error={hasError('password')}
        fullWidth
        helperText={
          hasError('password') ? formState.errors.password[0] : null
        }
        label="Contraseña"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ''}
        variant="outlined"
      />

      <TextField
        label="Sede"
        className={classes.textField}
        select
        fullWidth
        value={sede}
        onChange={handleChangeSede}
        variant="outlined"
      >
        {listSedes.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      {
        mensajeLogin&&<div className={classes.mensajeLogin}><WarningIcon /> {mensajeLogin}</div> 
      }
      <div className={classes.wrapper}>
        <Button
          className={classes.signInButton}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
          disabled={!formState.isValid||loading}
          onClick={handleSignIn}
        >
          Iniciar Sesión
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>

    </form>  
  )
}

export default FormLogin
