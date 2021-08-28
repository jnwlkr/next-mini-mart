import { Flex, Box, Text, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function CheckoutNavbar() {
    const router = useRouter();

    return (
        <Flex 
            w='100%' 
            h='64px'  
            boxShadow='xs' 
            opacity='0.8'
            alignItems='center'
            justifyContent='space-between'
            px={3}
        >
            <Flex>
                <IconButton variant='ghost' icon={<ArrowBackIcon />} onClick={() => router.push('/cart')} size='lg' />
            </Flex>

            <Text 
                fontSize={24} 
                fontWeight={700} 
                fontStyle='italic'
                color='black'
            >
                <Link href='/'>
                    minimart checkout
                </Link>
            </Text>

            <Box />

        </Flex>
    )
}