import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function Checkout() {

    return (
        <Box>
            <Link href='/cart'>
                <a>
                    <Button>Back to cart</Button>
                </a>
            </Link>
        </Box>
    )
}