class TodoApi {
  url = 'https://todo-mvc-api-typeorm.herokuapp.com/api/todos'
  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3OTdhYTI4LTBkNjQtNGE2MS05OTllLTkxZDBhN2ZkMTc1MCIsImlhdCI6MTYyNDMzNzcyNSwiZXhwIjoxNjI0OTQyNTI1fQ.NBmCaV75x9eLwPQdQj9vZIb4V12tJH6w3_TFSbUZBrA'

  getAll = async () => {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Authorization: this.token
      }
    })

    return response.json()
  }

  getOne = async (id) => {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: this.token
      }
    })

    return response.json()
  }

  create = async (data) => {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }

  update = async (id, data) => {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token
      },
      body: JSON.stringify(data)
    })

    return response.json()
  }

  delete = async (id) => {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token
      }
    })

    return response.json()
  }

  logIn = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      return response.json()
  }

  signUp = async (data) => {
    const response = await fetch('https://todo-mvc-api-typeorm.herokuapp.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      return response.json()
  }
}

export default new TodoApi()
