import commerce from '../lib/commerce';
import CategoryList from '../components/CategoryList';
import { Navbar } from '../components';
import { Box } from '@chakra-ui/react';

export async function getStaticProps() {
    const { data: categories } = await commerce.categories.list();

    return {
        props: {
            categories,
        },
    };
}

export default function CategoriesPage({ categories }) {
    return (
        <>
            <Navbar textColor='black' />
                <Box mx={5} mt={5}>
                    <CategoryList categories={categories} />
                </Box>
        </>
    );
}