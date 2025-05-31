package com.dresscode.dto.auth;

import com.dresscode.enums.UserRoleEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponseDto {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private UserRoleEnum role;
    private boolean active;
}
