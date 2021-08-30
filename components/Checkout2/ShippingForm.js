/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, FormControl, Input, Select, Box, FormLabel, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCheckoutState, useCheckoutDispatch } from '../../context/checkout';
import commerce from '../../lib/commerce';
import { useEffect, useState } from 'react';

export default function ShippingForm() {
    const { id } = useCheckoutState();
    const { setShippingMethod } = useCheckoutDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [shippingData, setShippingData] = useState();
    const [countries, setCountries] = useState({});
    const [country, setCountry] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [subdivisions, setSubdivisions] = useState({});
    const [shippingMethods, setShippingMethods] = useState([]);

    const getCountries = async (checkoutTokenId) => {
        try {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
            setCountries(countries);
        } catch (error) {
            // console.log(error)
        }
    };

    const handleCountryChange = async (e) => {
        try {
            const { subdivisions } = await commerce.services.localeListSubdivisions(e.target.value);
            setSubdivisions(subdivisions);
            setCountry(e.target.value);
        } catch (error) {
            // console.log(error)
        }
    };

    const handleSubdivisionChange = async (e) => {
        try {
            const subdivision = e.target.value;
            commerce.checkout.getShippingOptions(id, { country, subdivision }).then((response) => setShippingMethods(response));
            setSubdivision(subdivision);
        } catch (error) {
            // console.log(error);
        }
    }

    const onSubmit = (data) => {
        setShippingData(data);
        console.log(data) // shippingData
    };

    useEffect(() => {
        getCountries(id);
    }, []);


    return (
        <Box width='100%'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex width='100%'>
                    <FormControl m={2} isInvalid={errors.firstName}>
                        <FormLabel>First name</FormLabel>
                        <Input 
                            placeholder='First name'
                            id='first-name' 
                            type='text'
                            {...register('firstName', { 
                                required: 'Your name is required',
                                minLength: { value: 2, message: 'Too short!'} 
                            })} 
                        />
                    </FormControl>
                    <FormControl m={2} isInvalid={errors.lastName}>
                        <FormLabel>Last name</FormLabel>
                        <Input 
                            placeholder='Last name'
                            id='last-name' 
                            type='text'
                            {...register('lastName', { 
                                required: 'Your name is required',
                                minLength: { value: 2, message: 'Too short!'} 
                            })} 
                        />
                    </FormControl>
                </Flex>
                <Flex>
                    <FormControl m={2} isInvalid={errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input 
                            placeholder='yourname@email.com'
                            id='email' 
                            type='email'
                            {...register('email', { 
                                required: 'Your email address is required',
                                minLength: { value: 2, message: 'Too short!'} 
                            })} 
                        />
                    </FormControl>
                </Flex>
                <Flex>
                    <FormControl m={2} isInvalid={errors.country} onChange={(e) => handleCountryChange(e)}>
                        <FormLabel>Country</FormLabel>
                        <Select 
                            placeholder='Country'
                            id='country'
                            {...register('country', {
                                required: 'Please choose a country',
                            })}
                        >
                            {Object.entries(countries).map(([code, name]) => ({ id: code, label: name})).map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>
                <Flex>
                    <FormControl m={2} isInvalid={errors.address}>
                        <FormLabel>Address line 1</FormLabel>
                        <Input 
                            placeholder='Address line 1'
                            id='address1' 
                            type='text'
                            {...register('address1', { 
                                required: 'Your address is required',
                            })} 
                        />
                    </FormControl>
                    <FormControl m={2} isInvalid={errors.address}>
                        <FormLabel>Address line 2</FormLabel>
                        <Input placeholder='Address line 2' id='address2' type='text' {...register('address2')} />
                    </FormControl>
                </Flex>
                <Flex>
                    <FormControl m={2} isInvalid={errors.city}>
                        <FormLabel>City</FormLabel>
                        <Input 
                            placeholder='City'
                            id='city' 
                            type='text'
                            {...register('city', { 
                                required: 'Your city is required',
                                minLength: { value: 3, message: 'Too short!'} 
                            })} 
                        />
                    </FormControl>
                    <FormControl m={2} isInvalid={errors.subdivision} onChange={(e) => handleSubdivisionChange(e)}>
                        <FormLabel>State</FormLabel>
                        <Select 
                            placeholder='State'
                            id='state'
                            {...register('state', {
                                required: 'Please choose a state',
                            })}
                        >
                            {Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name})).map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl m={2} isInvalid={errors.zip}>
                        <FormLabel>Zip code</FormLabel>
                        <Input 
                            placeholder='Zip code'
                            id='zip' 
                            type='text'
                            {...register('zip', { 
                                required: 'Your postal code is required',
                                minLength: { value: 5, message: 'Too short!'} 
                            })} 
                        />
                    </FormControl>
                </Flex>
                <Flex m={2}>
                    <FormControl isInvalid={errors.shippingMethod} onChange={(e) => setShippingMethod(e.target.value, country, subdivision)}>
                        <FormLabel>Choose a shipping method</FormLabel>
                        <Select 
                            placeholder='Shipping method'
                            id='shipping-method'
                            {...register('shippingMethod', {
                                required: 'Please choose a shipping method',
                            })}
                        >
                            {shippingMethods.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}` } )).map((item) => (
                                <option key={item.id} value={item.id}>{item.label}</option>
                            ))} 
                        </Select>
                    </FormControl>
                </Flex>
                <Flex>
                    <Button m={2} mt={4} isFullWidth>Continue to payment</Button>
                </Flex>
            </form>
        </Box>
    )
}