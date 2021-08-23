import { Box, Input, Flex, Select, Button } from '@chakra-ui/react';
import commerce from '../../lib/commerce';

export default function ShippingForm({ checkoutToken }) {

    return (
        <Box>
            <Flex>
                <Input m={1} placeholder='First name' />
                <Input m={1} placeholder='Last name' />
            </Flex>
            <Flex>
                <Input m={1} placeholder='Email address' />
            </Flex>
            <Flex>
                <Select m={1} placeholder='Country' />
            </Flex>
            <Flex>
                <Input m={1} placeholder='Address line 1' />
                <Input m={1} placeholder='Address line 2' />
            </Flex>
            <Flex mb={5}>
                <Select width='50%' m={1} placeholder='State/Province' />
                <Input width='50%' m={1} placeholder='Postal code' />
            </Flex>
            <Button isFullWidth>Confirm shipping information</Button>
        </Box>
    )
}