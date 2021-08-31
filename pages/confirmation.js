/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { Flex, Text, Button, CircularProgress } from '@chakra-ui/react';
import { CheckoutNavbar } from '../components';
import { useEffect, useState } from 'react';

export default function Confirmation() {
    const router = useRouter();
    const [order, setOrder] = useState();

    useEffect(() => {
        const orderData = JSON.parse(sessionStorage.getItem('order'));
        setOrder(orderData);
        console.log(order);
    }, [])

    if (!order) {
        return (
            <Flex direction='column' w='100%' h='600px' align='center' justify='center'>
                <CircularProgress isIndeterminate /> Processing your order...
            </Flex>
        )
    }

    return (
        <>
        <CheckoutNavbar />
        <Flex direction='column' w='100%' h='600px' align='center' justify='center'>
                <Text>Thanks for your purchase, {order.customer.firstname} {order.customer.lastname}!</Text>
                <Text>A receipt has been sent to {order.customer.email}.</Text>
                <Text>Order reference: {order.customer_reference}</Text>
                <Button m={2} onClick={() => router.push('/')} >Back to minimart</Button>
        </Flex>
        </>
    )
}