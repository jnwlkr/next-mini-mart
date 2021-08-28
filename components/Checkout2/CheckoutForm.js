import { Box, Text, Flex, Button, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react'
import { useCartState, useCartDispatch } from '../../context/cart';
import { useCheckoutState, useCheckoutDispatch } from '../../context/checkout';

export default function CheckoutForm() {

    return (
        <Flex w='100%' mr={{base: 0, md: 5}} borderRadius='md' boxShadow='xl' height='500px' bgColor='gray.100'>
            Form
        </Flex>
    )
}