package com.example.Blog.Application.Services;


import com.example.Blog.Application.Dtos.BlogDto;
import com.example.Blog.Application.model.Blog;
import com.example.Blog.Application.model.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BlogService {

    Blog createBlog(BlogDto creatBlogDto, Long id);
    Blog getBlogById(Long id);
    Blog updateBlog(Long id,BlogDto blogDto);
    void deleteBlog(Long id);
    Page<Blog> getAllBlogsByUserId(Long userIdint,int page,int pagesize);
}
