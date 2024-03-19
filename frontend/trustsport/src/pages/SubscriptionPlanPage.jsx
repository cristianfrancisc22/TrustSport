
import SubscriptionPlan from "../components/SubscriptionPlan";
import { Plans } from "../data/Plans";
import { Container, SimpleGrid, Heading } from "@chakra-ui/react";


export default function SubscriptionPlanPage() {
    return (
        <Container className=' justify-center h-full w-full p-10'>
            <div className='flex justify-center pb-5' >
                <Heading>
                    Abonamente
                </Heading>
            </div>

            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {Plans.map(  plan => (
                <SubscriptionPlan key={plan.id} plan={plan}/>
            )
            )}
            </SimpleGrid>           
        </Container>
    )
}