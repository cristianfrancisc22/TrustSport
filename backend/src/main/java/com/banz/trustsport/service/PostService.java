package com.banz.trustsport.service;


import com.amazonaws.services.cloudfront.model.EntityNotFoundException;
import com.banz.trustsport.entity.Post;
import com.banz.trustsport.enums.Bucket;
import com.banz.trustsport.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
public class PostService {
    PostRepository postRepository;
    FileStore fileStore;

    @Autowired
    public PostService(PostRepository postRepository, FileStore fileStore) {
        this.fileStore = fileStore;
        this.postRepository = postRepository;
    }

    public Long createPost(Post post) {
        postRepository.save(post);
        return post.getId();
    }


    public void uploadThumbnail(Long newsID, MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        String path = String.format("%s", Bucket.IMAGES.getBucketName());
        String filename = String.format("%s-%s", UUID.randomUUID(), file.getOriginalFilename());

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            Post post = postRepository.getPostById(newsID);
            post.setThumbnailLink(filename);
            postRepository.save(post);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public byte[] downloadThumbnail(Long postID) {
        try {
            Post post = postRepository.getPostById(postID);
            if (post == null) {
                // Handle the case where post is null, for example, by throwing an exception or logging an error.
                post=postRepository.getPostById(3005L);
                String bucket = Bucket.IMAGES.getBucketName();
                return fileStore.download(bucket, post.getThumbnailLink());
            }
            String bucket = Bucket.IMAGES.getBucketName();
            return fileStore.download(bucket, post.getThumbnailLink());
        } catch (Exception e) {
            // Handle any other exceptions that might occur during the process.
            // Log the exception or perform appropriate error handling.
            e.printStackTrace(); // Example of printing the stack trace.
            return null; // Or throw a custom exception, return a default image, etc., depending on your application logic.
        }
    }


    public Post findById(Long postId) {
        return postRepository.getPostById(postId);
    }

    @Transactional
    public void incrementViewCount(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));
        post.incrementViewCount();
        postRepository.save(post);
    }

    public List<Post> getLatestNews() {
        return postRepository.findFirst5ByOrderByDateDesc();
    }

    public List<Post> getLatest6NewsForChampionship(String championship) {
        Pageable pageable = PageRequest.of(0, 6); // Pageable for fetching top 5 records
        return postRepository.findTop6ByChampionshipOrderByDateDesc(championship, pageable);
    }

    public List<Post> getLatestInternationalNews() {
        Pageable pageable = PageRequest.of(0,8);
        return postRepository.findTop8ByNationalNewsOrderByDateDesc(false,pageable);
    }

    public List<Post> getTeamNews(String team) {
        Pageable pageable = PageRequest.of(0,20);
        return postRepository.findTop20ByTeamOrderByDateDesc(team, pageable);
    }

    public Post getNewsById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public List<Post> getNewsByChampionship(String championship) {
        Pageable pageable = PageRequest.of(0,20);
        return postRepository.findFirst20ByChampionshipOrderByDateDesc(championship, pageable);
    }

    public List<Post> getMostPopularNews() {
        Pageable pageable = PageRequest.of(0,5);
        return postRepository.findFirst5ByOrderByViewCountDesc(pageable);
    }
}
