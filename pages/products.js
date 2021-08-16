import { Box, Menu, MenuButton, MenuList, MenuItem, Button, Text } from '@chakra-ui/react';
import { Navbar, ProductList } from '../components';
import { ChevronDownIcon } from '@chakra-ui/icons';
import commerce from '../lib/commerce';

export async function getStaticProps() {
    const { data: products } = await commerce.products.list();

    return {
        props: {
            products,
        },
    };
}

export default function Products({ products }) {

    return (
        <>
        <Navbar textColor='black' />
        <Box mx={5} mt={1}>
            <Box
                w='100%'
                display='flex'
                flexWrap='wrap'
                alignItems='center'
                justifyContent='space-between'
                p={5}
            >
                <Box>
                    <Text fontSize='2xl' fontWeight={600}>Products</Text>
                    <Text fontSize='sm'>{products.length} items</Text>
                </Box>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sort by
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            Price: Low to high
                        </MenuItem>
                        <MenuItem>
                            Price: High to low
                        </MenuItem>
                        <MenuItem>
                            Name: A-Z
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <ProductList products={products} />
        </Box>
        </>
    );
};
