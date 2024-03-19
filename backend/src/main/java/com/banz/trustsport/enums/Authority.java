package com.banz.trustsport.enums;

import lombok.Getter;

@Getter
public enum Authority {
    ADMIN("Admin"),
    USER("User"),
    JOURNALIST("Journalist"),
    MODERATOR("Moderator");

    private final String displayName;

    Authority(String displayName) {
        this.displayName = displayName;
    }

    public static Authority fromString(String roleString) {
        for (Authority role : Authority.values()) {
            if (role.displayName.equalsIgnoreCase(roleString.trim())) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + roleString);
    }
}


