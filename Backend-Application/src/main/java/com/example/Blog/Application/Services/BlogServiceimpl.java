package com.example.Blog.Application.Services;

import com.example.Blog.Application.Dtos.BlogDto;

import com.example.Blog.Application.Repository.BlogRepository;
import com.example.Blog.Application.Repository.UserRepository;
import com.example.Blog.Application.model.Blog;
import com.example.Blog.Application.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogServiceimpl implements BlogService{
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Blog createBlog(BlogDto creatBlogDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));
        Blog blog1 = new Blog();
        blog1.setTitle(creatBlogDto.getTitle());
        blog1.setContent(creatBlogDto.getContent());
        blog1.setUser(user);
        return blogRepository.save(blog1);
    }

    @Override
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog Not Found with id: " + id));
    }

    @Override
    public Blog updateBlog(Long id, BlogDto blogDto) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog Not Found with id: "+ id));
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        return blogRepository.save(blog);
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog Not Found with id: "+ id));
        blogRepository.delete(blog);
    }

    @Override
    public Page<Blog> getAllBlogsByUserId(Long userId,int page,int pagesize) {
       User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));

        Pageable pageable = PageRequest.of(page,pagesize);
        Page<Blog> blogs = blogRepository.findByUserId(userId,pageable);

        return blogs;
    }

}
