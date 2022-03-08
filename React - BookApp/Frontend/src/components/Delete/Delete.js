import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Delete extends Component{
    constructor(props){
       super(props);
        this.state = {
            BookID : "",
            flag : null
        }
        //Bind the handlers to this class
        this.handleBookIdChange = this.handleBookIdChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleBookIdChange = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }
    handleDelete = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
              if(response.status === 200){ this.setState({flag : 1 })}
            }).catch(error => {        
                console.log(error.data);             
                this.setState({ flag: 2 });
            });
    }
    render(){
        console.log(this.state.flag);
        let redirectVar, errorMessage, ifCookieNotLoading = null;
        if(!cookie.load('cookie')){
            ifCookieNotLoading = <Redirect to= "/login"/>
        }
        if(this.state.flag === 1){
            redirectVar = <Redirect to= "/home"/>
        }
        if(this.state.flag === 2){
            redirectVar = <Redirect to= "/delete"/>
            errorMessage = <p className="alert alert-danger">Cannot find the BookID</p>}
        return(
            <div>
                {ifCookieNotLoading}<br/>{redirectVar}<br/>
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        {errorMessage}
                        <input onChange = {this.handleBookIdChange} type="text" class="form-control" name="BookID" placeholder="BookID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                        <button onClick = {this.handleDelete} class="btn btn-primary">Submit</button>                 
                    </div> 
                </form>
            </div>
          </div>
        )
    }
}
export default Delete;