import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.item.content || '',
    }
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleOnSave = async () => {
    const { handleSave } = this.props
    await handleSave({ content: this.state.content })
  }

  render() {
    const { handleCancel } = this.props
    return (
      <div className="col-6 offset-3 mb-3">
        <form>
          <div>
            <label className="form-label text-start d-block" htmlFor="fname">Content:</label>
            <input className="form-control" type="text" name="content" value={this.state.content} onChange={this.handleChange} />
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="button" className="btn btn-primary mx-2" onClick={this.handleOnSave}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TodoForm
