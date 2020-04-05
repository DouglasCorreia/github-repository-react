import React, { Component } from 'react';
import api from '../../services/api';

import './style.scss';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repositories: [],
            inputValue: '',
            showLoading: false
        }

        this.inputChanged = this.inputChanged.bind(this); 
        this.addRepository = this.addRepository.bind(this);
    }

    inputChanged(event) {
        this.setState({ inputValue: event.target.value });
    }

    addRepository = async (event) => {
        event.preventDefault();

        const { inputValue } = this.state;

        if( inputValue.length === 0 ) {
            alert('Campo vazio!');
            return;
        };

        this.setState({ showLoading: true });

        try{
            const response = await api.get(`/repos/${inputValue}`);
            const { id, name, description, html_url, owner: { avatar_url } } = response.data;
            let newRepo = { id, name, description, html_url, avatar_url };

            this.setState(prevState => ({
                repositories: [...prevState.repositories, newRepo]
            }))
            
        } catch (err) {
            alert('Repositório não existe!');

        }

        this.setState({ showLoading: false });
        this.setState({ inputValue: '' });
    }

    render(){
        const { repositories, showLoading } = this.state

        return(
            <div className='repositories'>
                <div className='repositories__button'>
                    <form id='repo-form' onSubmit={ this.addRepository }>
                        <input type='text' value={ this.state.inputValue } onChange={ this.inputChanged } placeholder='username/repository-name/' />
                        
                        <br />

                        <input type='submit' value='Enviar' />
                    </form>
                </div>

                { showLoading  && <span id='loading'>Carregando...</span> }

                <div className='repositories__list'>
                    { repositories.map(repository => (
                        <div key={ repository.id } className='repositories__list__card'>
                            <div className="card__info">
                                <img src={ repository.avatar_url } alt={ repository.name } />

                                <h2>{ repository.name }</h2>
                                <p>{ repository.description }</p>

                                <a href={ repository.html_url } target="_blank" rel="noopener noreferrer">Acessar</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}