package com.dresscode.dto.user;

import com.dresscode.enums.UserRoleEnum;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO for admin user creation request.
 *
 * @author Victor Ayala
 */
@Getter
@Setter
public class AdminUserCreationRequestDto {

    /**
     * The user's name.
     */
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 40)
    private String name;

    /**
     * The user's last name.
     */
    private String lastName;

    /**
     * The user's phone number.
     */
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{9}$", message = "Phone number must be exactly 9 digits")
    private String phoneNumber;

    /**
     * The user's email.
     */
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    /**
     * The user's password.
     */
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 128, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long")
    private String password;

    /**
     * The user's role.
     */
    @NotNull(message = "Role is required")
    private UserRoleEnum role;

    /**
     * If the user is active or not.
     */
    private boolean active;
}
