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
    }, [])

    return (
        <>
        <CheckoutNavbar />
        <Flex direction='column' w='100hw' h='100vh' align='center' justify='center'>
            {!order ? (
                <>
                <CircularProgress isIndeterminate /> Processing your order...
                </>
            ) : (
            <>
                <Text>Thanks for your purchase, {order.customer.firstname} {order.customer.lastname}!</Text>
                <Text>A receipt has been sent to {order.customer.email}.</Text>
                <Text>Order reference: {order.customer_reference}</Text>
                <Button m={2} onClick={() => router.push('/')} >Back to minimart</Button>
            </>
            )}
        </Flex>
        </>
    )
}