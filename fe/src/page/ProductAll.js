import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import productStore from '../store/productStore';
import uiStore from '../store/uiStore'


const ProductAll = () => {
  const {productList, getProductList} = productStore()
  const navigate = useNavigate()
  const error =false
  // 처음 로딩하면 상품리스트 불러오기
  // useEffect(()=>{
  //   getProductList()
  // },[])

  function goDetail(id){
    console.log('goDetail함수에 들어온 id:', id)
    // navigate('/product/'+id)
  }

  return (
    <Container>
      <Row>
        {productList?.map((product,i) =>(
          <Col md={3} sm={12} key={i}>
            <ProductCard item={product}
              onClick={()=>goDetail('123')}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
