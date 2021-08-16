import { MdShoppingCart } from 'react-icons/md';
import { useRef } from 'react';
import {
    IconButton,
    useDisclosure, 
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, 
    List,
    ListItem,
} from '@chakra-ui/react';


export const ShoppingCart = ({ textColor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <>
            <IconButton 
                icon={<MdShoppingCart />}  
                variant='ghost'
                size='lg'
                ref={btnRef}
                onClick={onOpen}
                fontSize='24px'
                style={{ color: `${textColor}`}}
                _hover={{ background: 'transparent' }}
                _focus={{ background: 'transparent' }}
                _active={{ opacity: '0.5' }}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton
                        _focus={{ background: 'transparent' }}
                        _active={{ opacity: '0.4' }}
                    />
                    <DrawerHeader>Shopping Cart</DrawerHeader>
                    <DrawerBody>
                        <List spacing={4}>
                            <ListItem>
                                CartItem component TODO
                            </ListItem>
                            <ListItem>
                                Subtotal
                            </ListItem>
                            <ListItem>
                                Go to cart button
                            </ListItem>
                            <ListItem>
                                Checkout button
                            </ListItem>
                        </List>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}