import { Box, Text, Button } from '@chakra-ui/react';
import Image from 'next/image'
import { MdShoppingCart } from 'react-icons/md';

export default function Product({ name, price, media }) {

    return (
        <Box overflow='hidden' m={3} p={5} borderRadius='md'>
            <Image src={media.source} alt='Product image' width={275} height={275} />
                <Text fontSize='lg' fontWeight={700} pt={3}>{name}</Text>
                <Text fontSize='xl' fontWeight={400} pb={3}>{price.formatted_with_symbol}</Text>
                <Button
                    isFullWidth
                    leftIcon={<MdShoppingCart/>}
                >
                    Add to Cart
                </Button>
        </Box>
    );
};