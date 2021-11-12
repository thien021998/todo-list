import React, { Component } from 'react';
import './style.css'
import TodoApi from '../api/TodoApi';
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  signUP = async () => {
    let data = {}
    data.username = this.state.username
    data.password = this.state.password
    const res = await TodoApi.signUp(data)
    if(res.message){
      alert(res.message)
    } else {
      alert("Đăng ký thành công ! Hãy nhấn đăng nhập")
    }
  }

  signIn = async () => {
    try {
      let data = {}
      data.username = this.state.username
      data.password = this.state.password
      const res = await TodoApi.logIn(data)
      if (res.message) {
        alert(res.message)
      } else {
        localStorage.setItem("username", res.username)
        this.props.history.push("/");
      }
    }
    catch {
      alert("Đăng nhập thất bại !")
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="form">
        <form className="align">
          <div className="mb-3">
            <label className="form-label text-start d-block">Username :</label>
            <input name="username" type="text" className="form-control" value={this.state.username} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label  text-start d-block">Password :</label>
            <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
          </div>

        </form>
        <button type="submit" className="btn btn-primary align" onClick={this.signUP}>Sign up</button>
        <button type="submit" className="btn btn-primary align" onClick={this.signIn}>Sign in</button>
      </div>
    );
  }
}

export default LogIn;
