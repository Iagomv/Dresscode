package com.dresscode.dto.loan;

import com.dresscode.dto.user.LightUserResponseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class LoanWithLightUserResponseDto extends LoanResponseDto {
    private LightUserResponseDto user;

    private LightUserResponseDto acceptedBy;
}
