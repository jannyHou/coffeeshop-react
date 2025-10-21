import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";

export const Header = ({token, setToken}) => {
  const [credits, setCredits] = useState()
  const [redeems, setRedeems] = useState()

  const load = async () => {
    if (token) {
      const userinfo = jwtDecode(token)
      const userid = userinfo.id
      const user = await fetch(`http://0.0.0.0:8080/coffeelover/${userid}`)
      const userData = await user.json()
      
      console.log("[header] load userData")
      console.log(userData)

      setCredits(userData.credits)
      setRedeems(userData.redeems)
    }
  }

  useEffect(() => {load()}, [token])

  if (!token) {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="login">Login</Link>
                <Link to="signup">Signup</Link>
            </nav>
        </header>
      )
  }

  return (
    <header>
            <nav>
                <Link to="/">Home</Link>
                <button onClick={()=>setToken({})}>Logout</button>
                <span>Credits: {credits}</span>
                <span>Redeems: {redeems}</span>
            </nav>
        </header>
  )
}
