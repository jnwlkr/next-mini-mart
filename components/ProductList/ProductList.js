import { Product } from '../../components';
import { Box } from '@chakra-ui/react';

export default function ProductList({ products, sort }) {

    if (!products) { 
        return null
    } else if (sort === 'ascendingPrice') {
        products.sort((a, b) => a.price.formatted - b.price.formatted);
    } else if (sort === 'descendingPrice') {
        products.sort((a, b) => b.price.formatted - a.price.formatted);
    } else if (sort === 'alphabetical') {
        products.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    };

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