import { jwtDecode } from 'jwt-decode'
import { Link} from "react-router-dom";

export const Header = ({token, setToken}) => {
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

  const userinfo = jwtDecode(token)
  console.log("userinfo:")
  console.log(userinfo)
  
  return (
    <header>
            <nav>
                <Link to="/">Home</Link>
                <button onClick={()=>setToken({})}>Logout</button>
                <span>{token}</span>
            </nav>
        </header>
  )
  
}
