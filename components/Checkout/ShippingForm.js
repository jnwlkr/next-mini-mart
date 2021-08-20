import { Box, Input, Flex } from '@chakra-ui/react';

export default function ShippingForm() {

    return (
        <Box>
            <Flex>
                <Input m={1} placeholder='First name' />
                <Input m={1} placeholder='Last name' />
            </Flex>

        </Box>
    )
}