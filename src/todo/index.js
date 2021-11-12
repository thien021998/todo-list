import React from 'react'
import { Redirect } from 'react-router-dom'
import TodoApi from '../api/TodoApi'
import TodoForm from './Form'
import './style.css'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      records: [],
      itemEditing: undefined,
    }
  }

  async componentDidMount() {
    const data = await TodoApi.getAll()
    this.setState({ records: data.items })
  }

  handleEditItem = (record) => {
    this.setState({ itemEditing: record })
  }

  handleDeleteItem = async (id) => {
    try {
      const res = await TodoApi.delete(id)
      console.log('res handleDeleteItem', res)
      console.log(id)
    }
    catch {
      let index = this.state.records.findIndex(i => i.id === id)
      this.state.records.splice(index, 1)
      this.setState({ records: this.state.records })
    }
  }

  handleCancel = () => {
    this.setState({ itemEditing: undefined })
  }

  handleSave = async (data) => {
    let res
    if (this.state.itemEditing.id) {
      // update
      res = await TodoApi.update(this.state.itemEditing.id, data)
      if (res.id) {
        const newRecords = this.state.records.map((record) => {
          if (record.id === res.id) {
            record = { ...record, ...res }
          }
          return record
        })

        this.setState({ records: newRecords })
      }

    } else {
      // create
      res = await TodoApi.create(data)
      if (res.id) {
        this.setState({ records: [res, ...this.state.records] })
      }
    }

    if (res.message) {
      alert(res.message)
    } else {
      this.handleCancel()
    }
  }
  handleLogOut = () => {
    localStorage.removeItem("username")
    this.props.history.push("/login")
  }
  render() {
    if (!localStorage.getItem("username")) {
      return <Redirect to="/login" />
    } else {
      return (
        <div className="row no-gutters">
          <button className="btn align btn-logout btn-primary" style={{marginLeft: '80%'}} onClick={this.handleLogOut}>LogOut</button>
          <h2 className="title">Render Form Todo-List with Reactjs</h2>
          <div>
            <button className="btn btn-primary align" onClick={() => this.handleEditItem({})}>Create new item</button>
          </div>
          {!!this.state.itemEditing && <TodoForm item={this.state.itemEditing} handleCancel={this.handleCancel} handleSave={this.handleSave} />}
          <div className="col-12 table-wrapper">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Create-date</th>
                  <th>Update-date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.records.map((record) => {
                    return (
                      <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.content}</td>
                        <td>{record.status}</td>
                        <td>{record.created_at.split("T", 1)}</td>
                        <td>{record.updated_at.split("T", 1)}</td>
                        <td>
                          <button className="btn btn-warning" onClick={() => this.handleEditItem(record)}>
                            Edit
                          </button>
                          <button className="btn btn-danger" onClick={async () => await this.handleDeleteItem(record.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  }
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}

export default Todo
