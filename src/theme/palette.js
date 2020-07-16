import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark:'#249396',
    main: '#2CAAB2',
    light: '#33C9CF'
  },
  secondary: {
    contrastText: white,
    dark: '#555555',
    main: '#B2B2B2',
    light: '#eeeeee'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[700],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark:'#249396',
    main: '#2CAAB2',
    light: '#33C9CF'
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  danger: {
    contrastText: white,
    dark: colors.deepOrange[900],
    main: colors.deepOrange[600],
    light: colors.deepOrange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: '#FF020B'
  },
  text: {
    secondary: '#2CAAB2',
    primary: '#707070',
    link: '#2CAAB2'
  },
  background: {
    default: '#fafafa',
    paper: '#FFF'
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};
