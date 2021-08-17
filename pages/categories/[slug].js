import commerce from '../../lib/commerce';
import { Navbar, ProductList } from '../../components';
import { Box } from '@chakra-ui/react';

export async function getStaticProps({ params }) {
    const { slug } = params;

    const category = await commerce.categories.retrieve(slug, {
        type: 'slug',
    });

    const { data: products } = await commerce.products.list({
        category_slug: [slug],
    });

    return {
        props: {
            category,
            products,
        },
    };
}

export async function getStaticPaths() {
    const { data: categories } = await commerce.categories.list();

    return {
        paths: categories.map((category) => ({
            params: {
                slug: category.slug,
            },
        })),
        fallback: false,
    };
}

export default function CategoryPage({ category, products }) {
    return (
        <>
            <Navbar textColor='black' />
                <Box mx={5} mt={5}>
                    {category.name}
                    <ProductList products={products} />
                </Box>
        </>
    )
}