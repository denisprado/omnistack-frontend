import React, { Component } from 'react';
import logo from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.scss'


export default class Main extends Component {
  state = {
    newBox: '',
    boxes: []
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    this.props.history.push(`/box/${response.data._id}`)
  }

  handleRemove = async (_id) => {
    const response = await api.delete('boxes', {
      data: {
        _id: _id
      }
    })
    const newBoxes = await api.get('boxes');
    this.setState({ boxes: newBoxes.data })
  }

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value })
  }

  componentDidMount = async () => {
    const response = await api.get('boxes');
    this.setState({ boxes: response.data })
    console.log(this.state.boxes)
  }

  render() {
    return (
      <div id="main-container">

        <ul>
          {this.state.boxes ? (this.state.boxes.map((box, index) => (
            <li key={box._id}>
              <a className="FileInfo" href={"/box/" + box._id}>{box.title}</a><button onClick={() => this.handleRemove(box._id)}>Remove</button>
            </li>
          )))
            : ("Nenhuma box")}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="" />
          <input placeholder="Criar um box" value={this.state.newBox} onChange={this.handleInputChange} />
          <button type="submit">Criar</button>
        </form>
      </div>
    )
  }
}
