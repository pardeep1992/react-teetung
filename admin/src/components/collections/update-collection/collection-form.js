import React, { Component } from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import API from '../../services/api-request';
const axios = require('axios');


// const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};


class CollectionForm extends Component {
    constructor(props){
        super(props);   
        // const contentState = convertFromRaw(content);
        //     this.state = {
        //     contentState,
        // }
        
    }
    

    state = {
        title: '',
        description: '',
        collection: '',
        homepage: '',
        editorState: undefined,
        alertdisp: 0,
        erralertdisp: 0,
        test: 'staric'
    }

    alert = () => {
        if(this.state.alertdisp===1)
        return(<div className="col-md-12 alert alert-success alert-dismissible fade show mt-2" role="alert">
            <strong>Success!!</strong> Collection Save..
        </div>)
    }

    erralert = () => {
        if(this.state.erralertdisp===1)
        return(<div className="col-md-12 alert alert-danger alert-dismissible fade show mt-2" role="alert">
            <strong>Sorry!!</strong> Title is required..
        </div>)
    }

    onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
    };

    

    render() { 
        // console.log(this.props.title)
        // console.log(this.props.description)
        // var desc = this.props.description;
        const html = this.props.title;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState,
        };
	//console.log(markup);
    }
        const { contentState } = this.state;
        // console.log(this.props)
        
        return (  
            <React.Fragment>
                <form className="row" method="post">

                
                    <div className="col-md-8">
                        <div className="border-custom py-3 px-3">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" placeholder="e.g. Kid Collection"
                                    value={this.props.test_title}
                                    // onChange={e => this.setState({ title: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description (Optional)</label>
                                {/* <TextEditor {...this.props} /> */}
                                <Editor 
                                    wrapperClassName="demo-wrapper"
                                    editorState={this.state.editorState}
                                    editorClassName="demo-editor"
                                    // onContentStateChange={this.onContentStateChange}
                                    onEditorStateChange={this.onEditorStateChange}
                                    // onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                        </div>
                        
                        <div className="border-custom mt-3 py-3 px-3">
                            <h4>Collection type</h4>
                            <h6>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"                     name="collection_type" 
                                        checked={this.props.collections === 'manual'}
                                        value={this.props.collection} 
                                        onChange={e => this.setState({ collection: "manual" })}
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
                                        checked={this.props.collections === 'automated'}
                                        value={this.props.collection}  
                                        onChange={e => this.setState({ collection: "automated" })}
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
                        <div className="border-custom px-3">
                            <h5>Display</h5>    
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="display"
                                    checked = {this.props.homepage === '1'}
                                    value={this.props.homepage}
                                    onChange={ e => this.setState({homepage: '1'})}
                                />
                                <label className="form-check-label" htmlFor="display">Add to homepage</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mx-2 border-dark">
                        <button type="submit" className="btn btn-primary float-right mb-5" onClick={this.submit}>Save</button>
                    </div>
                </form>

                {this.alert()}

                {this.erralert()}

                <div className="mb-5">
                <br /> <br /> <br /> <br /> <br /> 
                </div>

                
            </React.Fragment>
        );
    }
}
 
export default CollectionForm;