import { Flex, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import { ShippingForm } from '../../components';
import { useState } from 'react';

export default function CheckoutForm({ checkoutToken }) {
    const [index, setIndex] = useState([0]);

    return (
        <Flex width={{base: '100%', md: '70%'}} pr={{base: 0, md: 5}} mb={{base: 5, md: 0}}>
                    <Accordion allowToggle defaultIndex={index} width='100%'>
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontSize='lg' fontWeight={600}>
                                    1. Shipping information
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <ShippingForm checkoutToken={checkoutToken} />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex='1' textAlign='left' fontSize='lg' fontWeight={600}>
                                    2. Payment
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                Payment
                            </AccordionPanel>
                        </AccordionItem>

                    </Accordion>
                </Flex>
    )
}