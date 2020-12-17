import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class TextEditor extends Component {
  state = {
    editorState: undefined,
    editorText: ''
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorText:editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    });
    // console.log(this.state.editorText);
  };

    valueOfTextditor = () => {
        return this.state.editorText;
    }
    
  render() {
    return (
      <div>
        <Editor valueOfTextditor={valueOfTextditor}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />

        <br />
        <br />
        <br />
        {this.valueOfTextditor()}
      </div>
    );
  }
}

export default TextEditor; 