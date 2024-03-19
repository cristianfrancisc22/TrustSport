package com.banz.trustsport.auditing;

import com.banz.trustsport.entity.User;
import com.banz.trustsport.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class ApplicationAuditAware implements AuditorAware<String> {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationAuditAware.class);

    private final UserService userService;

    public ApplicationAuditAware(UserService userService) {
        this.userService = userService;
    }

    @Override
    public @NotNull Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            logger.warn("Current authentication is null, not authenticated, or is an anonymous token.");
            return Optional.empty();
        }

        String username = authentication.getName();
        try {
            User user = userService.getUserByUsername(username);
            if (user != null) {
                String fullName = user.getLastName() + " " + user.getFirstName();
                logger.info("Current auditor: {}", fullName);
                return Optional.of(fullName);
            } else {
                logger.warn("User with username '{}' not found.", username);
                return Optional.of("Unknown User");
            }
        } catch (Exception e) {
            logger.error("An error occurred while fetching user details for auditing.", e);
            return Optional.empty();
        }
    }
}
