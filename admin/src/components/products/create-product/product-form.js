import React, { Component } from 'react';
// import ReactDOM  from 'react-dom';
import update from 'immutability-helper';
import  MultiSelectReact  from 'multi-select-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import API from '../../services/api-request';
import baseUrl from '../../services/axios-url';
const axios = require('axios');

const animatedComponents = makeAnimated();

class ProductForm extends Component {
    constructor() {
        super();
  
        this.displayData = [];
        
    }

    state = {
        title: '',
        description: '',
        collection: '',
        homepage: '',
        editorState: undefined,
        alertdisp: 0,
        erralertdisp: 0,
        tag: [],
        tagError: false,
        collections: [],
        collectionsData: [],
        hideFromSearchEngine: 0,
        addToHomePage: 0,
        hideFromListingPage: 0,
        attributeName: [],
        attrNameActVal: [],
        multiSelect: [],
        selectedOption: null,
        rows: [{
            name:'', type: '', position: 0, attribute: []
        }],
        NameAttr: [],
        TypeAttr: '',
        test: [],
        defaultRowIndex: 0,
        currentRowIndex: 0
    }
    
    componentDidMount(){
        axios.post(baseUrl+'getCollections')
          .then(response => {
            //   console.log(response);
              var data = response.data.CollectionsList;
               
            //   console.log(data);
            if(response.data.responseCode === 200){
                  let arr=[];
                  let a = this.state.collections.slice(); //creates the clone of the state
                    //a[i] = data[i].title;
                    // this.setState({collections: a});
                for( var i=0; i<response.data.CollectionsList.length; i++ ){
                    a[i]= { value: data[i]._id, label: data[i].title };
                    this.setState({collections: a })
                    
                    // console.log(this.state.collections)
                    
                }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    alert = () => {
        if(this.state.alertdisp===1)
        return(<div className="col-md-12 alert alert-success alert-dismissible fade show mt-2" role="alert">
            <strong>Success!!</strong> Product Save..
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
            collections: this.state.selectedOption,
            tag: this.state.tag,
            addToHomePage: this.state.addToHomePage,
            hideFromListingPage: this.state.hideFromListingPage,
            hideFromSearchEngine: this.state.hideFromSearchEngine,
            created_at : new Date()  
        }

        // console.log(data);

        axios.post(baseUrl+'saveProduct', {data})
            .then(function (response) {
                if(response.responseCode === 200){
                    this.setState({
                        title: '', 
                        alertdisp: 1,
                        
                    })
                } else {
                    // this.setState({erralertdisp: 1, alertdisp: 0})
                }
            console.log(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    }

    addTag = e => {
        this.setState({ tagError: false })
        const val = e.target.value;
        // console.log(val);
        var code = e.keyCode || e.which;
        if(code === 13) {  
            e.preventDefault();
            if( val === '' ){
                this.setState({ tagError: true })
                return;
            }
            if(this.state.tag.find(t =>
                t.toLowerCase() === val.toLowerCase()
            )){
                this.setState({ tagError: true })
                return;
            }
            // console.log(val);
            // this.setState({ tag: val })
            // console.log(this.state.tag);
            // buffer.push(<div>lhgjkg</div>);

            this.setState({tag: [...this.state.tag, val]})
            this.tagInput.value = null; 
        } 
    }

    addAttrTag = idx => e => {      // --------- tag field for attr section
        var code = e.keyCode || e.which;
        if(code === 13) {  
            e.preventDefault();
            // this.setState({ currentRowIndex: 1 })
            // this.setState({ defaultRowIndex: 0 })

            this.setState({ 
                currentRowIndex: idx,
                defaultRowIndex: 0,
                rows: update(this.state.rows, {[idx]: {attribute: {$push: [e.target.value]}
                    
                }})
            })
            this.attrTagInput.value = null; 
            // console.log(this.state.defaultRowIndex)
            // console.log(this.state.currentRowIndex)
            // console.log(idx)
        }
    }

    removeTag = i => {
        const newTags = [...this.state.tag];
        newTags.splice(i, 1);
        this.setState({ tag: newTags })
        // console.log(this.state.tag);
    }
    removeAttrTag = i => a => e => {
        console.log(e)
        console.log(a)
        // const newAttrTags = [...this.state.rows];
        // newAttrTags.splice(i, 1);
        // this.setState({ tag: newTags })

        // const newData = update(this.state.rows, {
        //     [idx]: { position: {$set: idx} },
        //     [idx]: {[name]: {$set: value}}
        //   });
        // this.setState({ 
        //     rows: newData
            
        //     // rows: update(this.state.rows, {[idx]: {[name]: {$set: value}  } })
        // })
    }
    
    handleHideFromSearchEngine = e => {
        if(this.state.hideFromSearchEngine === 1){
            this.setState({hideFromSearchEngine: 0})
        } else {
            this.setState({hideFromSearchEngine: 1})
        }
        console.log(this.state.hideFromSearchEngine)
    }

    handleAddToHomePage = e => {
        if(this.state.addToHomePage === 1){
            this.setState({addToHomePage: 0})
        } else {
            this.setState({addToHomePage: 1})
        }
        console.log(this.state.addToHomePage)
    }

    handleHideFromListingPage = e => {
        if(this.state.hideFromListingPage === 1){
            this.setState({hideFromListingPage: 0})
        } else {
            this.setState({hideFromListingPage: 1})
        }
        console.log(this.state.hideFromListingPage)
    }

    handleAddRow = () => {
        var item = {
          name: "",
          type: "",
          position: '',
          attribute: []
        };
        this.setState({
          rows: [...this.state.rows, item]
        });

        // console.log(this.state.rows)
    };

    handleChange = idx => e => {
        const { name, value } = e.target;
        // console.log(idx)
        if(value==='color'){
        }
        const newData = update(this.state.rows, {
            [idx]: { position: {$set: idx} },
            [idx]: {[name]: {$set: value}}
          });
        this.setState({ 
            rows: newData
            
            // rows: update(this.state.rows, {[idx]: {[name]: {$set: value}  } })
        })
        // this.setState({ 
        //     rows: update(this.state.rows, {[idx]: {[name]: {$set: value}  } })
        // })
        // this.setState(prevState => ({
        //     rows: prevState.rows.map((row, index) => {
        //         if (index !== idx) {
        //         return row;
        //         }
        //         else{
                    
        //             this.setState({ 
        //                 rows: update(this.state.rows, {[idx]: {position: {$set: idx}  } }),
        //                 rows: update(this.state.rows, {[idx]: {[name]: {$set: value}  } })
                
        //             })
        //             // return { 
        //             // ...row,
        //             // [name]: value
        //             // }
        //         }
        //     })
        // }));
    }
    

    handleTypeChange = i => e => {
        // console.log(i);
        // console.log(this.state.TypeAttr);
        this.setState({TypeAttr: e.target.val})
    }

    handleRemoveRow = () => {
        this.setState({
          rows: this.state.rows.slice(0, -1)
        });
    };

    handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
    }

    // select tag 
    handleMultiSelectChange = selectedOption => {
        this.setState({ selectedOption });
        // console.log(`Option selected:`, selectedOption);
    };

    variantsHead = () => {
        return (
            <thead>
                    <tr>
                        <th>&nbsp;</th>
                    {
                        this.state.rows.map((row, i) => {
                                return <th key={i}>{row.name}</th>
                        })
                        
                    }
                    <th>SKU</th>
                    <th>Weight (gram)</th>
                    <th>Price (USD)</th>
                    <th>Is Default</th>
                    </tr>
            </thead>
        )
    }

    variantsBody = () =>{
        let variants = [];
        // for(var i=0;i<this.state.rows.length;i++){
        //     variants = variants[i];
        //     for(var j=0; j<this.state.rows[i].attribute.length; j++){
        //         console.log('i->'+i+'j->'+j)
        //         variants.push(this.state.rows[i].attribute[j])
        //         console.log(variants[i])
        //     }
        // }
        // console.log('row[0].length->'+this.state.rows.length)
        for(var i=0;i<this.state.rows[0].attribute.length;i++){
            // console.log('i->'+i)
            for(var j=1;j<this.state.rows.length;j++){
                // console.log('j->'+j)
                // var a = 2;
                for(var k=0;k<this.state.rows[j].attribute.length;k++){
                    // console.log(this.state.rows[j].attribute.length)
                    if(this.state.rows.length <= 2 ){
                        var sizeandcolor = [];

                        sizeandcolor = [this.state.rows[0].attribute[i], this.state.rows[j].attribute[k]]
                        // console.log('k->'+k)
                        variants.push(sizeandcolor);
                        // console.log(this.state.rows[0].attribute[i] +'*'+ this.state.rows[j].attribute[k])
                        console.log(variants)
                        return(
                            <tbody>
                                {/* {
                                    this.state.rows.map((row, index) =>{
                                        
                                        return (
                                            row.attribute.map((attr, i) =>{ 
                                                return (  */}
                                                <tr>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>
                                                        {variants}
                                                        {/* {this.state.rows[0].attribute[i]} */}
                                                        </td> 
                                                        <td>
                                                            {this.state.rows[j].attribute[k]}
                                                        </td>
                                                        <td>
                                                            <input type="text" className="form-control" />
                                                        </td>
                                                        <td>
                                                            <input type="number" className="form-control" />
                                                        </td>
                                                        <td>
                                                            <input type="number" className="form-control" />
                                                        </td>
                                                        <td>
                                                            <input type="radio" />
                                                        </td>    
                                                    </tr>                                                      
                                                {/* )
                                            })
                                        )
                                    })
                                } */}
                            </tbody>
                        )  
                    }
                    else{
                        var z = parseInt(j+1)
                        console.log(this.state.rows[z].attribute.length)
                       
                        // var getCurrentRowAttr = 1;
                        // console.log('j->',j)
                        // console.log('k->',k)
                        // console.log('variants->',variants)
                        // if(this.state.rows[j+1].attribute.length != undefined){
                        //    for(var m=0;m<this.state.rows[2].attribute.length;m++){
                        //     variants.push([this.state.rows[0].attribute[i], this.state.rows[j].attribute[k], this.state.rows[2].attribute[m] ]);
                       
                        //     console.log(variants)
                        //     }
                        // }
                        
                    }
                    // getCurrentRowAttr++;
                }
                // a++;
            }
        }   

            
       
        

    }
    

    render() {         
        // console.log(this.state.rows)
       
        return (  
            <React.Fragment>
                <div className="row" >
                    <div className="col-md-8">
                        <div className="border-custom shadow py-3 px-3">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" className="form-control" placeholder="e.g. Kid Collection"
                                    value={this.state.title}
                                    onChange={e => this.setState({ title: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product Description (Optional)</label>
                                
                                <Editor 
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                        </div>

                        <div className="border-custom shadow mt-3 py-3 px-3">
                            <h4>Attributes</h4>
                            <p>Add the attributes like size or color of your product here</p>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Name <span className="text-danger">*</span></td>
                                        <td>Type <span className="text-danger">*</span></td>
                                        <td>Value <span className="text-danger">*</span></td>
                                        <td>Preview </td>
                                        <td>Actions <span className="text-danger">*</span></td>
                                    </tr>
                                </thead>

                                <tbody>

                                    
                                    { 
                                  
                                        this.state.rows.map((item, idx) => {
                                            // console.log(item)
                                          
                                        return <tr id={idx} key={idx}>
                                        
                                        <td>
                                            <input
                                            type="text"
                                            name="name"
                                            value={this.state.rows[idx].name}
                                            onChange={this.handleChange(idx)}
                                            className="form-control"
                                            />
                                        </td>

                                        <td>
                                            <select className="form-control"
                                                name="type"
                                                value={this.state.rows[idx].type}
                                                onChange={this.handleChange(idx)}
                                            >
                                                <option value="">Select</option>
                                                <option value="label">Label</option>
                                                <option value="color">Color</option>
                                                <option value="slide">Slide</option>
                                                <option value="size">Size</option>
                                            </select>
                                        </td>

                                        <td>
                                            <input
                                            type="text"
                                            name="attribute"
                                            onKeyUp={this.addAttrTag(idx)}
                                            className="form-control"
                                            ref={c => { this.attrTagInput = c; }}
                                            />
                                        </td>

                                        <td>
                                    
                                        {
                                            (

                                                <span id={idx} key={idx}>
                                                    {
                                                        item.attribute.map((attr, i) =>{ 
                                                            // console.log(attr, i, idx)
                                                            return (
                                                            <span key={i} className="badge badge-primary p-2 m-1"
                                                            >
                                                            {attr} 
                                                                <i className="fa fa-times ml-2" 
                                                                    onClick={ (e) => {this.removeAttrTag(idx, attr, e) }}
                                                                >
                                                                </i>
                                                            </span> 
                                                                                                                    
                                                            )
                                                        })
                                                            
                                                    }
                                                </span>                                 
                                            )
                                        }
                                        </td>

                                        <td>
                                            <button type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={this.handleRemoveSpecificRow(idx)}
                                            >
                                            <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                        </tr>
                                        
                                        
                                        
                    
                                })}
                                
                                
                                </tbody>
                                
                                    {/* {
                                        this.state.attributeName.map((name, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>
                                                        <input type="text" className="form-control" 
                                                            value={this.state.attrNameActVal}
                                                            onChange={ e => this.handleNameVal(e, index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <select className="form-control">
                                                            <option value="label">Label</option>
                                                            <option value="color">Color</option>
                                                            <option value="slide">Slide</option>
                                                            <option value="size">Size</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" placeholder="e.g. XXL" />
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <i className="fa fa-times" />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } */}

                                
                                
                            </table>

                            <button type="button" className="btn btn-outline-primary" 
                                onClick={this.handleAddRow}
                            >Add New Attribute</button>

                           
                        </div>

                        <div className="border-custom shadow mt-3 py-3 px-3">
                            <h4>Variants</h4>
                            <p>Manage the variations of this product below</p>
                            <table className="table">
                                {this.variantsHead()}
                                {this.variantsBody()}

                            </table>
                                        
                            {/* {
                                this.state.rows.map((row, index) => {
                                    // console.log(row)
                                    // console.log(index)
                                   
                                    return (
                                         <table>
                                        <thead>
                                            
                                            <tr>
                                        
                                                <th>
                                                   {row.name} 
                                                </th>
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>
                                                    {
                                            row.attribute.map((attr) => {
                                            return (
                                                <div>{attr}</div>
                                            )
                                            })
                                        }
                                                </td>
                                            </tr>
                                        </tbody>
                                     
                                    
                                        
                                        
                                        
                                        
                                    </table>
                                        
                                       
                                    )
                                })
                            }  */}
                            
                        </div>

                    </div>

                    <div className="col-md-4">
                        <div className="border-custom px-3">
                            <h5>Organization</h5>    
                            <h6>
                                <label className="form-check-label" htmlFor="collections">Collections</label>
                            </h6>                           
                           

                            <Select
                                // value={selectedOption}
                                onChange={this.handleMultiSelectChange}
                                options={this.state.collections}
                                isMulti
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                            />

                            <h6 className="mt-2">
                                <label className="form-check-label">Tags</label>
                            </h6>
                                <input type="text" placeholder="Vintage, Cotton, Summer"                className={"form-control " + (this.state.tagError === true ? 'border-danger' : 'border' ) } 
                                    // value={this.state.tag}
                                    // onChange={ e =>this.setState({  tag: e.target.value }) }
                                    onKeyDown={this.addTag}
                                    ref={c => { this.tagInput = c; }}
                                />

                                <div className="">
                                    {this.state.tag.map((t, index) => {
                                        return(
                                            <span key={index} className="btn btn-secondary px-3 m-2">
                                               {t} 
                                                <i className="fa fa-times ml-2" 
                                                    onClick={ () => {this.removeTag(index); }}>
                                                </i>
                                            </span> 
                                        )
                                    })}
                                </div>

                            </div>

                        <div className="border-custom px-3 mt-3">
                            <h2>Display</h2>    
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="searchEngine" 
                                    value={1}
                                    // onChange={ e => this.setState ({hideFromSearchEngine: e.target.value}) }
                                    onChange={this.handleHideFromSearchEngine}
                                />
                                <label className="form-check-label" htmlFor="searchEngine">Hide from search engines</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="addHomepage" 
                                    value={1}
                                    onChange={this.handleAddToHomePage}
                                />
                                <label className="form-check-label" htmlFor="addHomepage">Add to homepage</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"                 id="hideListing" 
                                    value={1}
                                    onChange={this.handleHideFromListingPage}
                                />
                                <label className="form-check-label" htmlFor="hideListing">Hide from listing pages</label> hideFromListingPage
                            </div>

                        </div>

                    </div>

                    <div className="col-md-12 mx-2 mt-4 pt-3 border-top">
                        <button type="submit" className="btn btn-primary float-right mb-5" onClick={this.submit}>Save Product</button>
                        <button type="submit" className="btn btn-outline-secondary float-right mr-3">
                            Discard Changes
                        </button>
                    </div>
                </div>

                {this.alert()}

                {this.erralert()}

                <div className="mb-5">
                <br /> <br /> <br /> <br /> <br /> 
                </div>

                
            </React.Fragment>
        );
        
    }
    
}
 
export default ProductForm;