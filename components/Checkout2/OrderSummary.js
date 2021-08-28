import { Flex, Text, Box, Divider } from '@chakra-ui/react';
import { useCheckoutState } from '../../context/checkout';

export default function OrderSummary() {
    const { live } = useCheckoutState();

    return (
        <Flex w='100%' borderRadius='md' boxShadow='xl' bgColor='gray.50' ml={{base: 0, md: 5}} height='200px' direction='column'>
            <Text fontSize='lg' p={5} color='blackAlpha.800' fontWeight={500}>Order Summary</Text>
            <Box mx={5}>
                <Flex justifyContent='space-between'>
                    <Text fontWeight='light'>Subtotal:</Text> 
                    <Text>{live.subtotal.formatted_with_symbol}</Text>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Text fontWeight='light'>Tax:</Text>
                    <Text>{live.tax.amount.formatted_with_symbol}</Text>
                </Flex>
            </Box>
        </Flex>
    )
}