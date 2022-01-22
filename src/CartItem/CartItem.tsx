import Button from '@material-ui/core/Button'


//Types
import { CartItemType } from '../App'

//styles
import { Wrapper } from './CartItem.styles'

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = () => <div>Cart Item</div>

export default CartItem;