package com.banz.trustsport.repository;

import com.banz.trustsport.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Modifying
    @Query("UPDATE User u SET u.description = :description WHERE u.id = :userId")
    void updateDescription(@Param("userId") Long userId, @Param("description") String description);
}
