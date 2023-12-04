import {Component} from 'react'

class Login extends Component{
    state={username:'' , password:''}

    formFunction = (event)=>{
        event.preventDefault()
    }

    changeUsername = (event)=>{
        this.setState({username:event.target.value})
    }
    changePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    render(){
        const {username , password} = this.state
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
            <button type='button'>Submit</button>
            </form>
        </div>
    }
}


export default Login