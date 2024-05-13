import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import productStore from '../store/productStore'
import { prices } from '../constants/prices.constants';


function PriceDropdown() {
  const {setProducts, productList, initialProductList} = productStore()
  console.log('priceDropdown의 productList', productList)
  console.log('priceDropdown의 initialProductList', initialProductList)
  const pList = [...productList]
  const iList = [...initialProductList]

  function filterByPrice(price){
    console.log('product price: ', price)
    let pr;
    if (price ==='만원 이하'){
      pr = 10000
    } else if(price ==='2만원 이하'){
      pr = 20000
    } else if(price ==='3만원 이하'){
      pr = 30000
    } else if(price ==='10만원 이하'){
      pr = 100000
    }
    const results = iList.filter(product => product.price <= pr)
    setProducts(results)
  }
  return (
    <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        Price
      </Dropdown.Toggle>

      <Dropdown.Menu style={{background: '#211e1e'}}>
              {prices.map((price, index) => (
                <Button style={{marginRight:"3px", marginBottom:"3px" }} 
					onClick={()=>filterByPrice(price)} key={index} >{price}</Button>
              ))}
        </Dropdown.Menu>
    </Dropdown>
  );
}

export default PriceDropdown;
