import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const [current, setCurrent] = useState({})
  const [name, setName] = useState("Toronto")

  const load = async () => {
    const storesResponse = await fetch("http://0.0.0.0:8080/stores")
    const storesData = await storesResponse.json()

    console.log("printing stores:")
    console.log(storesData);

    const productsResponse = await fetch("http://0.0.0.0:8080/products")
    const productsData = await productsResponse.json()

    console.log("printing products")
    console.log(productsData)
    
    let storeinfo = storesData.filter(s => s.Name === name)[0]

    let currentinfo = {
        name: storeinfo.Name,
        discount: storeinfo.Discount,
        products: productsData.map((p)=>{
            console.log(typeof(p.ProductId), p.ProductId)
            return {
              id:p.ProductId, 
              name: p.Name,
              availability: storeinfo.Products.includes(p.ProductId)
        }})
    }
    console.log("currentinfo")
    console.log(currentinfo)
    setCurrent(currentinfo)
  }

  useEffect(()=>{
    load()
  }, [name])

  const navigate = useNavigate();
  const handlePurchase = () => {
    navigate("/purchase", {state: {p1:9, p3:6}})
  }

  return (
    <section>
        <h2>ProductList</h2>
        <p>{current.name}</p>
        <p>{current.discount}</p>
        { current.products && current.products.map((p) => (
            <div key={p.id}>
                <p>{p.id}</p>
                <p>{p.name}</p>
                <p>{p.availability? "available": "not available"}</p>
            </div>            
        )) }
        <button onClick={()=>handlePurchase()}>Purchase</button>
    </section>
  )
}
