import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Resource from '../../../../models/resource'
const UserCompleteStore = Resource('users')


/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */

export default class UsersAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      chipValue:[]
    };

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
  }

  chipCallback = (searchText) => {
    const sendUsersToState = this.state.chipValue
    let temp = {}
    UserCompleteStore.findAll()
      .then(response => {
        response.forEach((user)=> {

          if(user.username == searchText) {
            temp = {
              userId: user.id,
              username: user.username
            }

            sendUsersToState.push(temp)
          }
          this.setState({chipValue: sendUsersToState})
        })
        console.log("state of chipValue: ", this.state.chipValue)
    })
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = (searchText) => {

    this.chipCallback(searchText)
    this.props._handleUsersFieldChange(this.state.chipValue)
    this.setState({
      searchText: ''
    });

  };

  handleRequestDelete = (data) => {
    let chipData = this.state.chipValue;
    chipData.map((chip) => {
      if(chip.username == data.username) {
        var index = chipData.indexOf(data)
        chipData.splice(index,1)
      }
    })
    this.setState({chipValue: chipData});
  };


  render() {
    return (
      <div>
        {
          this.state.chipValue.map((chip) => {
          let chipUsername = chip.username

          return <Chip  style={this.styles.chip}
                        onRequestDelete={() => this.handleRequestDelete(chip)}>
            {chipUsername}
          </Chip>
          })
        }
        <AutoComplete
          hintText="Pick users to bet"
          listStyle={{ maxHeight: 200, overflow: 'auto' }}
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          dataSource={this.props.usersList}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
          errorText = {this.props.error}
        />
      </div>
    );
  }
}

// onUpdateInput={this.props._handleUsersFieldChange}
