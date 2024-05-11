import React from "react";
import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { Container } from "react-bootstrap";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import orderStore from '../store/orderStore'

const MyPage = () => {
  const {orderList, itemsInfo, getOrderList} = orderStore()

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  useEffect(()=>{
    getOrderList()
  },[])
  if(orderList.length ===0){
    return(
      <Container className="confirmation-page">
        <h1>주문 내역이 없습니다.</h1>
        <div>메인페이지로 돌아가세요.
          <Link to={'/'}>메인페이지로 돌아가기</Link>
        </div>
      </Container>
    )
  }
  return (
    <Container className="status-card-container">
      {
        orderList.map((order, i)=>(
              <OrderStatusCard key={i} order={order} />
        ))
      }
    </Container>
  );
};

export default MyPage;
