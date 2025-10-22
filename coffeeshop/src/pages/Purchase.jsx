import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Purchase = ({token}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [receipt, setReceipt] = useState()

  useEffect(()=>{
    if (!token) {
        navigate("/login")
    }
  })

  const handlePayment = async () => {
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

    setReceipt(payData)
  }

  return (
    <div>
      <p>Click Pay to purchase and see your receipt</p>
      <button onClick={handlePayment}>Pay</button>
      <div>
        <p>Receipt</p>
        {JSON.stringify(receipt, null, 2)}
      </div>
    </div>
  )
}
