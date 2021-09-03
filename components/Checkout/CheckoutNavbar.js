import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Text, IconButton } from '@chakra-ui/react';

export default function CheckoutNavbar({ disableBack }) {
    const router = useRouter();

    if (disableBack) {
        return (
            <Flex 
            px={3}
            w='100%' 
            h='64px'
            opacity='0.8'
            alignItems='center'
            justifyContent='center'
            fontSize={24} 
            fontWeight={700} 
            fontStyle='italic' 
            color='black'
        >
                minimart <Text ml={2} fontWeight={300}>checkout</Text>
        </Flex>
        )
    }

    return (
        <Flex 
            px={3}
            w='100%' 
            h='64px'
            opacity='0.8'
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
            <Flex w='48px' h='48px'/>
        </Flex>
    )
}