package com.banz.trustsport.service;

import com.amazonaws.services.cognitoidp.model.UserNotFoundException;
import com.banz.trustsport.DTO.RegisterUserDTO;
import com.banz.trustsport.DTO.UserAuthorityRequest;
import com.banz.trustsport.entity.User;
import com.banz.trustsport.enums.Authority;
import com.banz.trustsport.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;



@Service
@Transactional
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;
    private final FileStore fileStore;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailSenderService emailSenderService, FileStore fileStore) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
        this.fileStore = fileStore;
    }

    public User create(@NotNull RegisterUserDTO userRegistrationData) {
        String email = userRegistrationData.getEmail();
        String username = userRegistrationData.getUsername();

        // Check if the email address is already taken
        if (existsByEmail(email)) {
            throw new DuplicateKeyException("Email address '" + email + "' is already taken");
        }

        // Check if the username is already taken
        if (existsByUsername(username)) {
            throw new DuplicateKeyException("Username '" + username + "' is already taken");
        }

        // If email and username are unique, proceed with user creation
        User user = userRegistrationData.toUser();
        user.encodePassword(passwordEncoder, userRegistrationData.getPassword());
        userRepository.save(user);
        return user;
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User setFirstName(String username, String firstName) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found!"));

        user.setFirstName(firstName);
        userRepository.save(user);

        return user;
    }

    public User setLastName(String username, String lastName) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found!"));

        user.setLastName(lastName);
        userRepository.save(user);

        return user;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public void addAuthority(String username, UserAuthorityRequest userAuthorityRequest) {
        try {
            User adminUser = getUserByUsername(username);
            Long userId = userAuthorityRequest.getUserId();
            Authority role = Authority.fromString(userAuthorityRequest.getAuthority());
            User user = getUserById(userId);
            user.addAuthority(role);
            saveUserWithLog(user, role, adminUser.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while adding user role", e);
        }
    }

    public void removeAuthority(String username, UserAuthorityRequest userAuthorityRequest) {
        try {
            User adminUser = getUserByUsername(username);
            Long userId = userAuthorityRequest.getUserId();
            Authority role = Authority.fromString(userAuthorityRequest.getAuthority());
            User user = getUserById(userId);
            user.removeAuthority(role);
            saveUserWithLog(user, role, adminUser.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while removing user role", e);
        }
    }

    private void saveUserWithLog(User user, Authority role, String adminUsername) {
        try {
            userRepository.save(user);
            log.info("Authority {} modified by {} for user with ID {}", role, adminUsername, user.getId());
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while saving user", e);
        }
    }

    public void addDescription(Long userId, String description) {
        // Proceed with modifying the description
        userRepository.updateDescription(userId, description); // Update description directly in the database
    }


    public void uploadProfileImage(Long userId, MultipartFile file) {
        String filename = fileStore.uploadImage(file);
        updateUserWithImageLink(userId, filename);
    }

    private void updateUserWithImageLink(Long userId, String imageUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        user.setProfileImage(imageUrl);
        userRepository.save(user);
    }

    public void sendEmail(User createdUser) {
        emailSenderService.sendEmail(createdUser.getEmail());
    }


}
