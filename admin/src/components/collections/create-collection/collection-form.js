import React, { Component } from 'react';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import API from '../../services/api-request';

class CollectionForm extends Component {
    state = {
        title: '',
        description: '',
        collection: '',
        homepage: '',
        editorState: undefined,
        alertdisp: 0,
        erralertdisp: 0
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

    onEditorStateChange = (editorState) => {
        this.setState({
          description:editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
        });
        // console.log(this.state.description);
    };

    submit = e => {
        e.preventDefault();

        let data = {
            title: this.state.title,
            description: this.state.description,
            collections: this.state.collection,
            homepage: this.state.homepage,
            created_on : new Date()  
        }

        // console.log(data);

        API(data, "addCollection", "POST")
        .then(resp => {
            console.log(resp);
            if(resp.responseCode === 200){
                this.setState({
                    alertdisp: 1, 
                    erralertdisp: 0,
                    title: '',
                    description: '',
                    collection: '',
                    homepage: '',
                    editorState: undefined
                })
            } else {
                this.setState({erralertdisp: 1, alertdisp: 0})
            }
        })
    }

      render() { 
        return (  
            <React.Fragment>
                <form className="row" method="post">

                
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
                                {/* <TextEditor {...this.props} /> */}
                                <Editor 
                                    wrapperClassName="demo-wrapper"
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
                                        value={this.state.collection} 
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
                                        value={this.state.collection}  
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
                                    value={this.state.homepage}
                                    onChange={ e => this.setState({homepage: '1'})}
                                />
                                <label className="form-check-label" htmlFor="display">Add to homepage</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mx-2 border-dark">
                        <button type="submit" className="btn btn-primary float-right mb-5" onClick={this.submit}>Create</button>
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