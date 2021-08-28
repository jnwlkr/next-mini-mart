import { Flex, FormControl, Input, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCheckoutState, useCheckoutDispatch } from '../../context/checkout';
import commerce from '../../lib/commerce';
import { useEffect, useState } from 'react';

export default function ShippingForm() {
    const { id } = useCheckoutState();
    const { setShippingMethod } = useCheckoutDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data) // shippingData
    }

    return (
        <Flex>
            <form onSubmit={handleSubmit(onSubmit)}>

            </form>
        </Flex>
    )
}