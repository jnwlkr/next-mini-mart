import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { Navbar } from '../components';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Products = () => {

    return (
        <>
        <Navbar textColor='black' />
        <Box mx={5} mt={1}>
            <Box
                w='100%'
                display='flex'
                alignItems='center'
                justifyContent='flex-end'
                p={5}
            >
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
        
        </Box>
        </>
    );
};

export default Products;