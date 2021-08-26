import { Box, Flex, Text,  CircularProgress} from '@chakra-ui/react';
import Link from 'next/link';
import {  Review, CheckoutForm, Confirmation } from '../components';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useCartState, useCartDispatch } from '../context/cart';
import commerce from '../lib/commerce';

export default function Checkout() {
    const { id } = useCartState();
    const { reset } = useCartDispatch();
    const [checkoutToken, setCheckoutToken] = useState();
    const [shippingData, setShippingData] = useState();
    const [orderData, setOrderData] = useState();
    const [order, setOrder] = useState();
    const [confirmed, setConfirmed] = useState(false);

    // handleShipping
    //  setShippingData upon button click in ShippingForm
    //  setTaxZone
    //  get live object
    //  pass to Review for updated totals

    const handleCheckout = async (event, checkoutTokenId, orderData) => {
            event.preventDefault();
            setConfirmed(true);
            await commerce.checkout.capture(checkoutTokenId, orderData).then((response) => setOrder(response));
            reset();
            setCheckoutToken(null);
            // refresh cart
            // Confirmation
        }

    const update = async (data) => {
        setShippingData(data);
        await commerce.checkout.setTaxZone(checkoutToken.id, { country: data.country, region: data.subdivision, postal_zip_code: data.zip});
        console.log(data); //works
    }

    useEffect(() => {
        try {
            commerce.checkout.generateToken(id, {type: 'cart'}).then((checkout) => setCheckoutToken(checkout));
        } catch (error) {
            console.log('lol')
        }
        console.log(checkoutToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
            {/* Contents */}
            {!checkoutToken && !confirmed || !order && !!confirmed ? (
                <Flex alignItems='center' justifyContent='center' height='400px'>
                    <CircularProgress isIndeterminate />
                </Flex>
            ) : !!order && !!confirmed ? (
                <Flex>
                <Confirmation order={order} />
                </Flex>
            ) : (
            <>
            <Flex px={5} pt={5}>
            <Link href='/cart'>
                <a>
                    <ArrowBackIcon w={7} h={7} /> Back to cart
                </a>
            </Link>
            </Flex>
            <Flex m={{base: 5, md: 10}} flexWrap='wrap'>
                {/* Forms: minWidth={{base: '100%', md: '70%'}} */}
                <CheckoutForm checkoutToken={checkoutToken} update={update} setOrderData={setOrderData} />
                {/* Review & Checkout button: minWidth={{base: '100%', md: '30%'}} */}
                <Review checkoutToken={checkoutToken.id} orderData={orderData} handleCheckout={handleCheckout} />
            </Flex>
            </>
            )}
        </Box>
    )
}