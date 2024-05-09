import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { cartActions } from "../action/cartAction";
import cartStore from '../store/cartStore'
import userStore from '../store/userStore'
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";

const CartPage = () => {
  const {cart, getCart, cartCount, productQty} = cartStore()
  const {user} = userStore()
  console.log('CartPage의 cart :', cart)

  useEffect(() => {
    //카트불러오기
    getCart()
  }, [cartCount,productQty]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {(!cart)?
            (
              <div className="text-align-center empty-bag">
                <h2>카트가 비어있습니다.</h2>
                <div>상품을 담아주세요!</div>
              </div>
            )
           :(
              <div>
                {cart.items.map((item)=>(
                  <CartProductCard key={item._id} item={item}/>
                ))}
              </div>
            ) 
          }
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt items={cart.items} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
