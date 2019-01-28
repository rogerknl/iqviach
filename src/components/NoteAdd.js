import React, { Component } from 'react';

import './NoteAdd.css';

class NoteAdd extends Component {
  constructor(props){
    super(props);
    this.state = { title: '' , description: ''};
  }
  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  };
  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.saveNote(this.state);
    this.setState({  title: '' , description: '' });
  };
  render() {
    return (
      <div className="NoteAdd">
        <form onSubmit={this.handleSubmit}>
          <h4>Add a Note</h4>
          <label>Title
            <input type="text" onChange={this.handleChangeTitle} value={this.state.title} />
          </label>
          <label>Description
            <textarea onChange={this.handleChangeDescription} value={this.state.description} />
          </label>
          
          <div>
            <button>Submit Note</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NoteAdd;
