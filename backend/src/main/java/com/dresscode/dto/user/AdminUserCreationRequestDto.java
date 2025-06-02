package com.dresscode.dto.user;

import com.dresscode.enums.UserRoleEnum;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserCreationRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 40)
    private String name;

    private String lastName;

    @Digits(integer = 9, fraction = 0, message = "Phone number must be exactly 9 digits (no letters)")
    private Integer phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 128, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long")
    private String password;

    @NotNull(message = "Role is required")
    private UserRoleEnum role;

    private boolean active;
}
