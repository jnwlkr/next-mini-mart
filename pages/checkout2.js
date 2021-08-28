/* eslint-disable react-hooks/exhaustive-deps */
import commerce from '../lib/commerce';
import { Box, Text, Flex, Button, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import { useCartState, useCartDispatch } from '../context/cart';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckoutNavbar, Form, OrderSummary } from '../components';
import { useCheckoutState, useCheckoutDispatch } from '../context/checkout';

export default function Checkout2() {
    const { id: cartId } = useCartState();
    const { reset } = useCartDispatch();
    const { id, live } = useCheckoutState();
    const { generateToken, captureOrder, setError } = useCheckoutDispatch();

    useEffect(() => {
        generateToken(cartId);
        console.log(id);
    }, [cartId]);

    return (
        <Box>
            <CheckoutNavbar />
            <Flex flexWrap='wrap' mx={{base: 5, md: 10}} mt={5}>
                <Flex width={{base: '100%', md: '70%'}}>
                    <Form />
                </Flex>
                <Flex width={{base: '100%', md: '30%'}}>
                    <OrderSummary />
                </Flex>
                
            </Flex>
        </Box>
    )
}