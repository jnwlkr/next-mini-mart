import { Box, Input, Flex, Select, Button } from '@chakra-ui/react';
import commerce from '../../lib/commerce';
import { useState, useEffect } from 'react';

export default function ShippingForm({ checkoutToken }) {
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
        console.log(shippingMethods);
    }

    useEffect(() => {
        commerce.services.localeListShippingCountries(checkoutToken.id).then((countries) => setShippingCountries(countries.countries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    


    return (
        <Box>
            <Flex>
                <Input m={1} placeholder='First name' />
                <Input m={1} placeholder='Last name' />
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
                <Select width='50%' m={1} placeholder='State/Province' value={subdivision} onChange={(e) => handleSubdivisionChange(e)}>
                    {Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                </Select>
                <Input width='50%' m={1} placeholder='Postal code' />
            </Flex>
            <Flex mb={5}>
                <Select m={1} placeholder='Shipping method' value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
                    {shippingMethods.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}` })).map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                    ))} 
                </Select>
            </Flex>

            <Button isFullWidth>Confirm shipping information</Button>
        </Box>
    )
}