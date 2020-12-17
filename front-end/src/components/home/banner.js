import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Bannerimg from '../images/banner-clothing.jpg';
import '../css/style.css'

class Banner extends Component {
    state = {  
        searchValue: '',
        redirectToSearchPage: false
    }

    handleSearch = (e) => {
        e.preventDefault()
        console.log(this.state.searchValue)
        this.setState({ redirectToSearchPage: true })
    }

    render() { 

        if (this.state.redirectToSearchPage) {
            return (<Redirect to = {{ 
                pathname: "/search",
                state: { search: this.state.searchValue }
            }} />);
        }

        return ( 
            <div>
                <img src={Bannerimg} className="img-fluid" style={{ width:'100%' }} alt="" />
                <form className="row homebanner" onSubmit={e => this.handleSearch(e)}>
                    
                    <div className="col-md-4 col-sm-8">
                        <input type="text" className="form-control col-sm-12 form-control-lg" placeholder="Search Products and artworks" 
                             value={this.state.searchValue}
                             onChange={e => this.setState({searchValue: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="col-md-2 btn btn-success form-control-lg homeSearchBtn">Search</button>
                </form>
            </div>
         );
    }
}
 
export default Banner;