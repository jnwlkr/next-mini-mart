import { Box, Flex, Text, Divider, Button, SkeletonText } from '@chakra-ui/react';
import commerce from '../../lib/commerce';
import { useState, useEffect } from 'react';

export default function Review({ checkoutToken }) {
    const [liveObj, setLiveObj] = useState();

    useEffect(() => {
        try {
            commerce.checkout.getLive(checkoutToken.id).then((response) => setLiveObj(response));
        } catch (error) {
            console.log('lol')
        }
    })

    return (
        <Flex width={{base: '100%', md: '30%'}} height='200px' flexDirection='column' pl={{base: 0, md: 0}} borderRadius='md'>
                {!liveObj ? (
                    <>
                    <SkeletonText startColor="pink.500" endColor="orange.500" height='100px' />
                    <SkeletonText startColor="pink.500" endColor="orange.500" height='100px' />
                    </>
                ) : (
                    <>
                    <Text fontSize='lg' fontWeight={600}>Order summary</Text>
                    <Divider />
                    <Box my={2}>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Subtotal:</Text> 
                            <Text>{liveObj.subtotal.formatted_with_symbol}</Text>
                        </Flex>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Tax:</Text>
                            <Text>{liveObj.tax.amount.formatted_with_symbol}</Text>
                        </Flex>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='light'>Shipping:</Text>
                            <Text>{liveObj.shipping.price.formatted_with_symbol}</Text>
                        </Flex>
                        <Divider mb={1}/>
                        <Flex mb={1} justifyContent='space-between'>
                            <Text fontWeight='semibold'>Total:</Text>
                            <Text fontWeight='semibold'>{liveObj.total_with_tax.formatted_with_symbol}</Text>
                        </Flex>
                    </Box>
                    <Button isFullWidth>Complete order</Button>
                    </>
                )}
        </Flex>
    )
}