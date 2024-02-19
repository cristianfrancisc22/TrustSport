package com.banz.trustsport.controller;

import com.banz.trustsport.entity.User;
import com.banz.trustsport.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/setFirstName")
    public ResponseEntity<User> setFirstName(@RequestParam String firstName, Authentication authentication) {
        try {
            String username = authentication.getName();
            User updatedUser = userService.setFirstName(username, firstName);
            log.info("User '{}' updated first name to '{}'", username, firstName);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error updating first name:", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/setLastName")
    public ResponseEntity<User> setLastName(@RequestParam String lastName, Authentication authentication) {
        try {
            String username = authentication.getName();
            User updatedUser = userService.setLastName(username, lastName);
            log.info("User '{}' updated last name to '{}'", username, lastName);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error updating last name:", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
