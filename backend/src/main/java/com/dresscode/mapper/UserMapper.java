package com.dresscode.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.dresscode.dto.auth.RegisterRequestDto;
import com.dresscode.dto.auth.RegisterResponseDto;
import com.dresscode.dto.user.AdminUserCreationRequestDto;
import com.dresscode.dto.user.UserUpdateRequestDto;
import com.dresscode.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "active", constant = "true")
    @Mapping(target = "clases", ignore = true)
    @Mapping(target = "loans", ignore = true)
    User toUser(RegisterRequestDto dto);

    RegisterResponseDto toRegisterResponseDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "clases", ignore = true)
    @Mapping(target = "loans", ignore = true)
    User toUser(AdminUserCreationRequestDto dto);

    @Mapping(target = "clases", ignore = true)
    @Mapping(target = "loans", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateUserFromDto(UserUpdateRequestDto dto, @MappingTarget User user);
}
