/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, FormControl, Input, Select, Box, FormLabel, Button } from '@chakra-ui/react';
import { useCheckoutState, useCheckoutDispatch } from '../../context/checkout';
import commerce from '../../lib/commerce';
import { useEffect, useState } from 'react';

export default function ShippingForm({ setShippingData, setTabIndex }) {
    const { id } = useCheckoutState();
    const { setShippingMethod, setTaxZone } = useCheckoutDispatch();
    const [countries, setCountries] = useState({});
    const [subdivisions, setSubdivisions] = useState({});
    const [shippingMethods, setShippingMethods] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');  
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');  
    const [country, setCountry] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [zip, setZip] = useState('');
    const [shipping, setShipping] = useState('');

    const getCountries = async (checkoutTokenId) => {
        try {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setCountries(countries);
        } catch (error) {
            // console.log(error)
        }
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        commerce.services.localeListSubdivisions(e.target.value).then((subdivisions) => setSubdivisions(subdivisions.subdivisions));
    };

    const handleSubdivisionChange = async (e) => {
        try {
            const subdivision = e.target.value;
            commerce.checkout.getShippingOptions(id, { country, subdivision }).then((response) => setShippingMethods(response));
            setSubdivision(subdivision);
        } catch (error) {
            // console.log(error);
        }
    };

    const handleShippingChange = (e) => {    
        setShipping(e.target.value);
        setShippingMethod(e.target.value, country, subdivision);
    }

    const handleSubmit = (event) => {
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
            shippingMethod: shipping,
        };
        setShippingData(data);
        setTaxZone(country, subdivision, data.zip);
        setTabIndex(1);
        console.log(data) // shippingData
    };

    useEffect(() => {
        getCountries(id);
    }, []);


    return (
        <Box width='100%'>
            <form onSubmit={handleSubmit}>
                <Flex width='100%'>
                    <FormControl m={2} isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder='First name' id='first-name' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </FormControl>
                    <FormControl m={2} isRequired>
                        <FormLabel>Last name</FormLabel>
                        <Input placeholder='Last name' id='last-name' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                </Flex>
                <Flex w='100%'>
                    <FormControl m={2} isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input placeholder='Email address' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                </Flex>
                <Flex w='100%'>
                    <FormControl m={2} isRequired >
                        <FormLabel>Country</FormLabel>
                        <Select placeholder='Country' id='country' value={country} onChange={(e) => handleCountryChange(e)}>
                            {Object.entries(countries).map(([code, name]) => ({ id: code, label: name})).map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>
                <Flex flexDirection='row'>
                    <FormControl m={2} isRequired>
                        <FormLabel>Address line 1</FormLabel>
                        <Input placeholder='Address line 1' id='address1' type='text' value={address1} onChange={(e) => setAddress1(e.target.value)}/>
                    </FormControl>
                    <FormControl m={2}>
                        <FormLabel>Address line 2</FormLabel>
                        <Input placeholder='Address line 2' id='address2' type='text' value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </FormControl>
                </Flex>
                <Flex>
                    <FormControl m={2} isRequired>
                        <FormLabel>City</FormLabel>
                        <Input placeholder='City' id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)}/>
                    </FormControl>
                    <FormControl m={2} isRequired>
                        <FormLabel>State</FormLabel>
                        <Select placeholder='State' id='state' value={subdivision} onChange={(e) => handleSubdivisionChange(e)}>
                            {Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name})).map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl m={2} isRequired>
                        <FormLabel>Zip code</FormLabel>
                        <Input placeholder='Zip code' id='zip' type='number' value={zip} onChange={(e) => setZip(e.target.value)}/>
                    </FormControl>
                </Flex>
                <Flex m={2}>
                    <FormControl isRequired onChange={(e) => setShippingMethod(e.target.value, country, subdivision)}>
                        <FormLabel>Choose a shipping method</FormLabel>
                        <Select placeholder='Shipping method' id='shipping-method' value={shipping} onChange={(e) => handleShippingChange(e)}>
                            {shippingMethods.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}` } )).map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))} 
                        </Select>
                    </FormControl>
                </Flex>
                <Flex>
                    <Button m={2} mt={4} type='submit' isFullWidth>Continue to payment</Button>
                </Flex>
            </form>
        </Box>
    )
}