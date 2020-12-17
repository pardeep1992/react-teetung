import React, { Component } from 'react';
import API from '../services/api-request';
import Cookies from 'universal-cookie';

class SignIn extends Component {
    constructor(props){
        super(props);

        // move the user to dashboard when already sign in
        const cookies = new Cookies();
        if(cookies.get('Auth') === 'true'){
            this.props.history.push("/dashboard");
        } 
    }

    state = { 
        email: '',
        password: '',
        alertdisp: 0
    }

    alert = () => {
        if(this.state.alertdisp===1)
        return(<div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
            <strong>Sorry!</strong> Email or password Incorrect.
        </div>)
    }

    submit = e => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password
        }

        API(data, "getAuthUserDetail", "POST")
        .then(resp => {
            // console.log(resp);
            if(resp.responseCode === 200){
                const cookies = new Cookies();
                cookies.set('Auth', 'true', { path: '/' }); 
                console.log(cookies.get('Auth'));
                this.props.history.push("/dashboard");
            } else {
                this.setState({alertdisp: 1})
            }
        })
    }

    render() { 
        return ( 
            <div className="container mt-5">
                <form className="col-md-6 offset-3 shadow-lg p-4">
                    <h2 className="text-center pb-3">Sign In</h2>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            value={this.state.name} 
                            onChange={e => this.setState({ email: e.target.value })} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" 
                            value={this.state.password} 
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <button type="submit" onClick={this.submit} className="btn btn-primary">Submit</button>
                </form>

                {this.alert()}
            </div>
            
        );
    }
}
 
export default SignIn;