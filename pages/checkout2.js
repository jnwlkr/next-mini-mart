/* eslint-disable react-hooks/exhaustive-deps */
import commerce from '../lib/commerce';
import { Box, Text, Flex, Button, Tabs, Tab, TabList, TabPanel, TabPanels, CircularProgress } from '@chakra-ui/react';
import { useCartState, useCartDispatch } from '../context/cart';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckoutNavbar, Form, OrderSummary, Shipping, Payment } from '../components';
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

    if (!id) {
        return (
            <Flex direction='column' w='100hw' h='100vh' align='center' justify='center'>
                <CircularProgress isIndeterminate /> Preparing checkout...
            </Flex>
        )
    }

    return (
        <Box>
            <CheckoutNavbar />
            <Flex flexWrap='wrap' mx={{base: 5, md: 10}} mt={5}>
                <Box width={{base: '100%', md: '60%'}} bgColor='gray.50' borderRadius='md' boxShadow='xl' pt={2}>
                    <Tabs isFitted>
                        <TabList>
                            <Tab>1. Shipping</Tab>
                            <Tab>2. Billing</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Shipping />
                            </TabPanel>
                            <TabPanel>
                                <Payment />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Flex direction='column' align='center' width={{base: '100%', md: '40%'}}>
                    <OrderSummary />
                    <Button isFullWidth boxShadow='lg' p={5} ml={{base: 0, md: 5}}>Complete order</Button>
                </Flex>
                
            </Flex>
        </Box>
    )
}