import { MdMenu, MdHome, MdStore } from 'react-icons/md';
import Link from 'next/link';
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
    ListIcon
} from '@chakra-ui/react';


export const HamburgerMenu = ({ textColor}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <>
            <IconButton 
                icon={<MdMenu />}  
                variant='ghost'
                size='lg'
                ref={btnRef}
                onClick={onOpen}
                fontSize='24px'
                _hover={{ background: 'transparent' }}
                _focus={{ background: 'transparent' }}
                _active={{ opacity: '0.5' }}
                style={{ color: `${textColor}`}}
            />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton
                        _focus={{ background: 'transparent' }}
                        _active={{ opacity: '0.4' }}
                    />
                    <DrawerHeader>minimart</DrawerHeader>
                    <DrawerBody>
                        <List spacing={4}>
                            <ListItem>
                                <Link href='/' passHref>
                                <a>
                                    <ListIcon as={MdHome} />
                                    Home
                                </a>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href='/products' passHref>
                                <a>
                                    <ListIcon as={MdStore} />
                                    Products
                                </a>
                                </Link>
                            </ListItem>
                        </List>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}