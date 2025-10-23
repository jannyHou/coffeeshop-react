import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./Signup.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Signup = () => {
  const [data, setData] = useState({})
  const navigate = useNavigate();

  const handleSignup = async (event) =>{
      event.preventDefault();
      console.log("[handleSignup]")
      console.log(data)

      const signupOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          db_id: 1,
          email: data.email, 
          pwd: data.password,
          first_name: data.firstname,
          last_name:data.lastname,
          phone: data.phone,
          city: data.city,
          postcode: data.postcode
        })
      };

      const signupUrl = "http://0.0.0.0:8080/register"

      const signupRes = await fetch(signupUrl, signupOptions)
      const signupData = await signupRes.json()
      console.log("signup result:")
      console.log(signupData)
      navigate("/login")
  }

  return (
    <div className="signup">
      <form onSubmit={handleSignup}>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, email: event.target.value}))} type="text" name="Email" id="email" placeholder="Email" autoComplete="off" value={data.email} />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, password: event.target.value}))} type="text" name="Password" id="password" placeholder="Password" autoComplete="off" value={data.password} />
        </div>
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, firstname: event.target.value}))} type="text" name="FirstName" id="firstname" placeholder="FirstName" autoComplete="off" value={data.firstname} />
        </div>
        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, lastname: event.target.value}))} type="text" name="LastName" id="lastname" placeholder="LastName" autoComplete="off" value={data.lastname} />
        </div>
        <div class="mb-3">
          <label class="form-label">Phone</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, phone: event.target.value}))} type="text" name="Phone" id="phone" placeholder="Phone" autoComplete="off" value={data.phone} />
        </div>
        <div class="mb-3">
          <label class="form-label">City:</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, city: event.target.value}))} type="text" name="City" id="city" placeholder="City" autoComplete="off" value={data.city} />
        </div>
        <div class="mb-3">
          <label class="form-label">PostCode</label>
          <input class="form-control" onChange={(event)=>setData((prev)=>({...prev, postcode: event.target.value}))} type="text" name="Postcode" id="postcode" placeholder="Postcode" autoComplete="off" value={data.postcode} />
        </div>
        <div class="signup-submit">
          <button type="submit" className="btn btn-light">Signup</button>
        </div>
      </form>
    </div>
  )
}
