import { Flex, Text, Button } from '@chakra-ui/react'
import Link from 'next/link';

export default function Confirmation({ order }) {

    return (
        order ? (
            <Flex mx={10} mt={5} w='100%' align='center' justify='center' >
            <Flex align='center' direction='column' justify='center' bgColor='blue.100' p={10} borderRadius='md' boxShadow='base'>
                <Text mb={5} fontSize='3xl' fontWeight={600}>Thanks for your purchase, {order.customer.firstname} {order.customer.lastname}!</Text>
                <Text mb={5} fontSize='lg'>Check {order.customer.email} for a receipt and shipping updates.</Text>
                <Text mb={5} fontSize='xs' fontWeight={300}>Order ref: {order.customer_reference}</Text>
                <Link href='/'>
                    <a>
                        <Button isFullWidth>Go home</Button>
                    </a>
                </Link>
            </Flex>
        </Flex>
        ) : (
            <Flex>
                <Text>Something went wrong</Text>
            </Flex>
        )
    )
}