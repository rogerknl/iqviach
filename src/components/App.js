import React, { Component } from 'react';
import NoteModify from './NoteModify';
import NoteAdd from './NoteAdd';
import NoteList from './NoteList';
import hexString from '../helpers/helpers';

import './App.css';

class App extends Component {
  //setting inital state
  constructor(props){
    super(props);
    this.state = { 
      selectedItem: null,
      notes: [
        { header:
          { previous_hash: null, hash: null },
          data: { title: null, description: null, created_at: null }
        }
      ]
    };
  }

  saveNote = newNote =>{
    const encoder = new TextEncoder();
    const notes = [...this.state.notes];
    // Modify last item of the array(auxiliar) with the new item values
    notes[this.state.notes.length - 1].data.title = newNote.title;
    notes[this.state.notes.length - 1].data.description = newNote.description;
    notes[this.state.notes.length - 1].data.created_at = Date.now();
    // encode title,description, previous_has as ArrayBuffer
    let data = encoder.encode(JSON.stringify(newNote.title + ',' + newNote.description + notes[this.state.notes.length - 1].header.previous_hash ));
    // if browser is not ie webcrypto is window.crypto else is window.msCrypto
    if ( window.crypto ){
      window.crypto.subtle.digest('SHA-256', data)
      .then(response => {
        let hashStr = hexString(response);
        notes[this.state.notes.length - 1].header.hash = hashStr;
        notes.push(      
          { header:
            {
              previous_hash: hashStr,
              hash: null
            },
            data: {
              title: null,
              description: null,
              created_at: null
            }
          });
        this.setState ({ notes: notes } )
      });
    }
    else {
      let crypt = window.msCrypto;
      let hashStr = hexString(crypt.subtle.digest('SHA-256', data).result)
      notes[this.state.notes.length - 1].header.hash = hashStr;
      notes.push(      
        { header:
          {
            previous_hash: hashStr,
            hash: null
          },
          data: {
            title: null,
            description: null,
            created_at: null
          }
        });
      this.setState ({ notes: notes } )
    }
  }
  cancelModify = () => {
    this.setState({selectedItem: null});
  }
  saveModify = newNote => {
    const encoder = new TextEncoder();
    const notes = [...this.state.notes];
    notes[this.state.selectedItem].data.title = newNote.title;
    notes[this.state.selectedItem].data.description = newNote.description;
    let data = encoder.encode(JSON.stringify(newNote.title + ',' + newNote.description + notes[this.state.selectedItem].header.previous_hash ));
    if ( window.crypto ){
      window.crypto.subtle.digest('SHA-256', data)
      .then(response => {
        let hashStr = hexString(response);
        notes[this.state.selectedItem].header.hash = hashStr;
        this.setState ({ selectedItem: null, notes: notes } )
      });
    }
    else {
      let crypt = window.msCrypto;
      let hashStr = hexString(crypt.subtle.digest('SHA-256', data).result)
      notes[this.state.selectedItem].header.hash = hashStr;
      this.setState ({ selectedItem: null, notes: notes } )
    }
  }
  selectItem = key => {
    console.log(key)
    if (this.state.selectedItem == null)
      this.setState({selectedItem: key});
  }
  renderAddOrModify(){
    if (this.state.selectedItem != null){
      return <NoteModify note = {this.state.notes[this.state.selectedItem].data} saveModify = {this.saveModify} cancelModify = { this.cancelModify }></NoteModify>
    }
    else{
      return <NoteAdd saveNote={this.saveNote}></NoteAdd>
    }

  }
  render() {
    return (
      <div className="App">
        <NoteList notes={this.state.notes} selectItem = {this.selectItem }></NoteList>
        {this.renderAddOrModify()}
      </div>
    );
  }
}

export default App;
