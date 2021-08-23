import { Box, Flex, Text, Divider, Button } from '@chakra-ui/react';

export default function Review({ checkoutToken }) {

    return (
        <Flex minWidth={{base: '100%', md: '40%'}} height='200px' flexDirection='column' pl={{base: 0, md: 5}} borderRadius='md'>
                    <Text fontSize='lg' fontWeight={600}>Order summary</Text>
                    <Divider />
                    <Box my={2}>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Subtotal:</Text> 
                            <Text fontWeight='semibold'>-</Text>
                        </Flex>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Tax:</Text> 
                            <Text>TBD</Text>
                        </Flex>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Shipping:</Text> 
                            <Text>TBD</Text>
                        </Flex>
                        <Divider mb={1}/>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='semibold'>Total:</Text> 
                            <Text fontWeight='semibold'>-</Text>
                        </Flex>
                    </Box>
                    <Button isFullWidth>Complete order</Button>
                </Flex>
    )
}