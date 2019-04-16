import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import './styles.scss';
import api from '../../services/api'
import { distanceInWords } from 'date-fns'
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone'
import socket from 'socket.io-client';
import MenuLateral from '../../components/Menu'

export default class Box extends Component {
    state = {
        box: {}
    }
    async componentDidMount() {
        this.subscribeToNewFiles();

        const box = this.props.match.params.id;
        const response = await api.get(`boxes/${box}`)

        this.setState({ box: response.data })
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket('https://omnistack-bac.herokuapp.com/')

        io.emit('connectRoom', box)

        io.on('file', data => {
            this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
        })
    }

    handleUpload = files => {
        files.forEach(file => {
            const box = this.props.match.params.id;
            const data = new FormData();
            data.append('file', file)
            api.post(`boxes/${box}/files`, data)
        });
    }

    render() {
        return (
            <React.Fragment>
            {this.state.box.title? 
                <MenuLateral appTitle={this.state.box.title} boxAtive={this.state.box._id} /> : null }
                <div id="box-container">
                <h1>{this.state.box.title}</h1>
                    <Dropzone onDropAccepted={this.handleUpload}>

                        {
                            ({ getRootProps, getInputProps }) => (
                                <div className="upload" {...getRootProps() } >
                                    <input {...getInputProps() } />
                                    <p>Arraste arquivos ou clique aqui</p>
                                </div>
                            )
                        }

                    </Dropzone>
                    <ul>
                        {this.state.box.files && this.state.box.files.map(file => (
                            <li key={file.id}>
                                <a href={file.url} className="FileInfo">
                                    <MdInsertDriveFile size={24} color="#a5cfff" />
                                    <strong>{file.title}</strong>
                                </a>

                                <span>há{" "}{distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>

                            </li>
                        ))}
                    </ul>


                </div>
            </React.Fragment>
        );
    }
}
