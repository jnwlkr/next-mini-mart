import { Flex, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Input, FormControl, Select, Button } from '@chakra-ui/react';
import commerce from '../../lib/commerce';
import { useState, useEffect } from 'react';

export default function CheckoutForm({ checkoutToken }) {
    const [index, setIndex] = useState([0]);
    const [country, setCountry] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [shippingCountries, setShippingCountries] = useState({});
    const [subdivisions, setSubdivisions] = useState({});
    const [shippingMethods, setShippingMethods] = useState([]);

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        commerce.services.localeListSubdivisions(e.target.value).then((subdivisions) => setSubdivisions(subdivisions.subdivisions));
    };

    const handleSubdivisionChange = (e) => {
        setSubdivision(e.target.value);
        commerce.checkout.getShippingOptions(checkoutToken.id, { country, subdivision }).then((response) => setShippingMethods(response));
    }

    const handleShippingChange = (e) => {
        setShippingMethod(e.target.value);
        commerce.checkout.checkShippingOption(checkoutToken.id, { shipping_option_id: e.target.value, country: country, region: subdivision }).then((response) => console.log(response))
    }

    

    useEffect(() => {
        commerce.services.localeListShippingCountries(checkoutToken.id).then((countries) => setShippingCountries(countries.countries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    


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
                        <Box>
                            <form>
                                <Flex>
                                    <FormControl m={1} id='first-name' isRequired>
                                        <Input  placeholder='First name' />
                                    </FormControl>
                                    <FormControl m={1} id='last-name' isRequired>
                                        <Input  placeholder='Last name' />
                                    </FormControl>
                                </Flex>
                                <Flex>
                                    <Input m={1} placeholder='Email address' />
                                </Flex>
                                <Flex>
                                    <Select maxWidth='100%' m={1} placeholder='Country' value={country} onChange={(e) => handleCountryChange(e)}>
                                        {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name})).map((item) => (
                                            <option key={item.id} value={item.id}>{item.label}</option>
                                        ))}
                                    </Select>
                                </Flex>
                                <Flex>
                                    <Input m={1} placeholder='Address line 1' />
                                    <Input m={1} placeholder='Address line 2' />
                                </Flex>
                                <Flex>
                                    <Input m={1} placeholder='City/Town' />
                                </Flex>
                                <Flex>
                                    <Select width='50%' m={1} placeholder='State/Province' value={subdivision} onChange={(e) => handleSubdivisionChange(e)}>
                                        {Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                            <option key={item.id} value={item.id}>{item.label}</option>
                                        ))}
                                    </Select>
                                    <Input width='50%' m={1} placeholder='Postal code' />
                                </Flex>
                                <Flex mb={5}>
                                    <Select m={1} placeholder='Shipping method' value={shippingMethod} onChange={(e) => handleShippingChange(e)}>
                                        {shippingMethods.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}` })).map((item) => (
                                            <option key={item.id} value={item.id}>{item.label}</option>
                                        ))} 
                                    </Select>
                                </Flex>
                            </form>
                            <Button isFullWidth>Confirm shipping information</Button>
                        </Box>
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