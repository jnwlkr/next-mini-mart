import { Box, Button } from '@chakra-ui/react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`);

export default function PaymentForm({ checkoutToken, shippingData, setOrder }) {

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
            setOrder(data);
            console.log(data);
        }
    }

    return (
        <Box>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe })} => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <Box>
                                <CardElement />
                            </Box>
                            <Button isFullWidth type='submit' disabled={!stripe}>Confirm payment information</Button>
                        </form>
                    )
                </ElementsConsumer>
            </Elements>
        </Box>
    )
}