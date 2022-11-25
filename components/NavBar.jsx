import React from "react"
import Link from "next/link"
import { AiOutlineShopping } from "react-icons/ai"
import Cart from "./Cart"
import { useStateContext } from "../context/StateContext"

export default function NavBar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(!showCart)}
      >
        <AiOutlineShopping />
        {totalQuantities ? (
          <span className="cart-item-qty">{totalQuantities}</span>
        ) : (
          ""
        )}
      </button>

      {showCart && <Cart />}
    </div>
  )
}
