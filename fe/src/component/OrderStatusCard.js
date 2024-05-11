import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import { convertUTCtoSeoulDate } from '../utils/timeTransfer'

const OrderStatusCard = ({item, orderNum, date}) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={item.image} alt="" height={96}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {orderNum}</strong>
          </div>

          <div className="text-12">{convertUTCtoSeoulDate(date)}</div>

          <div>리넨셔츠 외 1개</div>
          <div>₩ 45,000</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg="warning">preparing</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
