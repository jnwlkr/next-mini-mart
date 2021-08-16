import { Product } from '../../components';
import { Box } from '@chakra-ui/react';

export default function ProductList({ products }) {
    if (!products) return null;

    return (
        <Box 
            display='flex' 
            flexWrap='wrap'
            justifyContent='center'
        >
            {products.map((product) => (
                <Box key={product.permalink}>
                    <Product {...product} />
                </Box>
            ))}
        </Box>
    );
};