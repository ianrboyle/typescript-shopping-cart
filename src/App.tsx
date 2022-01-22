import { useState } from "react";
import {useQuery} from 'react-query';


//Components

import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from '@material-ui/core/Badge'
import Item from './Item/item'
import Cart from './Cart/Cart'
//Styles
import {Wrapper, StyledButton} from './App.styles'


//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
}


const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)
    console.log(data)

    //ack = accumlator, starts at 0
  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.quantity, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      // if item is already in cart
      if (isItemInCart){
        return prev.map(item => (
          item.id === clickedItem.id
            ? {...item, quantity: item.quantity + 1}
            : item
        ))
      }


      // other wise, return an array with all previous items, and add the clickedItem, and set quantity to 1
      return [...prev, {...clickedItem, quantity: 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      //call reduce on prev state
      // accumulator starts with an empty array that we specify as cartItemType 
      prev.reduce((ack, item) => {
        if (item.id === id) {
          // if quantity equals 1, we return ack as an empty array
          if (item.quantity === 1) return ack;
          // other wise we subtract 1 from the quantity
          return [...ack, {...item, quantity: item.quantity - 1}];
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  }

  if (isLoading) return <LinearProgress/>
  if (error) return <div>Something went Wrong...</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart}  removeFromCart={handleRemoveFromCart}/>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}> 
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>)
        )}
      </Grid>
    </Wrapper>
  );
}

export default App;
