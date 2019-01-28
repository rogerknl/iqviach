import React, { Component } from 'react';
import NoteModify from './NoteModify';
import NoteAdd from './NoteAdd';
import NoteList from './NoteList';
import './App.css';

class App extends Component {
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
        <NoteList></NoteList>
        {this.renderAddOrModify()}
      </div>
    );
  }
}

export default App;
