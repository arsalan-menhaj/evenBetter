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
          bets: [],
          invites: [],
          mediationRequests: [],
          activeBets: []
        }
    }

    categorize = () => {
        for (var bet of this.state.bets) {
            if (!bet.has_accepted) {
                if (bet.mediator_id  == this.props.currentUser) {
                    this.setState({
                        ...this.state,
                        mediationRequests: this.state.mediationRequests.push(bet)
                    })
                } else if (bet.creator_id != this.props.currentUser) {
                    this.setState({
                        ...this.state,
                        invites: this.state.invites.push(bet)
                    })
                }
            } else {
                this.setState({
                    ...this.state,
                    activeBets: this.state.activeBets.push(bet)
                })
            }
        }
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
        // Get ALL bets for current user
        // categorize bets
        axios.get(`/api/v1/bets`, config)
        .then(response => {
            console.log("Received bets");
            this.categorize()
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.bets)}  
                {JSON.stringify(this.state.invites)}
                {JSON.stringify(this.state.mediationRequests)}
                {JSON.stringify(this.state.activeBets)}
            </div>
        )
    }
}

export default Landing2
