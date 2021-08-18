import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../../components';
import commerce from '../../lib/commerce';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Breadcrumb, BreadcrumbItem, Text, Divider, useToast, Icon, VStack } from '@chakra-ui/react';
import { useCartDispatch } from '../../context/cart';
import { MdCheckCircle, MdLocalShipping, MdMood } from 'react-icons/md';

export async function getStaticProps({ params }) {
    const { permalink } = params;

    const product = await commerce.products.retrieve(permalink, {
        type: 'permalink',
    });

    return {
        props: {
            product,
        },
    };
}

export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();

    return {
        paths: products.map((product) => ({
            params: {
                permalink: product.permalink,
            },
        })),
        fallback: false,
    };
}

export default function ProductPage({ product }) {
    const { setCart } = useCartDispatch();
    const toast = useToast();

    const addToCart = () => {
        commerce.cart.add(product.id).then(({cart}) => setCart(cart));
        toast({
            description: `${product.name} was added to your cart`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <>
            <Navbar textColor='black' />
            <Box display='flex' alignItems='center' m={5} w='100%' fontSize='sm'>
                <Breadcrumb fontWeight={300} separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem color='gray.500'>
                        <Link href='/products'>
                            <a>
                                Products
                            </a>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={`/products/${product.permalink}`}>
                            <a>
                                {product.name}
                            </a>
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>
            <Box display='flex' flexWrap='wrap' justifyContent='space-around' mx={10} mt={5}>
                <Box display='flex' alignItems='center' justifyContent='center' p={{base: 0, md: 5}} maxWidth={{ base: '100%', md: '50%'}}>
                    <Image width={500} height={500} src={product.media.source} alt='product image' />
                </Box>
                <Box display='flex' flexWrap='wrap' alignContent='flex-start' p={{base: 0, md: 5}} mb={5} maxWidth={{ base: '100%', md: '50%'}}>
                    <Box w='100%' display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center'>
                        <Text fontSize='4xl' fontWeight={600}>{product.name}</Text>
                        <Text fontSize='lg' fontWeight={400}>{product.price.formatted_with_symbol}</Text>
                    </Box>
                    <Divider />
                    <Box display='flex' flexWrap='wrap' mb={5} width='100%'>
                        <Text fontSize='sm' my={5} fontWeight={300} dangerouslySetInnerHTML={{ __html: product.description }} />
                        <Box display='flex' fontWeight={400} fontSize='sm' p={5} flexDirection='column' justifyContent='space-between' borderRadius='10px' border='1px' borderColor='blackAlpha.50'  boxShadow='md' width='100%' height='130px'>
                            <Box>
                                <Icon mr={2} w={7} h={7} as={MdCheckCircle} color='green.400' /> In stock
                            </Box>
                            <Box>
                                <Icon mr={2} w={7} h={7} as={MdLocalShipping} /> Available for shipping
                            </Box>
                            <Box>
                                <Icon mr={2} w={7} h={7} as={MdMood} color='purple.400' /> 125% Satisfaction Guarantee
                            </Box>
                        </Box>
                    </Box>
                    <Button isFullWidth onClick={addToCart}>Add to Cart</Button>
                </Box>
            </Box>
        </>
    )
}