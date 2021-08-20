import { useCartState, useCartDispatch } from '../context/cart';
import commerce from '../lib/commerce';
import { Box, Button, Text, Flex, Divider, CloseButton, ButtonGroup, useToast} from '@chakra-ui/react';
import { Navbar } from '../components';
import Image from 'next/image';
import Link from 'next/link';

function CartItem({ id, name, quantity, line_total, media, permalink }) {
    const toast = useToast();
    const { setCart } = useCartDispatch();

    const handleUpdateCart = ({ cart }) => setCart(cart);

    const removeItem = () => {
        commerce.cart.remove(id).then(handleUpdateCart);
        toast({
            title: 'Cart updated!',
            description: `${name} was removed from your cart`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            commerce.cart.update(id, { quantity: quantity - 1 }).then(handleUpdateCart);
            toast({
                title: 'Cart updated!',
                description: `${name} was removed from your cart`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        } else {
            removeItem();
        }
    };

    const incrementQuantity = () => {
        commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart);
        toast({
            title: 'Cart updated!',
            description: `${name} was added to your cart`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    return (
        <>
        <Flex justifyContent='space-between' alignItems='center' minHeight={{base: '95px', sm: '140px', md: '150px'}} borderRadius='md' px={3} >
            <Box width='20%' mr={2}>
                <Link href={`/products/${permalink}`}>
                    <a>
                        <Image width={120} height={120} src={media.source} alt='cart-item' />
                    </a>
                </Link>
            </Box>
            <Flex direction='column' width='35%'>
                <Text fontSize={{base: 'xs', sm: 'sm', md: 'md'}} fontWeight={400}>{name}</Text>
                <ButtonGroup size='xs' isAttached alignItems='center'>
                    <Button onClick={decrementQuantity}>-</Button>
                    <Text fontSize={{base: 'xs', md: 'sm'}} p={2}>{quantity}</Text>
                    <Button onClick={incrementQuantity}>+</Button>
                </ButtonGroup>
            </Flex>
            <Box width='20%'>
                <Text fontSize={{base: 'xs', md: 'sm'}} fontWeight={500}>{line_total.formatted_with_symbol}</Text>
            </Box>
            <Box>
                <CloseButton size='md' onClick={removeItem}/>
            </Box>
        </Flex>
        <Divider />
        </>
    );
}

export default function CartPage() {
    const { line_items, subtotal, total_items } = useCartState();

    const isEmpty = line_items.length === 0;

    const handleCheckout = () => {
        console.log(line_items)
    }

    return (
        <>
        <Navbar textColor='black' />
        <Box px={{base: 5, md: 10}} mt={5}>
            <Box pb={5}>
                <Text fontSize='2xl' fontWeight={600}>Shopping Cart</Text>
                <Text fontSize='sm'>{total_items} items</Text>
            </Box>
                {isEmpty ? (
                    <Flex direction='column' align='center' justifyContent='center' m={5}>
                        <Text fontSize='xl' fontWeight={500}>Your cart is empty!</Text>
                    </Flex>
                ) : (
                    <Flex flexWrap='wrap' justifyContent='space-between' width='100%'>
                        <Flex flexDirection='column' justifyContent='space-between' minWidth={{base: '100%', md: '70%'}}>
                            {line_items.map((item) => (
                                <CartItem key={item.id} {...item} />
                            ))}
                        </Flex>
                        <Flex flexDirection='column' minWidth={{base: '100%', md: '30%'}} pl={{base: 0, md: 5}} mt={{base: 5, md: 0}}>
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
                            <Link href='/checkout'>
                                <a>
                                    <Button isFullWidth mb={5} onClick={handleCheckout}>Checkout</Button>
                                </a>
                            </Link>
                        </Flex> 
                    </Flex>
                    )
                }
        </Box>
        </>
    );
};