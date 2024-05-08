import React, {useState} from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useDispatch } from "react-redux";
// import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";

const CartProductCard = ({ item }) => {
  // const [total, setTotal] = useState(item.price)
  const [quantity, setQuantity] = useState(1)
  // const dispatch = useDispatch();

  const handleQtyChange = () => {
    //아이템 수량을 수정한다

  };

  const deleteCart = (id) => {
    //아이템을 지운다
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img src="https://res.cloudinary.com/dscla3iqu/image/upload/v1714914629/fvq7uu5qriukv3mde5zb.webp" width={112} alt='' />
        </Col>
        <Col md={10} xs={12}>
          <div className="display-flex space-between">
            <h3>하드코딩 상품명</h3>
            <button className="trash-button">
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => deleteCart("hard_code")}
              />
            </button>
          </div>

          <div>
            <strong>₩ 7,000</strong>
          </div>
          <div>Size: xl</div>
          <div>Total: ₩ 7,000</div>
          <div>
            Quantity:
            <Form.Select
              onChange={(event) => handleQtyChange()}
              required
              defaultValue={1}
              className="qty-dropdown"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;
