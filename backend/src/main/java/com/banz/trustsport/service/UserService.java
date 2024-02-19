package com.banz.trustsport.service;

import com.banz.trustsport.DTO.RegisterUserDTO;
import com.banz.trustsport.entity.User;
import com.banz.trustsport.repository.UserRepository;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User create(RegisterUserDTO userRegistrationData) {
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



    public User findById(Long id) {
        return userRepository.findAppUserById(id);
    }

    public User getUserByUsername(String name) {
        return userRepository.findAppUserByUsername(name);
    }
}
