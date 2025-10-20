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

  return (
    <div>
      <p>Purchase</p>
      <span>1: {location.state.p1}</span>
      <span>2: {location.state.p2}</span>
      <span>3: {location.state.p3}</span>
      <span>4: {location.state.p4}</span>
    </div>
  )
}
