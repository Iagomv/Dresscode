package com.dresscode.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TokenResponseDto {
    private int status;
    private boolean isValid;
    private String message;
}
