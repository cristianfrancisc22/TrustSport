import { useEffect, useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Import useParams

export default function Checkout() {
    const { price, productTitle } = useParams(); // Get params using useParams instead of router.query
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Check if price and productTitle are provided
        if (price && productTitle) {
            // If provided, set loaded to true
            setLoaded(true);
            // You can use the price and productTitle here to load the appropriate content
        }
    }, [price, productTitle]);

    if (!loaded) {
        // If price and productTitle are not provided, you can display an error message or redirect
        return (
                <div>
                    Error: Missing parameters
                    <div>Error: Missing parameters</div>
                    <div>Error: Missing parameters</div>
                    <div>Error: Missing parameters</div>
                    <div>Error: Missing parameters</div>
                    <div>Error: Missing parameters</div>
                </div>
            )
    }

    // If price and productTitle are provided, render the checkout page
    return (
        <div>
            <Heading as="h1" size="xl" mb={4}>Checkout</Heading>
            <Text fontSize="lg" mb={2}>Price: {price}</Text>
            <Text fontSize="lg">Product Title: {productTitle}</Text>
            {/* Render the checkout form or other content here */}
        </div>

    );
}

