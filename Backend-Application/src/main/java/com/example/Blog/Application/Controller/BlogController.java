package com.example.Blog.Application.Controller;

import com.example.Blog.Application.Dtos.BlogDto;
import com.example.Blog.Application.Services.BlogService;
import com.example.Blog.Application.Services.UserService;
import com.example.Blog.Application.model.Blog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@CrossOrigin(origins = "http://localhost:8080")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @Autowired
    private UserService userService;

    @PostMapping("/create-blog/{id}")
    public ResponseEntity<Blog> createBlog(@RequestBody BlogDto creatBlogDto, @PathVariable("id") Long userId) {
        Blog blog1 = blogService.createBlog(creatBlogDto,userId);
        return new ResponseEntity<>(blog1, HttpStatus.CREATED);
    }

    @GetMapping("/single-blog/{id}")
    public ResponseEntity<Blog> getSingleBlog(@PathVariable("id") Long id){
        Blog blog = blogService.getBlogById(id);
        return ResponseEntity.ok(blog);
    }

    @GetMapping("all-blog/{userId}")
    public ResponseEntity<Page<Blog>> getAllBlogsByUserId(@PathVariable("userId") Long userId, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "pageSize", defaultValue = "5") int size){
        Page<Blog> blogs = blogService.getAllBlogsByUserId(userId,page,size);
        return ResponseEntity.ok(blogs);
    }

    @PutMapping("/update-blog/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable("id") Long id, @RequestBody BlogDto blogDto){
        Blog update = blogService.updateBlog(id,blogDto);
        return ResponseEntity.ok(update);
    }

    @DeleteMapping("/delete-blog/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable("id") Long id){
        blogService.deleteBlog(id);
        return ResponseEntity.ok("Blog Deleted sucessfully");
    }

}
