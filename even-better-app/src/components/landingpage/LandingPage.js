import React, { Component } from 'react'
import './css/LandingPage.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import InviteColumn from './InviteColumn'
import BetsColumn from './BetsColumn'
import PopupBets from './PopupBets'
import PointsColumn from './PointsColumn'
import ChangingProgressbar from './ChangingProgressbar'
import CircularProgressbar from 'react-circular-progressbar';
import Resource from '../../models/resource'
import axios from 'axios'

import injectTapEventPlugin from 'react-tap-event-plugin'

import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'


var pointsFunction = require('../landingpage/ranklogic')

const UserStore = Resource('users')

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      invites: [],
      bets: [],
      refreshCount: 0
    }
  }

  // Getter function passed to children
  getMainState = () => {
    return this.state
  }

  // Helper function that allows Invites to be loaded/reloaded
  loadInvites = () => {
    axios.get(`/api/v1/bets/invites.json`, config)
    .then(response => {
      console.log("Reloading Invites" + response.data)
      this.setState({
        ...this.state,
        invites: response.data
      })
      return null
    })
    .catch(error => {
      console.log("Error in invites", error)
    })
  }

  // Helper function that allows Active Bets to be loaded/reloaded
  loadBets = () => {
    axios.get(`/api/v1/bets/acceptances.json`, config)
    .then(response => {
      console.log("Reloading Acceptances" + response.data)
      this.setState({
        ...this.state,
        bets: response.data
      })
      return null
    })
    .catch(error => {
      console.log("Error in Acceptances", error)
    })
  }

  componentWillMount() {
    UserStore.find(this.props.currentUser)
      .then((response) => {
        this.setState({
          user: response
        })
      })
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container fluid={true}>
        <MuiThemeProvider>
          <Row>
            <div>

            </div>
            <Col md="4">
              <div id = "stats">
                <h2>Hello, {this.state.user.username}!</h2>
                <PointsColumn user={this.state.user}/>
                <ChangingProgressbar
                  user={this.state.user}
                  percentages ={[0,pointsFunction.rankDetermine(this.state.user.points).percentageComplete]}
                />
              </div>

            </Col>
            <Col md="4">
              <div className="invite-column">
                <InviteColumn
                  getMainState={this.getMainState}
                  loadInvites={this.loadInvites}
                  loadBets={this.loadBets}/>
              </div>
              <div className=" create-bet-buttons container">
                <PopupBets />
              </div>
            </Col>
            <Col md="4">
              <BetsColumn
              user={this.state.user}
              getMainState={this.getMainState}
              loadBets={this.loadBets}/>
            </Col>
          </Row>
        </MuiThemeProvider>
      </Container>
    )
  }
}

export default LandingPage
