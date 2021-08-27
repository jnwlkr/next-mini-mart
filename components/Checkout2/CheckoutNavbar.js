import { Flex, Box, Text, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function CheckoutNavbar() {
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
                <Link href='/cart'>
                    <a>
                        <IconButton variant='outline' icon={<ArrowBackIcon />} />
                    </a>
                </Link>
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