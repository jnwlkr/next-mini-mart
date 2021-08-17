import { Navbar } from '../../components';
import commerce from '../../lib/commerce';
import { Box, Button } from '@chakra-ui/react';
import { useCartDispatch } from '../../context/cart';

export async function getStaticProps({ params }) {
    const { permalink } = params;

    const product = await commerce.products.retrieve(permalink, {
        type: 'permalink',
    });

    return {
        props: {
            product,
        },
    };
}

export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();

    return {
        paths: products.map((product) => ({
            params: {
                permalink: product.permalink,
            },
        })),
        fallback: false,
    };
}

export default function ProductPage({ product }) {
    const { setCart } = useCartDispatch()

    const addToCart = () => {
        commerce.cart.add(product.id).then(({cart}) => setCart(cart));
    }

    return (
        <>
            <Navbar textColor='black' />
            <Box mx={5} mt={5}>
                {product.name}
                {product.price.formatted_with_symbol}
                <Button onClick={addToCart}>Add to Cart</Button>
            </Box>
        </>
    )
}