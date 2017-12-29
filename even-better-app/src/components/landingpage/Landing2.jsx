import React, { Component } from 'react'
import axios from 'axios'
import Resource from '../../models/resource'

const UserStore = Resource('users')

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

class Landing2 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          user: {},
          invites: [],
          mediationRequests: [],
          activeBets: []
        }
    }

    categorize = (bets) => {
        for (var bet of bets) {
            if (!bet.has_accepted) {
                if (bet.mediator_id  == this.props.currentUser) {
                    this.setState({
                        ...this.state,
                        mediationRequests: this.state.mediationRequests + JSON.stringify(bet)
                    })
                } else if (bet.creator_id != this.props.currentUser) {
                    this.setState({
                        ...this.state,
                        invites: this.state.invites + JSON.stringify(bet)
                    })
                }
            } else {
                this.setState({
                    ...this.state,
                    activeBets: this.state.activeBets + JSON.stringify(bet)
                })
            }
        }
    }

    componentWillMount() {
        UserStore.find(this.props.currentUser)
          .then((response) => {
            this.setState({
              ...this.state,
              user: response
            })
          })
    }

    componentDidMount() {
        // Get ALL bets for current user
        // categorize bets
        axios.get(`/api/v1/bets.json`, config)
        .then(response => {
            console.log("Received bets: " + response.data);
            this.categorize(response.data)
        })
    }

    render() {
        return (
            <div>
                {this.state.invites}
                {this.state.mediationRequests} 
                {this.state.activeBets}
            </div>
        )
    }
}

export default Landing2
