package com.example.Blog.Application.Controller;

import com.example.Blog.Application.Dtos.LoginDto;
import com.example.Blog.Application.Dtos.UserDto;
import com.example.Blog.Application.Services.UserService;
import com.example.Blog.Application.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin(origins = "http://localhost:8080")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerForm(@RequestBody UserDto userDto) {
        User user = userService.registerUser(userDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> Login(@RequestBody LoginDto loginDto){
        User user = userService.Login(loginDto);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }


}

