import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import "./Header.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = ({token, setToken}) => {
  const HOSTNAME=import.meta.env.VITE_HOSTNAME
  
  const [credits, setCredits] = useState()
  const [redeems, setRedeems] = useState()

  const load = async () => {
    if (token) {
      const userinfo = jwtDecode(token)
      const userid = userinfo.id
      const user = await fetch(`http://${HOSTNAME}:8080/coffeelover/${userid}`)
      const userData = await user.json()

      setCredits(userData.credits)
      setRedeems(userData.redeems)
    }
  }

  useEffect(() => {load()}, [token])

  if (!token) {
    return (
        <header>
            <nav>
              <div className="navleft">
                <Link to="/" className="Link">Home</Link>
              </div>
              <div className="navright">
                <Link to="login" className="Link">Login</Link>
                <Link to="signup" className="Link">Signup</Link>
              </div>
            </nav>
        </header>
      )
  }

  return (
    <header>
            <nav>
                <div className="navleft">
                  <Link to="/" className="Link">Home</Link>
                </div>
 
                <span className="Link">Credits: {credits}</span>
                <span className="Link">Redeems: {redeems}</span>
                <div className="navright">
                  <Link className="linkbutton" onClick={()=>setToken({})}>Logout</Link>
                </div>
                
            </nav>
        </header>
  )
}
