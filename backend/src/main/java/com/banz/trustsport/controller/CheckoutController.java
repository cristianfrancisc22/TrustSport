package com.banz.trustsport.controller;


import com.banz.trustsport.DTO.RequestDTO;
import com.banz.trustsport.model.CustomerUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/payment")
public class CheckoutController {

    private String STRIPE_API_KEY = System.getenv("STRIPE_KEY");
    private String DOMAIN = "http://localhost:3000";


    @PostMapping("/checkout/hosted")
    String hostedCheckout(@RequestBody RequestDTO requestDTO) throws StripeException {
        System.out.println(requestDTO.getPriceId() + " PRICE ID");
        Stripe.apiKey = STRIPE_API_KEY;

        Customer customer = CustomerUtil.findOrCreateCustomer(requestDTO.getEmail(), requestDTO.getName());

        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setCustomer(customer.getId())
                        .setSuccessUrl(DOMAIN + "/success/session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl(DOMAIN + "/failure")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPrice(requestDTO.getPriceId())
                                        .build()
                        );
        Session session = Session.create(paramsBuilder.build());
        return session.getUrl();
    }
}
