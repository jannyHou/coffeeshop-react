import {useState} from 'react'
import "./Signup.css"

export const Signup = ({setToken}) => {
  const [data, setData] = useState({})

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
      const signupData = signupRes.json()
      console.log("signup result:")
      console.log(signupData)
  }

  return (
    <div>
      <p>Signup page</p>
      <form onSubmit={handleSignup} className="signup">
        <label>Email:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, email: event.target.value}))} type="text" name="Email" id="email" placeholder="Email" autoComplete="off" value={data.email} />
        </label>
        <label>Password:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, password: event.target.value}))} type="text" name="Password" id="password" placeholder="Password" autoComplete="off" value={data.password} />
        </label>
        <label>First Name:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, firstname: event.target.value}))} type="text" name="FirstName" id="firstname" placeholder="FirstName" autoComplete="off" value={data.firstname} />
        </label>
        <label>Last Name:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, lastname: event.target.value}))} type="text" name="LastName" id="lastname" placeholder="LastName" autoComplete="off" value={data.lastname} />
        </label>
        <label>Phone:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, phone: event.target.value}))} type="text" name="Phone" id="phone" placeholder="Phone" autoComplete="off" value={data.phone} />
        </label>
        <label>City:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, city: event.target.value}))} type="text" name="City" id="city" placeholder="City" autoComplete="off" value={data.city} />
        </label>
        <label>PostCode:<br></br>
          <input onChange={(event)=>setData((prev)=>({...prev, postcode: event.target.value}))} type="text" name="Postcode" id="postcode" placeholder="Postcode" autoComplete="off" value={data.postcode} />
        </label>
        <button type="submit" className="signup-submit">Signup</button>
      </form>
    </div>
  )
}
