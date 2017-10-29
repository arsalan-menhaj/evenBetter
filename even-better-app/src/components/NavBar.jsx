import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Leaderboard from './Leaderboard/Leaderboard'

const styles = {
  bar: {
    backgroundColor: '#263238',
    position: 'fixed'
  },
  button: {
    marginTop: '5px',
    color: '#80DEEA'
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  icon: {
    color: '#FFF',
    marginTop: '11px'
  }
}

const NavBar = (props) => {
  return(
    <AppBar
      title={<Link style={ styles.title } to='/home'>EVEN•BETTER</Link>}
      style={ styles.bar }
      /* showMenuIconButton={ false } */
      iconElementLeft={ <ContentPaste style={ styles.icon } /> }
      iconElementRight={
        props.currentUser ?
        <div>
          <FlatButton label="Home" style={ styles.button } primary={true} containerElement={<Link to='/home'/>} />
          <FlatButton label="About" style={ styles.button } primary={true} containerElement={<Link to='/'/>} />
          <FlatButton onClick = { props.handleLogout } label="Sign Out" style = {styles.button} containerElement={<Link to = '/' />} />
          <FlatButton label="Leaderboard" style={ styles.button } primary={true} containerElement={<Link to='/leaderboard'/>} />

        </div>
      :
        <div>
          <FlatButton label="Login" style={ styles.button } primary={true} containerElement={<Link to='/login'/>} />
          <FlatButton label="Sign Up" style={ styles.button } primary={true} containerElement={<Link to='/signup'/>} />
          <FlatButton label="About" style={ styles.button } primary={true} containerElement={<Link to='/'/>} />
        </div>
      }
    />
  )
}

export default NavBar
