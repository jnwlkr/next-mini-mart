import { MdShoppingCart } from 'react-icons/md';
import { useRef } from 'react';
import { useCartState } from '../../../context/cart';
import Link from 'next/link';
import CartItem from './CartItem';
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
    Box,
    Button,
    Text,
    Divider,
} from '@chakra-ui/react';

function EmptyCart() {
    return (
        <Box display='flex' justifyContent='center'>
            Your cart is empty!
        </Box>
    )
}

export default function ShoppingCart({ textColor }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { line_items, subtotal } = useCartState();
    const btnRef = useRef();

    const isEmpty = line_items.length === 0;

    return (
        <>
        <Box>
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
                pos='relative'
            />
            {!isEmpty ? 
                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    w='21px' 
                    h='21px' 
                    bgColor='blackAlpha.600' 
                    color='white'
                    fontWeight={600} 
                    pos='absolute' 
                    right='3' 
                    top='1' 
                    fontSize='xs'  
                    borderRadius='20px'
                >
                    {line_items.length}
                </Box> : <></>}
            </Box>
            <Drawer
                motionPreset='scale'
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
                    <Divider />
                    <DrawerBody>
                        {isEmpty ? (
                            <EmptyCart />
                        ) : (
                            <List spacing={5} mt={3}>
                                {line_items.map((item) => (
                                    <>
                                    <ListItem key={item.id} pb={2}>
                                        <CartItem key={item.id} {...item} />
                                    </ListItem>
                                    </>
                                ))}
                                <Divider key='divider' />
                                <ListItem display='flex' justifyContent='space-between' key='subtotal'>
                                    <Text fontWeight={600}>Subtotal:</Text> <Text>{subtotal.formatted_with_symbol}</Text>
                                </ListItem>
                                <ListItem key='review-cart'>
                                    <Link href='/cart'>
                                        <a>
                                            <Button isFullWidth>Review cart</Button>
                                        </a>
                                    </Link>
                                </ListItem>
                            </List>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}