/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CheckoutNavbar } from '../components';
import { useCheckoutState } from '../context/checkout';
import { useCartDispatch } from '../context/cart';
import { Flex, Text, Button, CircularProgress } from '@chakra-ui/react';

export default function Confirmation() {
    const router = useRouter();
    const { order } = useCheckoutState();
    const { reset } = useCartDispatch();
    const [confirmedOrder, setConfirmedOrder] = useState();

    useEffect(() => {
        setConfirmedOrder(order);
        reset();
    }, [])

    if (!order) {
        return (
            <Flex direction='column' w='100%' h='600px' align='center' justify='center'>
                <CircularProgress isIndeterminate /> Processing your order...
            </Flex>
        )
    };

    return (
        <>
        <CheckoutNavbar disableBack />
        <Flex direction='column' w='100%' h='600px' align='center' justify='center'>
                <Text>Thanks for your purchase, {order.customer.firstname} {order.customer.lastname}!</Text>
                <Text>A receipt has been sent to {order.customer.email}.</Text>
                <Text>Order reference: {order.customer_reference}</Text>
                <Button m={2} onClick={() => router.push('/')} >Back to minimart</Button>
        </Flex>
        </>
    );
};