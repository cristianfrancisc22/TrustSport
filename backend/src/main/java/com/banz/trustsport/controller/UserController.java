package com.banz.trustsport.controller;

import com.banz.trustsport.DTO.UserAuthorityRequest;
import com.banz.trustsport.entity.User;
import com.banz.trustsport.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/user")
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
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            log.error("Error updating first name:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/setLastName")
    public ResponseEntity<User> setLastName(@RequestParam String lastName, Authentication authentication) {
        try {
            String username = authentication.getName();
            User updatedUser = userService.setLastName(username, lastName);
            log.info("User '{}' updated last name to '{}'", username, lastName);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            log.error("Error updating last name:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/role/add")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Void> addRole(Authentication authentication,
                                        @RequestBody UserAuthorityRequest userAuthorityRequest) {
        try {
            String adminUsername = authentication.getName();
            userService.addAuthority(adminUsername, userAuthorityRequest);
            return ResponseEntity.ok().build();
        } catch (UsernameNotFoundException | EntityNotFoundException e) {
            log.error("User not found", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error occurred while adding user role", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/role/remove")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Void> removeRole(Authentication authentication,
                                           @RequestBody UserAuthorityRequest userAuthorityRequest) {
        try {
            String adminUsername = authentication.getName();
            userService.removeAuthority(adminUsername, userAuthorityRequest);
            return ResponseEntity.ok().build();
        } catch (UsernameNotFoundException | EntityNotFoundException e) {
            log.error("User not found", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error occurred while removing user role", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @PutMapping("/description/add/{userId}")
    public ResponseEntity<Void> addDescription(@PathVariable("userId") Long userId,
                                               @RequestBody String description) {
        try {
            userService.addDescription(userId, description);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            log.error("User not found", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error occurred while adding description for user with ID: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @PutMapping(path = "/profile/image/add/{userId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> uploadThumbnail(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            log.error("Error, file is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        userService.uploadProfileImage(userId, file);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PutMapping("/subscribe/{duration}")
    public ResponseEntity<Void> subscribe(@PathVariable("duration") int duration, Authentication authentication) {
        try {
            String username = authentication.getName();
            userService.subscribe(username, duration);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
