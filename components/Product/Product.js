import { Box, Text, Button } from '@chakra-ui/react';
import Image from 'next/image'
import Link from 'next/link'
import { MdShoppingCart } from 'react-icons/md';

export default function Product({ name, price, media, permalink }) {

    return (
        <Box overflow='hidden' m={3} p={5} borderRadius='md'>
            <Link href={`/products/${permalink}`}>
                <a>
            <Image src={media.source} alt='Product image' width={275} height={275} />
                <Text fontSize='md' fontWeight={300} pt={3}>{name}</Text></a></Link>
                <Text fontSize='lg' fontWeight={700} pb={3}>{price.formatted_with_symbol}</Text>
                <Button
                    isFullWidth
                    leftIcon={<MdShoppingCart/>}
                >
                    Add to Cart
                </Button>
        </Box>
    );
};