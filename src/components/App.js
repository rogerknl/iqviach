import React, { Component } from 'react';
import NoteModify from './NoteModify';
import NoteAdd from './NoteAdd';
import NoteList from './NoteList';
import './App.css';

class App extends Component {
  //setting inital state
  constructor(props){
    super(props);
    this.state = { 
      notes: [
        { header:
          { previous_hash: null, hash: null },
          data: { title: null, description: null, created_at: null }
        }
      ]
    };
  }
  renderAddOrModify(){
    if (false){
      return <NoteModify></NoteModify>
    }
    else{
      return <NoteAdd></NoteAdd>
    }

  }
  render() {
    return (
      <div className="App">
        <NoteList notes={this.state.notes}></NoteList>
        {this.renderAddOrModify()}
      </div>
    );
  }
}

export default App;
