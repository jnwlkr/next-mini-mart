import { Box, Flex, Text, Divider, Button } from '@chakra-ui/react';

export default function Review({ checkoutToken }) {

    return (
        <Flex width={{base: '100%', md: '30%'}} height='200px' flexDirection='column' pl={{base: 0, md: 0}} borderRadius='md'>
                    <Text fontSize='lg' fontWeight={600}>Order summary</Text>
                    <Divider />
                    <Box my={2}>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Subtotal:</Text> 
                            <Text fontWeight='semibold'>{checkoutToken.live.subtotal.formatted_with_symbol}</Text>
                        </Flex>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Tax:</Text> 
                            <Text>{checkoutToken.live.tax.amount.formatted_with_symbol}</Text>
                        </Flex>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Shipping:</Text> 
                            <Text>{checkoutToken.live.shipping.price.formatted_with_symbol}</Text>
                        </Flex>
                        <Divider mb={1}/>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='semibold'>Total:</Text> 
                            <Text fontWeight='semibold'>{checkoutToken.live.total_with_tax.formatted_with_symbol}</Text>
                        </Flex>
                    </Box>
                    <Button isFullWidth>Complete order</Button>
                </Flex>
    )
}