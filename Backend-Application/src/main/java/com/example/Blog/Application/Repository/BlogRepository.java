package com.example.Blog.Application.Repository;

import com.example.Blog.Application.model.Blog;
import com.example.Blog.Application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    Page<Blog> findByUserId(Long user, Pageable pageable);


}
