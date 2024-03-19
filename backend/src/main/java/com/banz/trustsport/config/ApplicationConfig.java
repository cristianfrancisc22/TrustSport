package com.banz.trustsport.config;

import com.banz.trustsport.auditing.ApplicationAuditAware;
import com.banz.trustsport.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;


@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    UserService userService;

    public ApplicationConfig (UserService userService) {
        this.userService = userService;
    }

    @Bean
    public AuditorAware<String> auditorAware() {
        return new ApplicationAuditAware(userService);
    }


}
