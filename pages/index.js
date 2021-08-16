import { Navbar } from '../components';
import { useRouter } from 'next/router'
import { Box, Text, SlideFade, useDisclosure, Button, VStack } from '@chakra-ui/react';

export default function Home() {
    const { isOpen } = useDisclosure();
    const router = useRouter();

    return (
        <Box 
            w='100%'
            minHeight='100vh'
            bgImage='/pelarboj_display.png'
            bgSize='cover'
            bgPos='center'
        >
            <Navbar textColor='white' />
            <Box
                minHeight='calc(100vh - 200px)'
                display='flex' 
                color='white'
                flexDirection='column'
                justifyContent='center' 
                alignItems='center'
                p={10}
            >
                <SlideFade in={!isOpen} offsetY='20px'>
                    <VStack spacing={10}>
                        <Text
                            fontSize={{ base: '64px', md: '72px'}}
                            textTransform='uppercase' 
                            fontWeight={700}
                            lineHeight='1'
                            textShadow='2px 3px 15px #0d0d0d'
                            textAlign={{ base: 'left', md: 'center'}}
                        >
                            huge summer sale
                        </Text>
                        <Text
                            fontSize={{ base: '16px', md: '18px' }}
                            textTransform='uppercase' 
                            textAlign={{ base: 'left', md: 'center'}}
                            lineHeight='normal'
                            letterSpacing='wide'
                            textShadow='2px 5px 10px #0d0d0d'
                            fontWeight={400}
                            pb={2}
                        >
                            Up to 50% off everything. Limited time only.
                        </Text>
                            <Button
                                p={5} 
                                width={{ base: '100%', md: '60%'}}
                                textShadow='0px 1px 10px #0d0d0d' 
                                fontSize='14px'
                                textTransform='uppercase'
                                bgColor='whiteAlpha.600'
                                _hover={{ bgColor: 'whiteAlpha.700' }}
                                onClick={() => router.push('/products')}
                            >
                                Explore Products
                            </Button>
                    </VStack>
                </SlideFade>
            </Box>
        </Box>
    );
};
