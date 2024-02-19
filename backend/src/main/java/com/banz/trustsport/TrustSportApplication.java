package com.banz.trustsport;

import com.banz.trustsport.config.RsaKeyProperties;
import com.banz.trustsport.entity.User;
import com.banz.trustsport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class TrustSportApplication {
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder encoder;

	public static void main(String[] args) {
		SpringApplication.run(TrustSportApplication.class, args);
	}


//	@Bean
//	CommandLineRunner commandLineRunner(){
//		return args -> {
//			userRepository.save(new User("cristi","cristian.francisc22@gmail.com",encoder.encode("parolacodata")));
//		};
//	}
}
