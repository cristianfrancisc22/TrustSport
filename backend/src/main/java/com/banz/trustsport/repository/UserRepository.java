package com.banz.trustsport.repository;

import com.banz.trustsport.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findAppUserByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findAppUserById(Long id);

}
