import React from 'react';
import axios from 'axios';
import requiresAuth from './requiresAuth.js'

class Jokes extends React.Component { 
    state = {
        jokes:[]
    }

    componentDidMount() {
        const endpoint = '/jokes'; // the full URL doesnt need to be here because its in the axios defaults basurl 
      
        axios
            .get(endpoint) // no more requestConfig, it autimatically comes with axios interceptor in requiresAuth
            .then(res => {
                this.setState({ jokes: res.data })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <>
                <h2>Some Terribly Wrong Dad Jokes</h2>
                <ul>
                    {this.state.jokes.map(joke => (
                        <li key={joke.id}>{joke.joke}</li>
                    ))}

                </ul>

            </>
        )
    }

}

export default requiresAuth(Jokes); // this function is what is actually being rendered from this component

