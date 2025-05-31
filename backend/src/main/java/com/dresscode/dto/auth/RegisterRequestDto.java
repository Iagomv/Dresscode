package com.dresscode.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {

    @NotBlank
    @Size(min = 3, max = 20)
    private String name;

    private String lastName;
    private Integer phoneNumber;

    @NotBlank
    @Email
    private String email;

    @Size(min = 8, max = 128, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long")
    private String password;
}
