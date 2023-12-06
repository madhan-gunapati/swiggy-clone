import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

class Login extends Component{
    constructor(){
        super()
        const token = Cookies.get('auth_token')
        this.state = {token ,username:'' , password:'' }
    }

    

    formFunction = (event)=>{
        event.preventDefault()
    }

    changeUsername = (event)=>{
        this.setState({username:event.target.value})
    }
    changePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    checkCredentilas = async ()=>{
        const {username , password} = this.state
        const credentials = {username , password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method:'POST',
           
            body:JSON.stringify(credentials)

        }
        try{
        const response = await fetch(url , options)
        const parsedData = await response.json()
        // console.log(parsedData)

        if(response.ok === true){
            const jwt_token = JSON.stringify(parsedData.jwt_token)
            
           Cookies.set('auth_token' , jwt_token , {expires:1})
        }
        }
        catch(e){
            console.log(e)
        }

    }


    render(){
        const {username , password , token} = this.state 
        if(token !== undefined){
            return <Redirect to='/' />
        }
        return <div>
            <form onClick={this.formFunction}>
                <h1>LOGO</h1>
                <p>name</p>
            <h1>Login</h1>
            <div>
            <label htmlFor='username-input'>USERNAME</label> 
            <input type='text' id='username-input' placeholder='username' onChange={this.changeUsername} value={username} /> 
            </div>
            <div>
            <label htmlFor='password-input'>PASSWORD</label> 
            <input type='password'  placeholder='enter password' onChange={this.changePassword} value={password} /> 
            </div>
            <button type='button' onClick={this.checkCredentilas}>Submit</button>
            </form>
        </div>
    }
}


export default Login