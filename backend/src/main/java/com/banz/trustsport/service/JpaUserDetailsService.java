package com.banz.trustsport.service;


import com.banz.trustsport.entity.User;
import com.banz.trustsport.model.SecurityUser;
import com.banz.trustsport.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public JpaUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User appUser = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("username not found!"));
        return new SecurityUser(appUser);
    }
}
