import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./security/AuthContext"
import { Button } from "react-bootstrap"
function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    async function handleSubmit() {
        if (await authContext.login(username, password)){
            // if the user is actually correct then we will
            // set that isAuthenticated is true in the context
            navigate(`/welcome/${username}`)
        }

        else{
            setShowErrorMessage(true)
        }
    }
    return (
        <div className="Login" style={{'display':'flex', 'flexDirection':'column', 'alignItems':'center'}}>
            <div className="LoginForm">
                <h1>Login</h1>
                {showErrorMessage && <div className='errorMessage alert bg-danger text-white'>Authentication Failed. Check credentials or refresh the page</div>}
                <div>
                    <div style={{'margin':'8px'}}>username</div>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>

                <div>
                    <div style={{'margin':'8px'}}>password</div>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <br></br>
                <div>
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;