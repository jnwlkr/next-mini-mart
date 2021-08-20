import { Box, Flex, Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import Link from 'next/link';
import { ShippingForm } from '../components';

export default function Checkout() {

    return (
        <Box>
            {/* Header & back to cart */}
            <Link href='/cart'>
                <a>
                    <Button>Back to cart</Button>
                </a>
            </Link>
            {/* Contents */}
            <Flex m={10}>
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