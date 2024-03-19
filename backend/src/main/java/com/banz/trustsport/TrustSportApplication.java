package com.banz.trustsport;

import com.banz.trustsport.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class TrustSportApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrustSportApplication.class, args);
	}


}
