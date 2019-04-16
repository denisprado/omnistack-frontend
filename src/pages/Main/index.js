import React, { Component } from 'react';
import api from '../../services/api'
import './styles.scss'
import MenuLateral from '../../components/Menu'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBox: '',
      boxes: []
    };
    // This binding is necessary to make `this` work in the callback

  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    this.props.history.push(`/box/${response.data._id}`)
  }

  handleInputChange = (e) => {
    this.setState({ newBox: e.target.value })
  }

  render() {
    return (
      <div id="main-container">
        <MenuLateral />
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Criar um box" value={this.state.newBox} onChange={this.handleInputChange} />
          <button type="submit">Criar</button>
        </form>
      </div>
    )
  }
}
