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
  const {cartList, getCartList} = cartStore()
  const {user} = userStore()

  useEffect(() => {
    //카트리스트 불러오기
    console.log('cartList :', cartList)
    getCartList(user._id)
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {(!cartList)?
            (
              <div className="text-align-center empty-bag">
                <h2>카트가 비어있습니다.</h2>
                <div>상품을 담아주세요!</div>
              </div>
            )
            :(
              <div>
                {cartList.map((item)=>(
                  <CartProductCard key={item._id} item={item}/>
                ))}
              </div>
            )
          }
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
