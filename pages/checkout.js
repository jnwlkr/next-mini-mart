import { Box, Flex, Text,  CircularProgress } from '@chakra-ui/react';
import Link from 'next/link';
import {  Review, CheckoutForm } from '../components';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useCartState } from '../context/cart';
import commerce from '../lib/commerce';

export default function Checkout() {
    const { id } = useCartState();
    const [checkoutToken, setCheckoutToken] = useState();

    // handleShipping
    //  setShippingData upon button click in ShippingForm
    //  setTaxZone
    //  get live object
    //  pass to Review for updated totals

    useEffect(() => {
        try {
            commerce.checkout.generateToken(id, {type: 'cart'}).then((checkout) => setCheckoutToken(checkout));
        } catch (error) {
            console.log('lol')
        }
        console.log(checkoutToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Flex px={5} pt={5}>
            <Link href='/cart'>
                <a>
                    <ArrowBackIcon w={7} h={7} /> Back to cart
                </a>
            </Link>
            </Flex>
            {/* Contents */}
            {!checkoutToken ? (
                <Flex alignItems='center' justifyContent='center' height='400px'>
                    <CircularProgress isIndeterminate />
                </Flex>
            ) : (

            <Flex m={{base: 5, md: 10}} flexWrap='wrap'>
                {/* Forms: minWidth={{base: '100%', md: '70%'}} */}
                <CheckoutForm checkoutToken={checkoutToken} />
                {/* Review & Checkout button: minWidth={{base: '100%', md: '30%'}} */}
                <Review checkoutToken={checkoutToken} />
            </Flex>)}
        </Box>
    )
}