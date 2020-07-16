import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
}));

const AlertNotification = ({type,message,paciente}) => {  

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [typeAlert, setTypeAlert] = React.useState(type);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  React.useEffect(()=>{
      if(paciente.isRequestError){
        setOpen(true)
        setTypeAlert('error')
      }
      else{        
        setTypeAlert('success')
        if(paciente.isShowAlert) setOpen(true)
      }
  },[paciente.isRequestError,paciente.isShowAlert])
  
  return (
    <div className={classes.root}>
      <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open}  autoHideDuration={6000}   onClose={handleClose} >
        <Alert onClose={handleClose} severity={typeAlert}>
          {message||paciente.requestMessage}
        </Alert>
      </Snackbar>
    </div>

  )
}
const mapStateToProps = state =>({
  paciente:state.paciente
})
export default connect(mapStateToProps,{})(AlertNotification);
