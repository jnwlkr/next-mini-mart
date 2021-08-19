import { useCartState, useCartDispatch } from '../context/cart';
import commerce from '../lib/commerce';
import { Box, Button, Text, Flex, Divider, CloseButton, ButtonGroup} from '@chakra-ui/react';
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
        <Flex justifyContent='space-between' alignItems='center' height='120px' p={3} m={2} borderRadius='md' boxShadow='base'>
            <Box width='25%' mr={2}>
                <Link href={`/products/${permalink}`}>
                    <a>
                        <Image width={80} height={80} src={media.source} alt='cart-item' />
                    </a>
                </Link>
            </Box>
            <Box width='30%'>
                <Text fontSize='sm' fontWeight={200}>{name}</Text>
                <ButtonGroup size='xs' isAttached alignItems='center'>
                    <Button onClick={decrementQuantity}>-</Button>
                    <Text fontSize='xs' p={2}>{quantity}</Text>
                    <Button onClick={incrementQuantity}>+</Button>
                </ButtonGroup>
            </Box>
            <Box width='20%'>
                <Text fontSize='sm' fontWeight={400}>{line_total.formatted_with_symbol}</Text>
            </Box>
            <Box>
                <CloseButton onClick={removeItem}/>
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
            <Text fontSize='2xl' px={{base: 2, md: 7}} mt={5} fontWeight={600}>Shopping Cart</Text>
            <Flex flexWrap='wrap' justifyContent='space-between' width='100%'>
                {isEmpty ? (
                    <Box>Your cart is empty!</Box>
                ) : (
                    // Items in cart view
                    <>
                        <Flex flexDirection='column' justifyContent='space-between' px={{base: 0, md: 5}} minWidth={{base: '100%', md: '70%'}}>
                            {line_items.map((item) => (
                                <CartItem key={item.id} {...item} />
                            ))}
                        </Flex>
                        <Flex flexDirection='column' minWidth={{base: '100%', md: '30%'}} px={{base: 3, md: 7}} mt={{base: 2, md: 0}}>
                            <Text fontSize='lg' fontWeight={600}>Order summary</Text>
                            <Divider />
                            <Box my={2}>
                                <Flex mb={1} justifyContent='space-between'>
                                    <Text fontWeight='light'>Shipping:</Text> 
                                    <Text>TBD</Text>
                                </Flex>
                                <Flex mb={1} justifyContent='space-between'>
                                    <Text fontWeight='light'>Tax:</Text> 
                                    <Text>TBD</Text>
                                </Flex>
                                <Flex mb={1} justifyContent='space-between'>
                                    <Text fontWeight='medium'>Subtotal:</Text> 
                                    <Text fontWeight='semibold'>{subtotal.formatted_with_symbol}</Text>
                                </Flex>
                            </Box>
                            <Button mb={5}>Checkout</Button>
                        </Flex> 
                    </>
                    )
                }
            </Flex>
        </>
    );
};