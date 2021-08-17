import { useCartState, useCartDispatch } from '../context/cart';
import commerce from '../lib/commerce';
import { Box, Button } from '@chakra-ui/react';
import { Navbar } from '../components';

function CartItem({ id, name, quantity, line_total }) {
    const { setCart } = useCartDispatch();

    const handleUpdateCart = ({ cart }) => setCart(cart);

    const removeItem = () => commerce.cart.remove(id).then(handleUpdateCart);

    const decrementQuantity = () => {
        quantity > 1 
            ? commerce.cart
                .update(id, { quantity: quantity - 1 })
                .then(handleUpdateCart)
            : removeItem();
    };

    const incrementQuantity = () => {
        commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart);
    }

    return (
        <Box>
            <Box>{name}</Box>
            <Box>{quantity}</Box>
            <Box>{line_total.formatted_with_symbol}</Box>
            <Box>
                <Button onClick={decrementQuantity}> - </Button>
                <Button onClick={incrementQuantity}> + </Button>
            </Box>
            <Button onClick={removeItem}>&times;</Button>
        </Box>
    );
}

export default function CartPage() {
    const { line_items, subtotal } = useCartState();

    const isEmpty = line_items.length === 0;

    if (isEmpty) return <Box>Your cart is empty</Box>;

    return (
        <>
        <Navbar textColor='black' />
        <Box>
            Cart 
            {line_items.map((item) => (
                <CartItem key={item.id} {...item} />
            ))}
            <hr />
            <Box>
                Subtotal: {subtotal.formatted_with_symbol}
            </Box>

        </Box>
        </>
    );
};