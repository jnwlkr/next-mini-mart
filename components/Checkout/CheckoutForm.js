import { Flex, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Input, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import commerce from '../../lib/commerce';
import { useState, useEffect } from 'react';

export default function CheckoutForm({ checkoutToken, update }) {
    const [index, setIndex] = useState([0]);
    const [country, setCountry] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [shippingCountries, setShippingCountries] = useState({});
    const [subdivisions, setSubdivisions] = useState({});
    const [shippingMethods, setShippingMethods] = useState([]);
    const [shippingData, setShippingData] = useState({});

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

    const handleShippingData = (event) => {
        event.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            country: country,
            address1: address1,
            address2: address2,
            city: city,
            subdivision: subdivision,
            zip: zip,
            shippingMethod: shippingMethod,
        };
        update(data);
        setIndex([1]);
    }

    

    useEffect(() => {
        commerce.services.localeListShippingCountries(checkoutToken.id).then((countries) => setShippingCountries(countries.countries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkoutToken.id])
    


    return (
        <Flex width={{base: '100%', md: '70%'}} pr={{base: 0, md: 5}} mb={{base: 5, md: 0}}>
            <Accordion allowToggle defaultIndex={[0]} index={index} width='100%'>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex='1' textAlign='left' fontSize='lg' fontWeight={600}>
                            1. Shipping information
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Box>
                            <form onSubmit={handleShippingData}>
                                <Flex>
                                    <FormControl m={1} id='first-name' isRequired>
                                        <FormLabel>First name</FormLabel>
                                        <Input placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </FormControl>
                                    <FormControl m={1} id='last-name' isRequired>
                                        <FormLabel>Last name</FormLabel>
                                        <Input placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </FormControl>
                                </Flex>
                                <Flex>
                                    <FormControl m={1} id='email-address' isRequired>
                                        <FormLabel>Email address</FormLabel>
                                        <Input type='email' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </FormControl>
                                </Flex>
                                <Flex>
                                    <FormControl maxWidth='100%' m={1} id='country' isRequired>
                                    <FormLabel>Country</FormLabel>
                                    <Select placeholder='Country' value={country} onChange={(e) => handleCountryChange(e)}>
                                        {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name})).map((item) => (
                                            <option key={item.id} value={item.id}>{item.label}</option>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Flex>
                                <Flex>
                                    <FormControl m={1} isRequired id='address-1'>
                                        <FormLabel>Address line 1</FormLabel>
                                        <Input placeholder='Address line 1' value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                    </FormControl>
                                    <FormControl m={1} id='address-2'>
                                        <FormLabel>Address line 2</FormLabel>
                                        <Input placeholder='Address line 2' value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </FormControl>
                                </Flex>
                                <Flex>
                                    <FormControl m={1} isRequired id='city'>
                                        <FormLabel>City/Town</FormLabel>
                                        <Input m={1} placeholder='City/Town' value={city} onChange={(e) => setCity(e.target.value)} />
                                    </FormControl>
                                    
                                </Flex>
                                <Flex>
                                    <FormControl width='50%' m={1} isRequired>
                                        <FormLabel>State/Province</FormLabel>
                                        <Select placeholder='State/Province' value={subdivision} onChange={(e) => handleSubdivisionChange(e)}>
                                            {Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                                <option key={item.id} value={item.id}>{item.label}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl width='50%' m={1} isRequired>
                                        <FormLabel>Postal code</FormLabel>
                                        <Input placeholder='Postal code' value={zip} onChange={(e) => setZip(e.target.value)} />
                                    </FormControl>
                                </Flex>
                                <Flex mb={5}>
                                    <FormControl m={1} isRequired>
                                        <FormLabel>Shipping method</FormLabel>
                                        <Select placeholder='Shipping method' value={shippingMethod} onChange={(e) => handleShippingChange(e)}>
                                            {shippingMethods.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}` } )).map((item) => (
                                                <option key={item.id} value={item.id}>{item.label}</option>
                                            ))} 
                                        </Select>
                                    </FormControl>
                                </Flex>
                            
                            <Button type='submit' isFullWidth>Confirm shipping information</Button>
                            </form>
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