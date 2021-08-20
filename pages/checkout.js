import { Box, Flex, Text, Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import Link from 'next/link';
import { ShippingForm } from '../components';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Checkout() {

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
            <Flex m={{base: 5, md: 10}}>
                {/* Forms: minWidth={{base: '100%', md: '70%'}} */}
                <Flex minWidth='100%'>
                    <Accordion allowToggle width='100%'>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    1. Shipping information
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <ShippingForm />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
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
                                <Box flex='1' textAlign='left'>
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
                <Flex>

                </Flex>
            </Flex>
        </Box>
    )
}