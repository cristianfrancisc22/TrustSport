import { Card, Heading, Button, CardHeader, Text, CardBody, CardFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionPlan(props) {
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Navigate to the checkout page with parameters
        navigate(`/checkout/${props.plan.price}/${props.plan.duration}/${props.plan.priceId}`);
    };
    

    return (
        <Card bg="orange">
            <CardHeader>
                <Heading size='md'>Abonament {props.plan.duration} {props.plan.duration === 1 ? "luna" : "luni"}</Heading>
            </CardHeader>
            <CardBody>
                <Heading>{props.plan.price} RON</Heading>
                <Text>{props.plan.description}</Text>
            </CardBody>
            <CardFooter>
                <Button onClick={handleCheckout}>Cumpără</Button>
            </CardFooter>
        </Card>
    )
}
