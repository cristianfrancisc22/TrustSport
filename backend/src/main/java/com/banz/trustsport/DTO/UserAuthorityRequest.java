package com.banz.trustsport.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class UserAuthorityRequest {

    private Long userId;
    private String authority;

    // toString method for debugging/logging
    @Override
    public String toString() {
        return "UserRoleRequest{" +
                "userId=" + userId +
                ", authority='" + authority + '\'' +
                '}';
    }

}

