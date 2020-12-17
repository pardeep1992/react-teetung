import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Cookies from 'universal-cookie';
import BaseUrl from '../services/axios-url';
import API from '../services/api-request';
const axios = require('axios');
class CollectionsNameAndBtn extends Component {
    constructor (props) {
        super(props);
        
        const cookies = new Cookies();
        if(cookies.get('Auth') !== 'true'){
            this.props.history.push("/");
        } 

        this.state={
            StoreName:'',
            TagLine:'',
            SupportEmail:'',
            BusinessName:'',
            Phone:'',
            Address:'',
            City:'',
            PostalCode:'',
            Country:'',
            TimeZone:'',
            Currency:'',
            rowID:''
        }
    }

    componentDidMount(){
        axios.post(BaseUrl+'getallgeneralpreference')
          .then(response => {
              var data = response.data.option;
              console.log(data);
              if(response.data.responseCode === 200){
                  this.setState({ StoreName: data[0].storeName })
                  this.setState({ TagLine: data[0].tagLine })
                  this.setState({ SupportEmail: data[0].supportEmail })
                  this.setState({ BusinessName: data[0].businessName })
                  this.setState({ Phone: data[0].Phone })
                  this.setState({ Address: data[0].Address })
                  this.setState({ City: data[0].City })
                  this.setState({ PostalCode: data[0].postalCode })
                  this.setState({ Country: data[0].country })
                  this.setState({ TimeZone: data[0].timeZone })
                  this.setState({ Currency: data[0].currency })
                  this.setState({ rowID: data[0]._id })
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    StoreNameChnageHalder=(e)=>{
        this.setState({
            StoreName : e.target.value
        });
        console.log(this.state.StoreName);
    }

    TagLineChnageHalder=(e)=>{
        this.setState({
            TagLine : e.target.value
        })
    }

    SupportEmailChnageHalder=(e)=>{
        this.setState({
            SupportEmail : e.target.value
        })
    }

    BusinessNameChnageHalder=(e)=>{
        this.setState({
            BusinessName : e.target.value
        })
    }

    PhoneChnageHalder=(e)=>{
        this.setState({
            Phone : e.target.value
        })
    }

    AddressChnageHalder=(e)=>{
        this.setState({
            Address : e.target.value
        })
    }  

    CityChnageHalder=(e)=>{
        this.setState({
            City : e.target.value
        })
    }   

    PostalCodeChnageHalder=(e)=>{
        this.setState({
            PostalCode : e.target.value
        })
    }

    CountryChnageHalder=(e)=>{
        this.setState({
            Country : e.target.value
        })
    }  

    TimeZoneChnageHalder=(e)=>{
        this.setState({
            TimeZone : e.target.value
        })
    }   

    CurrencyChnageHalder=(e)=>{
        this.setState({
            Currency : e.target.value
        })
    }    

    SubmitHandler=(e)=>{
        e.preventDefault();
        console.log(this.state.StoreName);
        let data = {
            StoreName:this.state.StoreName,
            TagLine:this.state.TagLine,
            SupportEmail:this.state.SupportEmail,
            BusinessName:this.state.BusinessName,
            Phone:this.state.Phone,
            Address:this.state.Address,
            City:this.state.City,
            PostalCode:this.state.PostalCode,
            Country:this.state.Country,
            TimeZone:this.state.TimeZone,
            Currency:this.state.Currency
        }
        API(data, "updategeneralpreference/"+this.state.rowID, "POST")
        .then(resp => {
            console.log(resp);
            if(resp.responseCode === 200){
                this.setState({
                    selectVal: this.state.selectVal, 
                })
                alert('Update Successfully');
            } else {
                //this.setState({erralertdisp: 1, alertdisp: 0})
                console.log('Error');
            }
        })
        
    }

    render() { 
        return (  
            <React.Fragment>
                <div className="row mt-3 bg-light">
                    <div className="col-md-12">
                        <h4 className="pl-2">General Setting</h4>
                        <hr />
                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Store Details</div>
                                    <small className="text-secondary">We and your customers will use this information to contact you.</small>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Store name</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.StoreNameChnageHalder} className="form-control" value={this.state.StoreName} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Tag line</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.TagLineChnageHalder} className="form-control" value={this.state.TagLine} />
                                            </div>
                                            <div className="col-12 alert-sm">

                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Support email</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.SupportEmailChnageHalder} className="form-control" value={this.state.SupportEmail} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                                <small className="text-secondary">Your customers will see this address if you email them.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />

                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Store Appearance</div>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3 text-center">
                                            <div className="col-4 ">
                                                <button className="btn btn-primary">Upload Logo</button>
                                            </div>
                                            <div className="col-4 ">
                                                <button className="btn btn-primary">Upload Favicon</button>
                                            </div>
                                            <div className="col-4 ">
                                                <button className="btn btn-primary">Upload Banner</button>
                                            </div>
                                        </div>
                                        <div className="row p-3 text-center">
                                            <div className="col-4 ">
                                                <i className="fa fa-picture-o" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-4 ">
                                                <i className="fa fa-picture-o" aria-hidden="true"></i>
                                            </div>
                                            <div className="col-4 ">
                                                <i className="fa fa-picture-o" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />

                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Store Address</div>
                                    <small className="text-secondary">This address will appear on your invoices. You can edit the address used to calculate shipping rates in your shipping settings.</small>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Legal name of business</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.BusinessNameChnageHalder} className="form-control" value={this.state.BusinessName} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.PhoneChnageHalder} className="form-control" value={this.state.Phone} />
                                            </div>
                                            <div className="col-12 alert-sm">

                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Address</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="text" onChange={this.AddressChnageHalder} className="form-control" value={this.state.Address} />
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row p-3">
                                                    <div className="col-12 ">
                                                        <label>City</label>
                                                    </div>
                                                    <div className="col-12">
                                                        <input type="text"  onChange={this.CityChnageHalder} className="form-control" value={this.state.City}  />
                                                    </div>
                                                    <div className="col-12 alert-sm">
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="row p-3">
                                                    <div className="col-12 ">
                                                        <label>Postal / ZIP code</label>
                                                    </div>
                                                    <div className="col-12">
                                                        <input type="text" onChange={this.PostalCodeChnageHalder} value={this.state.PostalCode} className="form-control" />
                                                    </div>
                                                    <div className="col-12 alert-sm">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Country</label>
                                            </div>
                                            <div className="col-12">
                                                <select className="form-control" onChange={this.CountryChnageHalder} value={this.state.Country}>
                                                    <option value="Afghanistan">Afghanistan</option><option value="Åland Islands">Åland Islands</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="AndorrA">AndorrA</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antarctica">Antarctica</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Bouvet Island">Bouvet Island</option><option value="Brazil">Brazil</option><option value="British Indian Ocean Territory">British Indian Ocean Territory</option><option value="Brunei Darussalam">Brunei Darussalam</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="Cape Verde">Cape Verde</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Christmas Island">Christmas Island</option><option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Congo, The Democratic Republic of the">Congo, The Democratic Republic of the</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Cote D'Ivoire">Cote D'Ivoire</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Guiana">French Guiana</option><option value="French Polynesia">French Polynesia</option><option value="French Southern Territories">French Southern Territories</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guadeloupe">Guadeloupe</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guernsey">Guernsey</option><option value="Guinea">Guinea</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option><option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran, Islamic Republic Of">Iran, Islamic Republic Of</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Isle of Man">Isle of Man</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jersey">Jersey</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Korea, Democratic People'S Republic of">Korea, Democratic People'S Republic of</option><option value="Korea, Republic of">Korea, Republic of</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Lao People'S Democratic Republic">Lao People'S Democratic Republic</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macao">Macao</option><option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Moldova, Republic of">Moldova, Republic of</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Myanmar">Myanmar</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Northern Mariana Islands">Northern Mariana Islands</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Pitcairn">Pitcairn</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russian Federation">Russian Federation</option><option value="RWANDA">RWANDA</option><option value="Saint Helena">Saint Helena</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia and Montenegro">Serbia and Montenegro</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syrian Arab Republic">Syrian Arab Republic</option><option value="Taiwan, Province of China">Taiwan, Province of China</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania, United Republic of">Tanzania, United Republic of</option><option value="Thailand">Thailand</option><option value="Timor-Leste">Timor-Leste</option><option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Viet Nam">Viet Nam</option><option value="Virgin Islands, British">Virgin Islands, British</option><option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option>
                                                </select>
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />


                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Standards and Formats</div>
                                    <small className="text-secondary">Standards and formats are used to calculate product prices, shipping weights, and order times.</small>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Timezone</label>
                                            </div>
                                            <div className="col-12">
                                                <select className="form-control" onChange={this.TimeZoneChnageHalder} value={this.state.TimeZone}>
                                                    <option value="(UTC-12:00) International Date Line West">(UTC-12:00) International Date Line West</option>
                                                    <option value="(UTC-11:00) Coordinated Universal Time-11">(UTC-11:00) Coordinated Universal Time-11</option>
                                                    <option value="(UTC-10:00) Hawaii">(UTC-10:00) Hawaii</option><option value="(UTC-09:00) Alaska">(UTC-09:00) Alaska</option>
                                                    <option value="(UTC-08:00) Baja California">(UTC-08:00) Baja California</option>
                                                    <option value="(UTC-07:00) Pacific Time (US &amp; Canada)">(UTC-07:00) Pacific Time (US &amp; Canada)</option>
                                                    <option value="(UTC-08:00) Pacific Time (US &amp; Canada)">(UTC-08:00) Pacific Time (US &amp; Canada)</option>
                                                    <option value="(UTC-07:00) Arizona">(UTC-07:00) Arizona</option>
                                                    <option value="(UTC-07:00) Chihuahua, La Paz, Mazatlan">(UTC-07:00) Chihuahua, La Paz, Mazatlan</option>
                                                    <option value="(UTC-07:00) Mountain Time (US &amp; Canada)">(UTC-07:00) Mountain Time (US &amp; Canada)</option>
                                                    <option value="(UTC-06:00) Central America">(UTC-06:00) Central America</option>
                                                    <option value="(UTC-06:00) Central Time (US &amp; Canada)">(UTC-06:00) Central Time (US &amp; Canada)</option>
                                                    <option value="(UTC-06:00) Guadalajara, Mexico City, Monterrey">(UTC-06:00) Guadalajara, Mexico City, Monterrey</option>
                                                    <option value="(UTC-06:00) Saskatchewan">(UTC-06:00) Saskatchewan</option>
                                                    <option value="(UTC-05:00) Bogota, Lima, Quito">(UTC-05:00) Bogota, Lima, Quito</option>
                                                    <option value="(UTC-05:00) Eastern Time (US &amp; Canada)">(UTC-05:00) Eastern Time (US &amp; Canada)</option>
                                                    <option value="(UTC-05:00) Indiana (East)">(UTC-05:00) Indiana (East)</option>
                                                    <option value="(UTC-04:30) Caracas">(UTC-04:30) Caracas</option>
                                                    <option value="(UTC-04:00) Asuncion">(UTC-04:00) Asuncion</option>
                                                    <option value="(UTC-04:00) Atlantic Time (Canada)">(UTC-04:00) Atlantic Time (Canada)</option>
                                                    <option value="(UTC-04:00) Cuiaba">(UTC-04:00) Cuiaba</option>
                                                    <option value="(UTC-04:00) Georgetown, La Paz, Manaus, San Juan">(UTC-04:00) Georgetown, La Paz, Manaus, San Juan</option>
                                                    <option value="(UTC-04:00) Santiago">(UTC-04:00) Santiago</option>
                                                    <option value="(UTC-03:30) Newfoundland">(UTC-03:30) Newfoundland</option>
                                                    <option value="(UTC-03:00) Brasilia">(UTC-03:00) Brasilia</option>
                                                    <option value="(UTC-03:00) Buenos Aires">(UTC-03:00) Buenos Aires</option>
                                                    <option value="(UTC-03:00) Cayenne, Fortaleza">(UTC-03:00) Cayenne, Fortaleza</option>
                                                    <option value="(UTC-03:00) Greenland">(UTC-03:00) Greenland</option>
                                                    <option value="(UTC-03:00) Montevideo">(UTC-03:00) Montevideo</option>
                                                    <option value="(UTC-03:00) Salvador">(UTC-03:00) Salvador</option>
                                                    <option value="(UTC-02:00) Coordinated Universal Time-02">(UTC-02:00) Coordinated Universal Time-02</option>
                                                    <option value="(UTC-02:00) Mid-Atlantic - Old">(UTC-02:00) Mid-Atlantic - Old</option>
                                                    <option value="(UTC-01:00) Azores">(UTC-01:00) Azores</option>
                                                    <option value="(UTC-01:00) Cape Verde Is.">(UTC-01:00) Cape Verde Is.</option>
                                                    <option value="(UTC) Casablanca">(UTC) Casablanca</option>
                                                    <option value="(UTC) Coordinated Universal Time">(UTC) Coordinated Universal Time</option>
                                                    <option value="(UTC) Edinburgh, London">(UTC) Edinburgh, London</option>
                                                    <option value="(UTC+01:00) Edinburgh, London">(UTC+01:00) Edinburgh, London</option>
                                                    <option value="(UTC) Dublin, Lisbon">(UTC) Dublin, Lisbon</option>
                                                    <option value="(UTC) Monrovia, Reykjavik">(UTC) Monrovia, Reykjavik</option>
                                                    <option value="(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna">(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
                                                    <option value="(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague">(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
                                                    <option value="(UTC+01:00) Brussels, Copenhagen, Madrid, Paris">(UTC+01:00) Brussels, Copenhagen, Madrid, Paris</option>
                                                    <option value="(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb">(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
                                                    <option value="(UTC+01:00) West Central Africa">(UTC+01:00) West Central Africa</option>
                                                    <option value="(UTC+01:00) Windhoek">(UTC+01:00) Windhoek</option>
                                                    <option value="(UTC+02:00) Athens, Bucharest">(UTC+02:00) Athens, Bucharest</option>
                                                    <option value="(UTC+02:00) Beirut">(UTC+02:00) Beirut</option>
                                                    <option value="(UTC+02:00) Cairo">(UTC+02:00) Cairo</option>
                                                    <option value="(UTC+02:00) Damascus">(UTC+02:00) Damascus</option>
                                                    <option value="(UTC+02:00) E. Europe">(UTC+02:00) E. Europe</option>
                                                    <option value="(UTC+02:00) Harare, Pretoria">(UTC+02:00) Harare, Pretoria</option>
                                                    <option value="(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius">(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
                                                    <option value="(UTC+03:00) Istanbul">(UTC+03:00) Istanbul</option>
                                                    <option value="(UTC+02:00) Jerusalem">(UTC+02:00) Jerusalem</option>
                                                    <option value="(UTC+02:00) Tripoli">(UTC+02:00) Tripoli</option>
                                                    <option value="(UTC+03:00) Amman">(UTC+03:00) Amman</option>
                                                    <option value="(UTC+03:00) Baghdad">(UTC+03:00) Baghdad</option>
                                                    <option value="(UTC+03:00) Kaliningrad, Minsk">(UTC+03:00) Kaliningrad, Minsk</option>
                                                    <option value="(UTC+03:00) Kuwait, Riyadh">(UTC+03:00) Kuwait, Riyadh</option>
                                                    <option value="(UTC+03:00) Nairobi">(UTC+03:00) Nairobi</option>
                                                    <option value="(UTC+03:00) Moscow, St. Petersburg, Volgograd">(UTC+03:00) Moscow, St. Petersburg, Volgograd</option>
                                                    <option value="(UTC+04:00) Samara, Ulyanovsk, Saratov">(UTC+04:00) Samara, Ulyanovsk, Saratov</option>
                                                    <option value="(UTC+03:30) Tehran">(UTC+03:30) Tehran</option>
                                                    <option value="(UTC+04:00) Abu Dhabi, Muscat">(UTC+04:00) Abu Dhabi, Muscat</option>
                                                    <option value="(UTC+04:00) Baku">(UTC+04:00) Baku</option>
                                                    <option value="(UTC+04:00) Port Louis">(UTC+04:00) Port Louis</option>
                                                    <option value="(UTC+04:00) Tbilisi">(UTC+04:00) Tbilisi</option>
                                                    <option value="(UTC+04:00) Yerevan">(UTC+04:00) Yerevan</option>
                                                    <option value="(UTC+04:30) Kabul">(UTC+04:30) Kabul</option>
                                                    <option value="(UTC+05:00) Ashgabat, Tashkent">(UTC+05:00) Ashgabat, Tashkent</option>
                                                    <option value="(UTC+05:00) Yekaterinburg">(UTC+05:00) Yekaterinburg</option>
                                                    <option value="(UTC+05:00) Islamabad, Karachi">(UTC+05:00) Islamabad, Karachi</option>
                                                    <option value="(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                                    <option value="(UTC+05:30) Sri Jayawardenepura">(UTC+05:30) Sri Jayawardenepura</option>
                                                    <option value="(UTC+05:45) Kathmandu">(UTC+05:45) Kathmandu</option>
                                                    <option value="(UTC+06:00) Astana">(UTC+06:00) Astana</option>
                                                    <option value="(UTC+06:00) Dhaka">(UTC+06:00) Dhaka</option>
                                                    <option value="(UTC+06:30) Yangon (Rangoon)">(UTC+06:30) Yangon (Rangoon)</option>
                                                    <option value="(UTC+07:00) Bangkok, Hanoi, Jakarta">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                                                    <option value="(UTC+07:00) Novosibirsk">(UTC+07:00) Novosibirsk</option>
                                                    <option value="(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi">(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
                                                    <option value="(UTC+08:00) Krasnoyarsk">(UTC+08:00) Krasnoyarsk</option>
                                                    <option value="(UTC+08:00) Kuala Lumpur, Singapore">(UTC+08:00) Kuala Lumpur, Singapore</option>
                                                    <option value="(UTC+08:00) Perth">(UTC+08:00) Perth</option>
                                                    <option value="(UTC+08:00) Taipei">(UTC+08:00) Taipei</option>
                                                    <option value="(UTC+08:00) Ulaanbaatar">(UTC+08:00) Ulaanbaatar</option>
                                                    <option value="(UTC+08:00) Irkutsk">(UTC+08:00) Irkutsk</option>
                                                    <option value="(UTC+09:00) Osaka, Sapporo, Tokyo">(UTC+09:00) Osaka, Sapporo, Tokyo</option>
                                                    <option value="(UTC+09:00) Seoul">(UTC+09:00) Seoul</option>
                                                    <option value="(UTC+09:30) Adelaide">(UTC+09:30) Adelaide</option>
                                                    <option value="(UTC+09:30) Darwin">(UTC+09:30) Darwin</option>
                                                    <option value="(UTC+10:00) Brisbane">(UTC+10:00) Brisbane</option>
                                                    <option value="(UTC+10:00) Canberra, Melbourne, Sydney">(UTC+10:00) Canberra, Melbourne, Sydney</option>
                                                    <option value="(UTC+10:00) Guam, Port Moresby">(UTC+10:00) Guam, Port Moresby</option>
                                                    <option value="(UTC+10:00) Hobart">(UTC+10:00) Hobart</option>
                                                    <option value="(UTC+09:00) Yakutsk">(UTC+09:00) Yakutsk</option>
                                                    <option value="(UTC+11:00) Solomon Is., New Caledonia">(UTC+11:00) Solomon Is., New Caledonia</option>
                                                    <option value="(UTC+11:00) Vladivostok">(UTC+11:00) Vladivostok</option>
                                                    <option value="(UTC+12:00) Auckland, Wellington">(UTC+12:00) Auckland, Wellington</option>
                                                    <option value="(UTC+12:00) Coordinated Universal Time+12">(UTC+12:00) Coordinated Universal Time+12</option>
                                                    <option value="(UTC+12:00) Fiji">(UTC+12:00) Fiji</option>
                                                    <option value="(UTC+12:00) Magadan">(UTC+12:00) Magadan</option>
                                                    <option value="(UTC+12:00) Petropavlovsk-Kamchatsky - Old">(UTC+12:00) Petropavlovsk-Kamchatsky - Old</option>
                                                    <option value="(UTC+13:00) Nuku'alofa">(UTC+13:00) Nuku'alofa</option><option value="(UTC+13:00) Samoa">(UTC+13:00) Samoa</option>
                                                </select>
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />

                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-3 col-xs-12">
                                    <div className="w-100">Store Currency</div>
                                    <small className="text-secondary">Customers use this currency to buy your products. It can only be changed before you've made your first sale.</small>
                                </div>
                                <div className="col-md-9 col-xs-12">
                                    <div className="card p-2">
                                        <div className="row p-3">
                                            <div className="col-12 ">
                                                <label>Store currency</label>
                                            </div>
                                            <div className="col-12">
                                                <select className="form-control" onChange={this.CurrencyChnageHalder} value={this.Currency}>
                                                    <option value="USD">USD - US Dollar</option><option value="CAD">CAD - Canadian Dollar</option><option value="EUR">EUR - Euro</option><option value="AED">AED - United Arab Emirates Dirham</option><option value="AFN">AFN - Afghan Afghani</option><option value="ALL">ALL - Albanian Lek</option><option value="AMD">AMD - Armenian Dram</option><option value="ARS">ARS - Argentine Peso</option><option value="AUD">AUD - Australian Dollar</option><option value="AZN">AZN - Azerbaijani Manat</option><option value="BAM">BAM - Bosnia-Herzegovina Convertible Mark</option><option value="BDT">BDT - Bangladeshi Taka</option><option value="BGN">BGN - Bulgarian Lev</option><option value="BHD">BHD - Bahraini Dinar</option><option value="BIF">BIF - Burundian Franc</option><option value="BND">BND - Brunei Dollar</option><option value="BOB">BOB - Bolivian Boliviano</option><option value="BRL">BRL - Brazilian Real</option><option value="BWP">BWP - Botswanan Pula</option><option value="BYR">BYR - Belarusian Ruble</option><option value="BZD">BZD - Belize Dollar</option><option value="CDF">CDF - Congolese Franc</option><option value="CHF">CHF - Swiss Franc</option><option value="CLP">CLP - Chilean Peso</option><option value="CNY">CNY - Chinese Yuan</option><option value="COP">COP - Colombian Peso</option><option value="CRC">CRC - Costa Rican Colón</option><option value="CVE">CVE - Cape Verdean Escudo</option><option value="CZK">CZK - Czech Republic Koruna</option><option value="DJF">DJF - Djiboutian Franc</option><option value="DKK">DKK - Danish Krone</option><option value="DOP">DOP - Dominican Peso</option><option value="DZD">DZD - Algerian Dinar</option><option value="EEK">EEK - Estonian Kroon</option><option value="EGP">EGP - Egyptian Pound</option><option value="ERN">ERN - Eritrean Nakfa</option><option value="ETB">ETB - Ethiopian Birr</option><option value="GBP">GBP - British Pound Sterling</option><option value="GEL">GEL - Georgian Lari</option><option value="GHS">GHS - Ghanaian Cedi</option><option value="GNF">GNF - Guinean Franc</option><option value="GTQ">GTQ - Guatemalan Quetzal</option><option value="HKD">HKD - Hong Kong Dollar</option><option value="HNL">HNL - Honduran Lempira</option><option value="HRK">HRK - Croatian Kuna</option><option value="HUF">HUF - Hungarian Forint</option><option value="IDR">IDR - Indonesian Rupiah</option><option value="ILS">ILS - Israeli New Sheqel</option><option value="INR">INR - Indian Rupee</option><option value="IQD">IQD - Iraqi Dinar</option><option value="IRR">IRR - Iranian Rial</option><option value="ISK">ISK - Icelandic Króna</option><option value="JMD">JMD - Jamaican Dollar</option><option value="JOD">JOD - Jordanian Dinar</option><option value="JPY">JPY - Japanese Yen</option><option value="KES">KES - Kenyan Shilling</option><option value="KHR">KHR - Cambodian Riel</option><option value="KMF">KMF - Comorian Franc</option><option value="KRW">KRW - South Korean Won</option><option value="KWD">KWD - Kuwaiti Dinar</option><option value="KZT">KZT - Kazakhstani Tenge</option><option value="LBP">LBP - Lebanese Pound</option><option value="LKR">LKR - Sri Lankan Rupee</option><option value="LTL">LTL - Lithuanian Litas</option><option value="LVL">LVL - Latvian Lats</option><option value="LYD">LYD - Libyan Dinar</option><option value="MAD">MAD - Moroccan Dirham</option><option value="MDL">MDL - Moldovan Leu</option><option value="MGA">MGA - Malagasy Ariary</option><option value="MKD">MKD - Macedonian Denar</option><option value="MMK">MMK - Myanma Kyat</option><option value="MOP">MOP - Macanese Pataca</option><option value="MUR">MUR - Mauritian Rupee</option><option value="MXN">MXN - Mexican Peso</option><option value="MYR">MYR - Malaysian Ringgit</option><option value="MZN">MZN - Mozambican Metical</option><option value="NAD">NAD - Namibian Dollar</option><option value="NGN">NGN - Nigerian Naira</option><option value="NIO">NIO - Nicaraguan Córdoba</option><option value="NOK">NOK - Norwegian Krone</option><option value="NPR">NPR - Nepalese Rupee</option><option value="NZD">NZD - New Zealand Dollar</option><option value="OMR">OMR - Omani Rial</option><option value="PAB">PAB - Panamanian Balboa</option><option value="PEN">PEN - Peruvian Nuevo Sol</option><option value="PHP">PHP - Philippine Peso</option><option value="PKR">PKR - Pakistani Rupee</option><option value="PLN">PLN - Polish Zloty</option><option value="PYG">PYG - Paraguayan Guarani</option><option value="QAR">QAR - Qatari Rial</option><option value="RON">RON - Romanian Leu</option><option value="RSD">RSD - Serbian Dinar</option><option value="RUB">RUB - Russian Ruble</option><option value="RWF">RWF - Rwandan Franc</option><option value="SAR">SAR - Saudi Riyal</option><option value="SDG">SDG - Sudanese Pound</option><option value="SEK">SEK - Swedish Krona</option><option value="SGD">SGD - Singapore Dollar</option><option value="SOS">SOS - Somali Shilling</option><option value="SYP">SYP - Syrian Pound</option><option value="THB">THB - Thai Baht</option><option value="TND">TND - Tunisian Dinar</option><option value="TOP">TOP - Tongan Paʻanga</option><option value="TRY">TRY - Turkish Lira</option><option value="TTD">TTD - Trinidad and Tobago Dollar</option><option value="TWD">TWD - New Taiwan Dollar</option><option value="TZS">TZS - Tanzanian Shilling</option><option value="UAH">UAH - Ukrainian Hryvnia</option><option value="UGX">UGX - Ugandan Shilling</option><option value="UYU">UYU - Uruguayan Peso</option><option value="UZS">UZS - Uzbekistan Som</option><option value="VEF">VEF - Venezuelan Bolívar</option><option value="VND">VND - Vietnamese Dong</option><option value="XAF">XAF - CFA Franc BEAC</option><option value="XOF">XOF - CFA Franc BCEAO</option><option value="YER">YER - Yemeni Rial</option><option value="ZAR">ZAR - South African Rand</option><option value="ZMK">ZMK - Zambian Kwacha</option>
                                                </select>
                                            </div>
                                            <div className="col-12 alert-sm">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <hr />

                        <section className="my-4">
                            <div className="row m-2">
                                <div className="col-md-12 col-xs-12">
                                    <button onClick={this.SubmitHandler} className="btn btn-primary pull-right w-25">Save</button>
                                </div>
                            </div>
                        </section>
                        <hr />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CollectionsNameAndBtn;