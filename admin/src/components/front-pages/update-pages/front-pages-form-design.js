import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import API from '../../services/api-request';
import BaseUrl from '../../services/axios-url';

import { convertFromHTML, EditorState, ContentState, convertToRaw } from 'draft-js';
// import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const axios = require('axios');
class pagesList extends Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            pagename:'',
            editorState:''
        }
        this.state = {editorContent: this._getInitialHTML()};
        let pageContent;
    }

    //this.pageId = props.match.params.slug;
    componentDidMount(){
        axios.post(BaseUrl+'getpagesbyId/'+this.props.slug)
          .then(response => {
              var data = response.data.data;
              if(response.data.responseCode === 200){
                  this.setState({ pagename: data[0].pageName })
                  this.pageContent= data[0].pageContent;
                  //console.log(data[0].pageContent);
                  /*const blocksFromHTML = convertFromHTML(this.pageContent);
                  const contentState = ContentState.createFromBlockArray(blocksFromHTML);
                  this.editorState = EditorState.createWithContent(contentState);
                  this.setState({ editorState: this.editorState });
                  console.log(this.editorState);
                  console.log(this.pageContent);*/
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

     _getInitialHTML() {
        const contentBlocks = convertFromHTML('<p>Hello world</p>');
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        return convertToRaw(contentState);
      }

    handleChange = editorState => {
        // const content = convertToHTML(editorState.getCurrentContent());
        // console.log(content);
    }
    render() { 
        return (  
            <React.Fragment>
                <form className="row" method="post">
                    <div className="col-md-12">
                        <div className="border-custom py-3 px-3">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" value={this.state.pagename} placeholder=""
                                />
                            </div>

                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <Editor 
                                   rawContentState={ this.state.editorState }
                                    onEditorStateChange={ this.handleChange }
                                   wrapperClassName="demo-wrapper"
                                   editorClassName="editer-content"
                                />
                            </div>
                        </div>
                   
                    </div>

                    <div className="col-md-12 mx-2 border-dark">
                        <button type="submit" className="btn btn-primary float-right mb-5">Create</button>
                    </div>
                </form>

                <div className="mb-5">
                <br /> <br /> <br /> <br /> <br /> 
                </div>
            </React.Fragment>
        );
    }
}
 
export default pagesList;