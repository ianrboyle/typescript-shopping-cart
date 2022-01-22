import Button from '@material-ui/core/Button'


//Types
import { CartItemType } from '../App'
import Item from '../Item/item'

//styles
import { Wrapper } from './CartItem.styles'

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => (
  <Wrapper>
    <div>
      <h3>
        {item.title}
      </h3>
      <div className="cart-item-information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="cart-buttons">
        <Button size="small" disableElevation variant="contained" onClick={() => removeFromCart(item.id)}>-</Button>
        <p>{item.quantity}</p>
        <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}>+</Button>
      </div>
      <img className="cart-image" src={item.image} alt={item.title}/>
    </div>
  </Wrapper>)

export default CartItem;