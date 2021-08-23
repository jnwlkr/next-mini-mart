import { Box, Flex, Text, Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Divider, CircularProgress } from '@chakra-ui/react';
import Link from 'next/link';
import { ShippingForm, Review } from '../components';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useCartState } from '../context/cart';
import commerce from '../lib/commerce';

export default function Checkout() {
    const { id } = useCartState();
    const [checkoutToken, setCheckoutToken] = useState();
    const [index, setIndex] = useState([0]);

    useEffect(() => {
        commerce.checkout.generateToken(id, {type: 'cart'}).then((checkout) => setCheckoutToken(checkout));
    }, []);

    return (
        <Box>
            {/* Header & back to cart */}
            <Flex 
                w='100%' 
                h='64px' 
                align='center'
                justify='center' 
                boxShadow='xs' 
                opacity='0.8'
                px={{base: 5, md: 10}}
                fontSize={20}
                fontWeight={300}
            >
                
                <Text fontSize={24} fontWeight={700} fontStyle='italic'color='black' mr={2}>minimart checkout</Text>
            </Flex>
            <Link href='/cart'>
                <a>
                    <ArrowBackIcon w={7} h={7} /> Back to cart
                </a>
            </Link>
            {/* Contents */}
            {!checkoutToken ? (
                <Flex alignItems='center' justifyContent='center' height='400px'>
                    <CircularProgress isIndeterminate />
                </Flex>
            ) : (

            <Flex m={{base: 5, md: 10}} flexWrap='wrap'>
                {/* Forms: minWidth={{base: '100%', md: '70%'}} */}
                <Flex minWidth={{base: '100%', md: '60%'}} pr={{base: 0, md: 5}} mb={{base: 5, md: 0}}>
                    <Accordion allowToggle defaultIndex={index} width='100%'>
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontSize='lg' fontWeight={500}>
                                    1. {checkoutToken?.id}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <ShippingForm checkoutToken={checkoutToken} />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontSize='lg' fontWeight={400}>
                                    2. Choose a shipping method
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                Shipping method
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontSize='lg' fontWeight={400}>
                                    3. Payment
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                PaymentForm
                            </AccordionPanel>
                        </AccordionItem>

                    </Accordion>
                </Flex>
                {/* Review & Checkout button: minWidth={{base: '100%', md: '30%'}} */}
                <Review checkoutToken={checkoutToken} />
            </Flex>)}
        </Box>
    )
}