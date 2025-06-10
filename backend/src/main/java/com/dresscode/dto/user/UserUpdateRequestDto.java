package com.dresscode.dto.user;

import com.dresscode.enums.UserRoleEnum;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO for user update request.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDto {

    /**
     * The user name.
     */
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 40, message = "Name must be between 3 and 40 characters")
    private String name;

    /**
     * The user last name.
     */
    private String lastName;

    /**
     * The user phone number.
     */
    @Pattern(regexp = "^\\d{9}$", message = "Phone number must be exactly 9 digits")
    private String phoneNumber;

    /**
     * The user email.
     */
    @NotBlank
    @Email
    private String email;

    /**
     * The user role.
     */
    @NotNull
    private UserRoleEnum role;

    /**
     * The user state.
     */
    @NotNull
    private boolean active;
}
