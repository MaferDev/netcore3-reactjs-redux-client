import React from 'react';
import{makeStyles}from '@material-ui/styles'
import Carousel from 'react-material-ui-carousel'
import { 
  Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  boxImage:{
    backgroundImage: 'url(images/fondo.jpg)',
    backgroundRepeat: 'repeat',
    width:'100%',    
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image:{
    width:'100%'
  },
}))

const Slider = () => {
  const classes = useStyles()

  var items = [
    {
        id: 1,
        image: 'images/Login/image-login-1.png'
    },
    {
        id: 2,
        image: 'images/Login/image-login-2.png'
    }
  ]
  return (
    <Grid item sm={6} className={classes.boxImage}>
      <Carousel indicators={false}  >
      {
        items.map( item =>
          <img className={classes.image} key={item.id} src={item.image} alt='Imagen portada' />
        )
      }
      </Carousel>
    </Grid>   
  )
}

export default Slider
