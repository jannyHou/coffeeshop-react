import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import "./ProductList.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductList = ({token}) => {
  const HOSTNAME=import.meta.env.VITE_HOSTNAME
  
  const [current, setCurrent] = useState({})
  const [name, setName] = useState("Toronto")
  const [purchases, setPurchases] = useState({})
  const [redeems, setRedeems] = useState({})
  const [redeemLimit, setRedeemLimit] = useState(0)
  const [countRedeem, setCountRedeem] = useState(0)

  const loadProducts = async () => {
    const storesResponse = await fetch(`http://${HOSTNAME}:8080/stores`)
    const storesData = await storesResponse.json()

    const productsResponse = await fetch(`http://${HOSTNAME}:8080/products`)
    const productsData = await productsResponse.json()
    
    let storeinfo = storesData.filter(s => s.Name === name)[0]

    let currentinfo = {
        id: storeinfo.Id,
        name: storeinfo.Name,
        discount: storeinfo.Discount,
        products: productsData.map((p)=>{
            return {
              id:p.ProductId, 
              name: p.Name,
              price: p.BasePrice,
              availability: storeinfo.Products.includes(p.ProductId)
        }})
    }
    console.log("currentinfo")
    console.log(currentinfo)
    setCurrent(currentinfo)
  }

  const loadUser = async () => {
    if (token) {
      const userinfo = jwtDecode(token)
      const userid = userinfo.id
      const user = await fetch(`http://${HOSTNAME}:8080/coffeelover/${userid}`)
      const userData = await user.json()
      setRedeemLimit(userData.redeems)
    }
  }

  useEffect(()=>{
    loadProducts()
  }, [name])

  useEffect(()=>{
    loadUser()
  }, [token])

  const navigate = useNavigate();
  const handlePurchase = () => {
    navigate("/purchase", {state: {storeid: current.id, products: purchases, redeems: redeems}})
  }

  const handleAdd = async (id) => {
      const curr = purchases[id] ?? 0
      if (curr >= 127) return

      setPurchases(prev => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1,
      }));
  }

  const handleSub = async (id) => {
      const curr = purchases[id] ?? 0
      if (curr <= 0) return

      setPurchases(prev => ({
        ...prev,
        [id]: (prev[id] ?? 0) - 1,
      }));
  }

  const handleAddRedeems = async (id) => {
      const curr = redeems[id] ?? 0
      if (countRedeem >= redeemLimit) return

      const newCountRedeem = countRedeem+1
      setCountRedeem(newCountRedeem)

      setRedeems(prev => ({
        ...prev,
        [id]: curr + 1,
      }));
  }

  const handleSubRedeems = async (id) => {
      const curr = redeems[id] ?? 0
      if (curr <= 0) return

      const newCountRedeem = countRedeem-1
      setCountRedeem(newCountRedeem)

      setRedeems(prev => ({
        ...prev,
        [id]: curr-1,
      }));
  }

  return (
    <section>
        <div className="storeinfo">
          <p>Store: {current.name}<>&nbsp;&nbsp;&nbsp;</> Discount: {current.discount}% </p>
        </div>
        <div className="ProductContainer">
        { current.products && current.products.map((p) => (
            <div key={p.id} className="ProductList">
                <p>{p.name}</p>
                <p>${p.price}</p>
                <p>{p.availability? "available": "not available"}</p>
                <img src={`${p.id}.jpg`} alt="" />
                <div className="plbutton">
                  <span className="buttoninfo"> Purchase:</span>
                  <button className= "btn btn-light" onClick={()=>handleAdd(p.id)}>ADD</button>
                  <span className="buttonvalue">{purchases[p.id] ? purchases[p.id] : 0}</span>
                  <button className= "btn btn-light" onClick={()=>handleSub(p.id)}>SUB</button>
                </div>
                <div className="plbutton">
                  <span className="buttoninfo"> Redeem:</span><>&nbsp;&nbsp;</>
                  <button className= "btn btn-light" onClick={()=>handleAddRedeems(p.id)}>ADD</button>
                  <span className="buttonvalue">{redeems[p.id] ? redeems[p.id] : 0}</span>
                  <button className= "btn btn-light" onClick={()=>handleSubRedeems(p.id)}>SUB</button>
                </div>
            </div>            
        )) }
        </div>
        <button className="purchase btn btn-light" onClick={()=>handlePurchase()}>Purchase</button>
    </section>
  )
}
