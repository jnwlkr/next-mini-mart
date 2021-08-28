import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Box, Text, IconButton } from '@chakra-ui/react';

export default function CheckoutNavbar() {
    const router = useRouter();

    return (
        <Flex 
            px={3}
            w='100%' 
            h='64px'
            opacity='0.8'  
            boxShadow='xs' 
            alignItems='center'
            justifyContent='space-between'
        >
            <Flex>
                <IconButton 
                    size='lg'
                    variant='ghost' 
                    icon={<ArrowBackIcon />} 
                    onClick={() => router.push('/cart')} 
                />
            </Flex>
            <Flex fontSize={24} fontWeight={700} fontStyle='italic' color='black'>
                minimart <Text ml={2} fontWeight={300}>checkout</Text>
            </Flex>
            <Box />
        </Flex>
    )
}