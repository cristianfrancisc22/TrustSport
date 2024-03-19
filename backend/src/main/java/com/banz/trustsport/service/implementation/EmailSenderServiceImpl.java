package com.banz.trustsport.service.implementation;

import com.banz.trustsport.service.EmailSenderService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    private final JavaMailSender javaMailSender;

    public EmailSenderServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendEmail(String to) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("cristian.francisc22@gmail.com");
        simpleMailMessage.setTo(to);
        System.out.println(to);
        simpleMailMessage.setSubject("TrustSport registration");
        simpleMailMessage.setText("Hello " + to + " !" + "\n" +  "You have successfully created your account.");
        javaMailSender.send(simpleMailMessage);
    }
}
