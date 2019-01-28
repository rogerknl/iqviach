import React, { Component } from 'react';

import './NoteModify.css';

class NoteModify extends Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.note.title , description: this.props.note.description};
  }

  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.saveModify(this.state);
    this.setState({  title: '' , description: '' });
  };

  render() {
    return (
      <div className="NoteModify">
        <form onSubmit={this.handleSubmit}>
          <h4>Modify a Note</h4>
          <label>Title
            <input type="text" onChange={this.handleChangeTitle} value={this.state.title} />
          </label>
          <label>Description
            <textarea onChange={this.handleChangeDescription} value={this.state.description} />
          </label>
          
          <div>
            <button>Modify Note</button>
            <button type="button" onClick={this.props.cancelModify}>Cancel</button>    
          </div>
        </form>
      </div>
    );
  }
}

export default NoteModify;
