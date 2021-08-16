import { Product } from '../../components';
import { Box } from '@chakra-ui/react';

export default function ProductList({ products }) {
    if (!products) return null;

/*     function sortPrice({ products }) {
        products.sort((a, b) => a.price - b.price);
    } */

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