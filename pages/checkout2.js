import commerce from '../lib/commerce';
import { Box, Text, Flex } from '@chakra-ui/react'
import { useCartState, useCartDispatch } from '../context/cart';
import { useCheckoutState, useCheckoutDispatch } from '../context/checkout';

export default function Checkout2() {
    const { id: cartId } = useCartState();
    const { reset } = useCartDispatch();
    const { id, live } = useCheckoutState();
    const { generateToken, captureOrder, setError } = useCheckoutDispatch();

    return (
        <Box>

        </Box>
    )
}