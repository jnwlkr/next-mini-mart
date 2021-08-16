import { Box, Text } from '@chakra-ui/react';
import { HamburgerMenu } from './Hamburger/Hamburger';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';
import Link from 'next/link';

const Navbar = ({ textColor }) => {

    return (
        <Box 
            w='100%' 
            h='64px'  
            boxShadow='xs' 
            opacity='0.8'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            px={3}
        >
            <HamburgerMenu textColor={textColor} />
            <Text 
                fontSize={24} 
                fontWeight={700} 
                fontStyle='italic'
                color={`${textColor}`}
            >
                <Link href='/'>
                    minimart
                </Link>
            </Text>
            <ShoppingCart textColor={textColor}/>
        </Box>
    );
};

export default Navbar;