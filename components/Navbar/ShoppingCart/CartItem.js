import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';

export default function CartItem({ name, quantity, line_total, permalink }) {

    return (
        <Box display='flex' justifyContent='space-between' >
            <Box>
                <Link href={`/products/${permalink}`}>
                    <a>
                        <Text fontWeight={200}>{name}</Text>
                    </a>
                </Link>
                <Text fontSize='xs'>Quantity: {quantity}</Text>
            </Box>
            <Box>
                <Text fontSize='sm' fontWeight={400}>{line_total.formatted_with_symbol}</Text>
            </Box>
        </Box>
    );
};