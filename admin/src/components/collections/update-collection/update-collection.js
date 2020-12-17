import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import LeftSideBar from '../../left-side-bar/left-side-bar';
import Header from '../../header/header';
import {NavLink} from 'react-router-dom'; 
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CollectionForm from './collection-form';
import '../../css/style.css';
import baseUrl from '../../services/axios-url'
const axios = require('axios');

class UpdateCollection extends Component {
    constructor (props) {
        super(props);
        
        // redirect to login page in not sign in
        const cookies = new Cookies();
        if(cookies.get('Auth') !== 'true'){
            this.props.history.push("/");
        } 
    

        this.routeParam = props.match.params.id;
    }

    state = {
        title: '',
        desc: '',
        collections: '',
        homepage: '',
        editorState: EditorState.createEmpty()
    }  

    componentDidMount(){
        axios.post(baseUrl+'getCollectionById/'+this.routeParam)
        .then(response => {
            console.log(response)
            if(response.data.responseCode === 200){
                this.setState({ 
                    title: response.data.data[0].title,
                    desc: response.data.data[0].description,
                    collections: response.data.data[0].collections,
                    homepage: response.data.data[0].homepage
                })

                const html = response.data.data[0].description
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                  const editorState = EditorState.createWithContent(contentState);
                  console.log('Editor Data '+editorState);
                  this.setState({ editorState: editorState })
                }
            }
            
        })
        .catch(function (error) { 
            console.log(error);
        });

         
    }

    

    onEditorStateChange: Function = (editorState) => {
        this.setState({
        editorState,
        });
    }

    handleCheckboxChange = () => {
        this.setState({
            homepage: !this.state.homepage,
        });
    }

    handleRadioChange = e => {
        console.log(e.target.value)
        this.setState({
          collections: e.target.value
        });
    };

    submit = e => {
        e.preventDefault();
        var today = new Date();
        let data = {
            title: this.state.title,
            description: this.state.editorState && draftToMarkdown(convertToRaw(this.state.editorState.getCurrentContent())),
            collections: this.state.collections,
            homepage: this.state.homepage,
            collection_id: this.routeParam,
            UpdateOn:today.toLocaleString()
        }

        console.log(data);

        axios.post(baseUrl+'updateCollection', data)
        .then(response => {
          //   console.log(response);
             
          if(response.data.responseCode === 200){
              this.setState({
                alertdisp: 1,
                // title: '',
                // desc: '',
                // collections: '',
                // homepage: '',
                // editorState: EditorState.createEmpty()
              })
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    alert = () => {
        if(this.state.alertdisp===1)
        return(<div className="col-md-12 alert alert-success alert-dismissible fade show mt-2" role="alert">
            <strong>Success!!</strong> Collection Save..
        </div>)
    }

    handleCollectionImageUpload = (e) => {
        // console.log()
        const data = new FormData()
        data.append('file', e.target.files[0])
        axios.post(baseUrl+"collectionImageUpload", data, { 
           // receive two    parameter endpoint url ,form data
       })
        .then(res => { 
            console.log(res)
        })
    }


    render() { 
        console.log(this.state)
        
        // const { editorState } = this.state;
        return (  
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <LeftSideBar />
                        </div>

                        <div className="col-md-9">
                            <Header {...this.props} />
                            
                            {/* back to all collections */}
                            <NavLink exact to="/collections" >
                                <p> <i className="fa fa-caret-left mr-3 ml-2 mt-3"></i> Collection</p> 
                            </NavLink>

                            {/* update collectkion */}
                            <h3>Update collection</h3>
                            <div className="container">
                                {/* -- form -- */}
                            
                                <form className="row" method="post" encType="multipart/form-data">
                                    <div className="col-md-8">
                                        <div className="border-custom py-3 px-3">
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input type="text" className="form-control" placeholder="e.g. Kid Collection"
                                                    value={this.state.title}
                                                    onChange={e => this.setState({ title: e.target.value })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Description (Optional)</label>
                                                <Editor 
                                                    wrapperClassName="demo-wrapper"
                                                    editorState={this.state.editorState}
                                                    editorClassName="demo-editor"
                                                    onEditorStateChange={this.onEditorStateChange}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="border-custom mt-3 py-3 px-3">
                                            <h4>Collection type</h4>
                                            <h6>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"                     name="collection_type" 
                                                        value="manual" 
                                                        checked={this.state.collections == 'manual'}
                                                        onChange={ this.handleRadioChange }
                                                    />
                                                    <label className="form-check-label">
                                                        Manual
                                                    </label>
                                                    <p className="font-weight-normal text-secondary">Add products to this collection one by one.</p>
                                                </div>
                                            </h6>

                                            <h6>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio"   
                                                        name="collection_type" 
                                                        value="automated" 
                                                        checked={this.state.collections == 'automated'}
                                                        onChange={ this.handleRadioChange }
                                                    />
                                                    <label className="form-check-label">
                                                        Automated
                                                    </label>
                                                    <p className="font-weight-normal text-secondary">Existing and future products that match the conditions you set will automatically be added to this collection.</p>
                                                </div>
                                            </h6>
                                            
                                        </div>

                                

                                        </div>

                                        <div className="col-md-4">
                                        <div className="row">
                                                <div className="col-md-12">
                                            <div className="border-custom px-3">
                                                <h5>Display</h5>    
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="display"
                                                        checked ={
                                                            this.state.homepage == '1' ? 'checked' :'' 
                                                        }
                                                        // value={this.props.homepage}
                                                        onChange={ e => this.handleCheckboxChange()}
                                                    />
                                                    <label className="form-check-label" htmlFor="display">Add to homepage</label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                            <div className="row my-3 border-custom px-3 py-4">
                                                <div className="col-md-12">
                                                    <h4>Cover Image</h4>
                                                </div>

                                                <div className="col-md-12 p-3 text-center">
                                                    <input type="file" name="upload" onChange={this.handleCollectionImageUpload} />
                                                </div>
                                                <div className="col-md-12 p-3 text-muted">
                                                        <p>Recommended dimension for the home page is <b>540 x 726px</b>, file size is <b>less than 100kB</b> and file type is <b>.jpg</b></p>
                                                </div>
                                               
                                            </div>
                                        </div>

                                        <div className="col-md-12 mx-2 border-dark">
                                            <button type="submit" className="btn btn-primary float-right mb-5" onClick={this.submit}>Save</button>
                                        </div>
                                    </form>

                                 {this.alert()}

                                {/*{this.erralert()} */}

                                <div className="mb-5">
                                <br /> <br /> <br /> <br /> <br /> 
                                </div>
                                    
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default UpdateCollection;