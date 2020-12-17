import React, { Component } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Threesections from './threesections';
import Banner from './banner';
import EditorPick from './editorpick';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Header />
                <Banner />
                <EditorPick />
                <Threesections />
                <Footer />
            </div> 
        );
    }
}
 
export default Home;