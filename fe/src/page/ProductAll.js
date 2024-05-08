import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import productStore from '../store/productStore';
import cartStore from '../store/cartStore'
import userStore from '../store/userStore'
import uiStore from '../store/uiStore'


const ProductAll = () => {
  const {productList, getProductList} = productStore()
  const {user} = userStore()
  const {getCartList} = cartStore()
  const navigate = useNavigate()
  const error =false
  // 처음 로딩하면 상품리스트 불러오기
  // useEffect(()=>{
  //   getProductList()
  // },[])
  useEffect(()=>{
    // if(user) getCartList(user._id)
    //여기서 cartStore의 cartList를 업데이트하면,
    // Navbar에서 cartList를 구독하고 있으므로,업데이트가 된다.
  },[])
 
  return (
    <Container>
      <Row>
        {productList?.map((product,i) =>(
          <Col md={3} sm={12} key={i}>
            <ProductCard item={product}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
