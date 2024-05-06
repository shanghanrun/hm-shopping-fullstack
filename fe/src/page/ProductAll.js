import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import productStore from '../store/productStore';
import uiStore from '../store/uiStore'


const ProductAll = () => {
  const {productList, getProductList} = productStore()
  const error =false
  // 처음 로딩하면 상품리스트 불러오기
  // useEffect(()=>{
  //   getProductList()
  // },[])

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
