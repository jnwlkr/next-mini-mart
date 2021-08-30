import { useRouter } from 'next/router';
import { Flex, Text, Button } from '@chakra-ui/react';
import { CheckoutNavbar } from '../components';

export default function Confirmation() {
    const router = useRouter();
    let order = sessionStorage.getItem('order_receipt');

    return (
        <>
        <CheckoutNavbar />
        <Flex direction='column' w='100hw' h='100vh' align='center' justify='center'>
            <Text>Thanks for your purchase, {order.firstName} {order.lastName}!</Text>
            <Text>A receipt has been sent to {order.email}.</Text>
            <Text>Order reference: {order.ref}</Text>
            <Button m={2} onClick={() => router.push('/')} >Back to minimart</Button>
        </Flex>
        </>
    )
}