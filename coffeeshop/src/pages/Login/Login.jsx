import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export const Login = ({setToken}) => {
  const HOSTNAME=import.meta.env.VITE_HOSTNAME

  const [emailValue, setEmailValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("[handleLogin]")

    const loginOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, password:pwdValue })
    };

    const loginUrl = `http://${HOSTNAME}:8080/login`

    const loginRes = await fetch(loginUrl, loginOptions)
    const loginData = await loginRes.json()
    console.log("Login Data:")
    console.log(loginData)

    setToken({token:loginData})
    navigate("/")
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div class="mb-3">
          <input class="form-control" onChange={(event)=>setEmailValue(event.target.value)} type="text" name="Email" id="email" placeholder="Email" autoComplete="off" value={emailValue} />
        </div>
        <div class="mb-3">
          <input class="form-control" onChange={(event)=>setPwdValue(event.target.value)} type="text" name="Password" id="password" placeholder="Password" autoComplete="off" value={pwdValue} />
        </div>
        <button className= "login-submit btn btn-light" type="submit">Login</button>
      </form>
    </div>
  )
}
