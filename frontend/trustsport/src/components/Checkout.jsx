import { useState } from "react";
import { Button, Heading, Container,Card, CardBody, Text, Input, VStack, Box } from "@chakra-ui/react";
import { useParams } from 'react-router-dom'; // Import useParams

export default function Checkout() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const {price, duration, priceId} = useParams();

    const onEmailChange = (ev) => {
        setEmail(ev.target.value);
    };
    const onNameChange = (ev) => {
        setName(ev.target.value);
    };

    const initiatePayment = () => {
        // Implement your logic for subscribing to the newsletter
        // For example, you can make an API request to your backend to handle the subscription
        // Replace the fetch URL with your actual endpoint
        fetch("http://localhost:8080/api/v1/payment/checkout/hosted", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                duration: duration,
                priceId: priceId
            })
        })
        .then(r => r.text())
            .then(r => {
                window.location.href = r
            })
    };

    return (
        <Container height={'2xl'} p={10} mt={10}>
            <VStack spacing={3} width={'xl'} >
            <Heading textAlign={'center'}>Checkout</Heading>
                <Box w={'full'} textAlign={'center'}>
                    <Card bg="gray.100">
                        <CardBody>
                            <Text>Abonament {duration} {duration === "1" ? "luna" : "luni"}</Text>
                            <Heading>{price} RON</Heading>
                        </CardBody>
                    </Card>
                </Box>
                <Input variant='filled' placeholder='Your Name (Ex. Cristi, George, Alex)' onChange={onNameChange} value={name} />
                <Input variant='filled' placeholder='Your Email' onChange={onEmailChange} value={email} />
                <Button onClick={initiatePayment} colorScheme={'green'}>Abonare</Button>
            </VStack>
        </Container>
    );
}
