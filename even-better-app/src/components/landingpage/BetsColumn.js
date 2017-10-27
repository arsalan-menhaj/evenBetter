import React, {Component} from 'react';

import Resource from '../../models/resource'
const BetListStore = Resource(`/api/v1/bets/acceptances`)

export default class BetsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_bets: []
    };
  }

  componentWillMount() {
    var listofBets= []
    BetListStore.findAll()
    .then((result) => {
        console.log("AXIOS CALL", result)
        result.map((bet) => {
            listofBets.push(bet)
        })
        this.setState({
            user_bets: listofBets
        })
    })
    .catch((errors) => console.log("AXIOS CALL", errors))
}

  render() {
    return (
      <div>
      <h3 className="text-center"> List of Bets </h3>
      <table class="table">
        <thead>
          {
            <tr>
              <th>Type</th>
              <th>Bet Name</th>
              <th>Result</th>
              <th>Deadline</th>
            </tr>
          }
        </thead>

        <tbody>
          {
            this.state.user_bets.map((bet) => {
              return (<tr class="success">
                <td>Sport Bet</td>
                <td>{bet.title}</td>
                <td>WIN</td>
                <td>{bet["betting_deadline"]}</td>
              </tr>);
            })
          }
        </tbody>
      </table>
    </div>
    );
  }
}
