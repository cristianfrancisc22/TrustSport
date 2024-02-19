package com.banz.trustsport.DTO;

import com.banz.trustsport.entity.User;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterUserDTO {

    @NotEmpty(message = "The full name is required.")
    @NotNull
    @Size(min = 2, max = 20, message = "The length of the full name must be between 2 and 20 characters.")
    private String username;

    @NotEmpty(message = "The email address is required.")
    @Email(message = "The email address is invalid.", flags = {Pattern.Flag.CASE_INSENSITIVE})
    private String email;

    @NotEmpty(message = "The password is required.")
    private String password;

    // Custom deserialization constructor for Jackson
    @JsonCreator
    public RegisterUserDTO(@JsonProperty("username") String username,
                           @JsonProperty("email") String email,
                           @JsonProperty("password") String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User toUser() {
        return new User(username, email, password);
    }
}
