import { useCartState, useCartDispatch } from '../context/cart';
import commerce from '../lib/commerce';
import { Box, Button, Text, Flex, VStack } from '@chakra-ui/react';
import { Navbar } from '../components';
import Image from 'next/image';
import Link from 'next/link';

function CartItem({ id, name, quantity, line_total, media, permalink }) {
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
        <Flex justifyContent='space-between' height='125px'>
            <Box>
                <Link href={`/products/${permalink}`}>
                    <a>
                        <Text fontWeight={200}>{name}</Text>
                    </a>
                </Link>
                <Text fontSize='xs'>Quantity: {quantity}</Text>
            </Box>
            <Box>
                <Text fontSize='sm' fontWeight={400}>{line_total.formatted_with_symbol}</Text>
            </Box>
        </Flex>
    );
}

export default function CartPage() {
    const { line_items, subtotal } = useCartState();

    const isEmpty = line_items.length === 0;

    return (
        <>
        <Navbar textColor='black' />
            <Text fontSize='2xl' px={10} mt={5} fontWeight={600}>Shopping Cart</Text>
            <Flex px={10} flexWrap='wrap' justifyContent='space-between' width='100%'>
                {isEmpty ? (
                    <Box>Your cart is empty!</Box>
                ) : (
                    // Items in cart view
                    <>
                        <Flex flexDirection='column' justifyContent='space-between' minWidth={{base: '100%', md: '70%'}} p={5}>
                            
                            {line_items.map((item) => (
                                <CartItem key={item.id} {...item} />
                            ))}
                        </Flex>
                        <Flex minWidth={{base: '100%', md: '30%'}} p={5}>
                            Subtotal: {subtotal.formatted_with_symbol}
                        </Flex> 
                    </>
                    )
                }
            </Flex>
        </>
    );
};