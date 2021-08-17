import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '../context/cart';

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </CartProvider>
  )
}
