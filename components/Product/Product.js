import { Box } from '@chakra-ui/react';

export default function Product({ name, price }) {

    return (
        <Box>
            {name} : {price.formatted_with_symbol}
        </Box>
    );
};