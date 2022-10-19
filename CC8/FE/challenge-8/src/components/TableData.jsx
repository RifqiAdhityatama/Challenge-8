import { Component } from "react";
import { Button, Container, Table } from 'react-bootstrap';

class MenuTable extends Component{
  render(){
    return(
      <div className="table-section">
        <Container>
          <Table striped>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.players.map((player) => (
                  <tr key={player.id}>
                    <td>{player.username}</td>
                    <td>{player.email}</td>
                    <td>{player.password}</td>
                    <td>
                      <Button variant="primary" onClick={ () => { this.props.editFunc(player) } }>UPDATE</Button>
                      <Button variant="danger" onClick={ () => { this.props.deleteFunc(player.id) } }>DELETE</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default MenuTable