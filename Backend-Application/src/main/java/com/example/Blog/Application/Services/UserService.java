package com.example.Blog.Application.Services;

import com.example.Blog.Application.Dtos.LoginDto;
import com.example.Blog.Application.Dtos.UserDto;
import com.example.Blog.Application.model.User;

public interface UserService {
    User Login(LoginDto loginDto);
    User registerUser(UserDto userDto);
}
