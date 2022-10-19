import { Component } from "react";
import { Button, Form, InputGroup } from 'react-bootstrap';
import TableData from "../components/TableData";



class Home extends Component {
  state = {
    players: [],
    username: '',
    email: '',
    password: '',
    isInsert: true,
    activeId: ''
  }

  retrieveAllPlayer = async () => {
    // Get all player
    const resp = await fetch('http://localhost:5000/api/players')
    const data = await resp.json()
    
    this.setState({
      players: data.message
    })
  }

  createNewPlayer = async () => {
    // Create Player
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    const resp = await fetch('http://localhost:5000/api/players', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(resp.status === 201){
      this.retrieveAllPlayer()
      this.setState({
        username: '',
        email: '',
        password: ''
      })
    }
  }

  componentDidMount(){
    this.retrieveAllPlayer()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  toggleEdit = async (player) => {
    this.setState({
      username: player.username,
      email: player.email,
      password: player.password,
      isInsert: false,
      activeId: player.id
    })
  }

  editPlayer = async () => {
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    const resp = await fetch(`http://localhost:5000/api/players/${this.state.activeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(resp.status === 200){
      this.retrieveAllPlayer()
      this.setState({
        username: '',
        email: '',
        password:'',
        isInsert: true
      })
    }
  }

  deletePlayer = async (id) => {
    const resp = await fetch(`http://localhost:5000/api/players/${id}`,{
      method: 'DELETE'
    })
    if(resp.status === 200){
      this.retrieveAllPlayer()
    }
  }

  render(){
    return (
      <div>
        {/* Form */}
        <div className="input-section">
          <InputGroup className="mb-3">
            <Form.Control
              id="username"
              onChange={this.handleChange}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.username}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              id="email"
              onChange={this.handleChange}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              value={this.state.email}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              id="password"
              onChange={this.handleChange}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              value={this.state.password}
            />
          </InputGroup>
          {
            this.state.isInsert === true ? (
              <Button variant="primary" onClick={this.createNewPlayer}>Submit</Button>
            ) : (
              <Button variant="warning" onClick={this.editPlayer}>Edit</Button>
            )
          }
          {/* End Form */}
        </div>
        <div>
        <TableData 
          players={this.state.players}
          editFunc={(player) => {this.toggleEdit(player)}}
          deleteFunc={(id) => {this.deletePlayer(id)}}
          />
        </div>

      </div>
    )
  }
}

export default Home