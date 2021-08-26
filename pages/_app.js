import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '../context/cart';
import { CheckoutProvider } from '../context/checkout';

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <CheckoutProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CheckoutProvider>
    </CartProvider>
  )
}
