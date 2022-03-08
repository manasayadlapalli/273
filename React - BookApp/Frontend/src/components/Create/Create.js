import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : "",
            Title : "",
            Author : "",
            flag : null
        }
        //Bind the handlers to this class
        this.handleBookIdChange = this.handleBookIdChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleBookIdChange = (e) => {
        this.setState({ BookID : e.target.value })}

    handleTitleChange = (e) => {
        this.setState({ Title : e.target.value })}

    handleAuthorChange = (e) => {
        this.setState({ Author : e.target.value })}
        
    handleSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID,
            Title : this.state.Title,
            Author : this.state.Author
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create', data)
            .then(response => {
                if(response.status === 200){
                this.setState({ flag : 1 })}
            }).catch(error => {        
                console.log(error.data);             
                this.setState({ flag: 2 });
            });
    }
    render(){
        console.log(this.state.flag);
        let ifCookieNotLoading, redirectVar, errorMessage = null;
        if(!cookie.load('cookie')){
            ifCookieNotLoading = <Redirect to= "/login"/>
        }
        if(this.state.flag === 1){  redirectVar = <Redirect to= "/home"/>  }
        if(this.state.flag === 2){  redirectVar = <Redirect to= "/create"/>
            errorMessage = <p className="alert alert-danger">BookId already exists, Enter a Unique ID</p>}
        return(
            <div>
                {ifCookieNotLoading}<br/>{redirectVar}<br/>
                <div class="container">
                    <form>
                        <div style={{width: '30%'}} class="form-group">
                            {errorMessage}
                            <br/>
                            <input onChange = {this.handleBookIdChange}  type="text" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleTitleChange}  type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.handleAuthorChange}  type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.handleSubmit} class="btn btn-primary">Submit</button>                 
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}
export default Create;