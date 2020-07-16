import React from 'react';
import{makeStyles}from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { 
  Grid
} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  redSocialItem:{
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(1),
    maxWidth: '50px',
    maxHeight: '50px',
  }
}))

const SocialButtons = () => {
  const classes = useStyles();
  const ListRedesSociales = [
    {
      id:'IconFacebook',
      path:'https://www.facebook.com/suizalab',
      image:'images/Login/icon-facebook.png'
    },
    {
      id:'IconLinkedin',
      path:'https://www.linkedin.com/in/suiza-lab-89761971',
      image:'images/Login/icon-linkedin.png'
    },
    {
      id:'IconTwitter',
      path:'https://twitter.com/SuizaLab',
      image:'images/Login/icon-twitter.png',

    },
    {
      id:'IconYoutube',
      path:'https://www.youtube.com/user/suizalabmarketing?feature=c4-feed-u',
      image:'images/Login/icon-youtube.png',
      
    }
  ]  
  return (
    <>
    {
      ListRedesSociales&&ListRedesSociales.map(rs=>
        <Grid 
          key={rs.id}                    
          item 
          xs
        >
          <Link 
            to={rs.path}
            target="_blank"
          >
            <img                         
              className={classes.redSocialItem}
              src={rs.image} 
              alt={rs.id} 
            />
          </Link>
        </Grid>  
      )
    }       
    </>
  )
}

export default SocialButtons
