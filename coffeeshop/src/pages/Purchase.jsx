import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Purchase.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Purchase = ({token}) => {
  const HOSTNAME=import.meta.env.VITE_HOSTNAME

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

    const payUrl = `http://${HOSTNAME}:8080/makepayment`

    const payRes = await fetch(payUrl, payOptions)
    const payData = await payRes.json()

    setReceipt(payData)
  }

  return (
    <div className="purchase-container">
      <p>Click Pay to purchase and see your receipt</p>
      <p>Then refresh to see your coffeebux</p>
      <button className="btn btn-primary" onClick={handlePayment}>Pay</button>
      <div className="receipt">
        <p>Receipt</p>
        {JSON.stringify(receipt, null, 2)}
      </div>
    </div>
  )
}
