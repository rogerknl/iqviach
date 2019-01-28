import React, { Component } from 'react';

import './NoteList.css';

class NoteList extends Component {
  renderNotes(){
    //if notes is only 1 intem length List is empty only contains auxiliar element
    if (this.props.notes.length === 1) {
      return "The list of notes is empty"
    }
    else {
      const arrAux = [];
      for( let i = 0; i < this.props.notes.length-1; i++ ) {
        const note = this.props.notes[i].data;
        //if element's hash and next element previous_hash are the same, note is OK
        if (this.props.notes[i].header.hash === this.props.notes[i+1].header.previous_hash ){
          arrAux.push(
            (<div onClick = { () => this.props.selectItem(i) } className = "NoteOK" key={ i } >
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <p>{note.created_at}</p>
            </div>)
          );
        } else { //if element's hash and next element previous_hash are different, note is not OK
          arrAux.push(
            (<div onClick = { () => this.props.selectItem(i) } className = "NoteKO" key={ i } >
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <p>{note.created_at}</p>
            </div>)
          );
        }
      }
      return arrAux;
    }

  }
  render() {
    return (
      <div className="NoteList">
        {this.renderNotes()}
      </div>
    );
  }
}

export default NoteList;
