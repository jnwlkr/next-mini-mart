import { Box, Menu, MenuButton, MenuList, MenuItem, Button, Text } from '@chakra-ui/react';
import { Navbar, ProductList } from '../components';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
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
    const [sort, setSort] = useState('');

    return (
        <>
        <Navbar textColor='black' />
        <Box mt={5}>
            <Box
                w='100%'
                display='flex'
                flexWrap='wrap'
                alignItems='center'
                justifyContent='space-between'
                px={5}
            >
                <Box>
                    <Text fontSize='2xl' fontWeight={600}>Products</Text>
                    <Text fontSize='sm'>{products.length} items</Text>
                </Box>
                <Menu closeOnSelect>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Sort by
                    </MenuButton>
                    <MenuList>
                        <MenuItem justifyContent='left' onClick={() => setSort('alphabetical')}>
                            Name: A-Z
                        </MenuItem>
                        <MenuItem justifyContent='left' onClick={() =>setSort('ascendingPrice')}>
                            Price: Low to high
                        </MenuItem>
                        <MenuItem justifyContent='left' onClick={() => setSort('descendingPrice')}>
                            Price: High to low
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <ProductList products={products} sort={sort} />
        </Box>
        </>
    );
};
