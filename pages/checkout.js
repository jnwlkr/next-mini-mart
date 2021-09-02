/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCartState, useCartDispatch } from '../context/cart';
import { CheckoutNavbar, OrderSummary, Shipping} from '../components';
import { useCheckoutState, useCheckoutDispatch } from '../context/checkout';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Box, Text, Flex, Button, Tabs, Tab, TabList, TabPanel, TabPanels, CircularProgress } from '@chakra-ui/react';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);

export default function Checkout() {
    const router = useRouter();
    const { id } = useCheckoutState();
    const { id: cartId } = useCartState();
    const { reset: resetCart } = useCartDispatch();
    const { generateToken, captureCheckout, reset } = useCheckoutDispatch();

    const [tabIndex, setTabIndex] = useState(0);
    const [shippingData, setShippingData] = useState();

    useEffect(() => {
        generateToken(cartId);
        console.log(id);
    }, [cartId]);

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log(error);
        } else {
            const data = {
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email,
                },
                shipping: {
                    name: shippingData.firstName + ' ' + shippingData.lastName,
                    street: shippingData.address1,
                    street_2: shippingData.address2,
                    town_city: shippingData.city,
                    county_state: shippingData.subdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.country,
                }, 
                fulfillment: {
                    shipping_method: shippingData.shippingMethod,
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            captureCheckout(data);
        }
    };

    if (!id) {
        return (
            <Flex direction='column' w='100hw' h='100vh' align='center' justify='center'>
                <CircularProgress isIndeterminate /> Preparing checkout...
            </Flex>
        )
    };

    return (
        <Box>
            <CheckoutNavbar />
            <Flex flexWrap='wrap' mx={{base: 5, md: 10}}>
                <Box width={{base: '100%', md: '60%'}} bgColor='gray.50' borderRadius='md' boxShadow='xl' pt={2}>
                    <Tabs isFitted index={tabIndex}>
                        <TabList>
                            <Tab onClick={() => setTabIndex(0)}>1. Shipping</Tab>
                            <Tab onClick={() => setTabIndex(1)}>2. Billing</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel w='100%' onClick={() => setTabIndex(0)}>
                                <Shipping setShippingData={setShippingData} setTabIndex={setTabIndex} />
                            </TabPanel>
                            <TabPanel>
                                <Box>
                                    <Text fontWeight={500} mb={5}>Enter your payment information</Text>
                                    <Elements stripe={stripePromise}>
                                        <ElementsConsumer>
                                            {({ elements, stripe }) => (
                                                <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                                    <Box p={5} mb={5} borderRadius='md' boxShadow='base'>
                                                        <CardElement />
                                                    </Box>
                                                    <Button isFullWidth boxShadow='lg' type='submit' >Complete order</Button>
                                                </form>
                                            )}
                                        </ElementsConsumer>
                                    </Elements>
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Flex direction='column' align='center' width={{base: '100%', md: '40%'}}>
                    <OrderSummary />
                </Flex>
            </Flex>
        </Box>
    );
};