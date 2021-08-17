import { Navbar } from '../../components';
import commerce from '../../lib/commerce';
import { Box } from '@chakra-ui/react';

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
    return (
        <>
            <Navbar textColor='black' />
            <Box mx={5} mt={5}>
                {product.name}
                {product.price.formatted_with_symbol}
            </Box>
        </>
    )
}