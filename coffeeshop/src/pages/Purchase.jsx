import { jwtDecode } from 'jwt-decode'
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Purchase = ({token}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if (!token) {
        navigate("/login")
    }
  })

  const handlePayment = async () => {
    console.log("[handlePayment]")

    let userid

    if (token) {
      const userinfo = jwtDecode(token)
      userid = userinfo.id
    }
    
    const paymentinst = {
      "clid": userid,
      "storeid": location.state.storeid,
      "products": location.state.products,
      "redeems": location.state.redeems,
      "paymenttype": "credit"
    }

    const payOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentinst)
    };

    const payUrl = "http://0.0.0.0:8080/makepayment"

    const payRes = await fetch(payUrl, payOptions)
    const payData = await payRes.json()
    console.log("Pay Data:")
    console.log(payData)
  }

  return (
    <div>
      <p>Purchase</p>
      <span>storeid: {location.state.storeid}</span>
      <p>products: {JSON.stringify(location.state.products, null, 2)}</p>
      <p>redeems: {JSON.stringify(location.state.redeems, null, 2)}</p>
      <button onClick={handlePayment}>Pay</button>
    </div>
  )
}
