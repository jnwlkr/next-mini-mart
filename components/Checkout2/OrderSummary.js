import { Flex, Text, Box, Divider } from '@chakra-ui/react';
import { useCheckoutState } from '../../context/checkout';

export default function OrderSummary() {
    const { live } = useCheckoutState();

    return (
        <Flex w='100%' borderRadius='md' boxShadow='lg' bgColor='gray.50' ml={{base: 0, md: 5}} pb={5} mb={2} height='100%' direction='column'>
            <Text fontSize='lg' p={5} color='blackAlpha.800' fontWeight={500}>Order Summary</Text>
            <Box>
                <Flex justifyContent='space-between' mx={5} mb={2}>
                    <Text fontWeight='light'>Subtotal:</Text> 
                    <Text>{live.subtotal.formatted_with_symbol}</Text>
                </Flex>
                <Flex justifyContent='space-between' mx={5} mb={2}>
                    <Text fontWeight='light'>Tax:</Text>
                    <Text>{live.tax.amount.formatted_with_symbol}</Text>
                </Flex>
                <Flex justifyContent='space-between' mx={5} mb={2}>
                    <Text fontWeight='light'>Shipping:</Text>
                    <Text>{live.shipping.price.formatted_with_symbol}</Text>
                </Flex>
                <Divider mb={2} />
                <Flex justifyContent='space-between' mx={5}>
                    <Text fontWeight='semibold'>Total:</Text>
                    <Text fontWeight='semibold'>{live.total_with_tax.formatted_with_symbol}</Text>
                </Flex>
            </Box>
        </Flex>
    )
}