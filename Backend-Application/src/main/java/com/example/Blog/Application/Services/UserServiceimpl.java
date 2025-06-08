package com.example.Blog.Application.Services;

import com.example.Blog.Application.Dtos.LoginDto;
import com.example.Blog.Application.Dtos.UserDto;
import com.example.Blog.Application.Repository.UserRepository;
import com.example.Blog.Application.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceimpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User Login(LoginDto loginDto) {

        User user = userRepository.findByEmail(loginDto.getEmail()).orElse(null);
        if(user == null){
            throw new RuntimeException("user Not Found");
        }

        if(loginDto.getPassword() == null || !passwordEncoder.matches(loginDto.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        return user;
    }

    @Override
    public User registerUser(UserDto userDto) {
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new RuntimeException("Email is Already exists");
        }

        User user = new User();

        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userRepository.save(user);
    }
}
