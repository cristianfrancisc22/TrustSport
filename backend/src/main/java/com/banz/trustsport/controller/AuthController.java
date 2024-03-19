package com.banz.trustsport.controller;

import com.banz.trustsport.DTO.RegisterUserDTO;
import com.banz.trustsport.entity.User;
import com.banz.trustsport.service.TokenService;
import com.banz.trustsport.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final TokenService tokenService;
    private final UserService userService;


    public AuthController(TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDTO userRegistrationData) {
        try {
            // If email and username are unique, proceed with user creation
            User createdUser = userService.create(userRegistrationData);
            userService.sendEmail(createdUser);
            log.info("User '{}' created", createdUser.getUsername());
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (DuplicateKeyException e) {
            log.error("Error creating user - DuplicateKeyException: {}", e.getMessage());
            return new ResponseEntity<>("Email or username already exists", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage());
            return new ResponseEntity<>("An error occurred while creating the user", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    @PostMapping("/token")
    public ResponseEntity<String> token(Authentication authentication) {
        try {
            log.info("Token requested for user: '{}'", authentication.getName());
            String token = tokenService.generateToken(authentication);
            log.info("Token generated for user '{}'", authentication.getName());
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error generating token: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
