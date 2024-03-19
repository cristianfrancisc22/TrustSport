package com.banz.trustsport.service;


import com.amazonaws.services.cloudfront.model.EntityNotFoundException;
import com.banz.trustsport.entity.Post;
import com.banz.trustsport.entity.User;
import com.banz.trustsport.enums.Bucket;
import com.banz.trustsport.enums.PostType;
import com.banz.trustsport.enums.SportType;
import com.banz.trustsport.exceptions.PostNotFoundException;
import com.banz.trustsport.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@Service
@Slf4j
public class PostService {
    PostRepository postRepository;
    FileStore fileStore;

    public PostService(PostRepository postRepository, FileStore fileStore) {
        this.fileStore = fileStore;
        this.postRepository = postRepository;
    }

    public void createPost(String title, String text, SportType sportType, String championship, String team,
                           PostType postType, MultipartFile image, User user) {
        // Create the post
        Post post = Post.builder()
                .title(title)
                .text(text)
                .sportType(sportType)
                .championship(championship)
                .team(team)
                .postType(postType)
                .user(user)
                .nationalPost(isNationalPost(championship)).build();

        // Handle file upload
        if (image != null && !image.isEmpty()) {
            // Upload thumbnail
            addThumbnail(post, image);
        } else {
            // If no image uploaded, set thumbnail link to null
            post.setThumbnail(null);
        }

    }

    private boolean isNationalPost(String championship) {
        // Check if the championship is national
        return championship.equals("LIGA 1") || championship.equals("LIGA 2");
    }

    public void addThumbnail(Post post, MultipartFile file) {
        String filename = fileStore.uploadImage(file);
        post.setThumbnail(filename);
        postRepository.save(post);
    }

    public byte[] downloadThumbnail(Long postId) throws Exception {
        Post post = postRepository.getPostById(postId);
        if (post == null) {
            throw new PostNotFoundException("Post with ID " + postId + " not found");
        }

        try {
            String bucket = Bucket.IMAGES.getBucketName();
            return fileStore.download(bucket, post.getThumbnail());
        } catch (Exception e) {
            log.error("Failed to download thumbnail for post with ID " + postId, e);
            throw new Exception("Failed to download thumbnail for post with ID" + postId, e);
        }
    }

    public Post findById(Long postId) {
        Post post = postRepository.getPostById(postId);
        Post constructedPost = Post.builder()
                .id(post.getId())
                .title(post.getTitle())
                .text(post.getText())
                .sportType(post.getSportType())
                .championship(post.getChampionship())
                .team(post.getTeam())
                .nationalPost(post.isNationalPost())
                .postType(post.getPostType())
                .thumbnail(post.getThumbnail())
                .views(post.getViews())
                .build();
        constructedPost.setCreatedDate(post.getCreatedDate());
        constructedPost.setCreatedBy(post.getCreatedBy());
        constructedPost.setLastModifiedBy(post.getLastModifiedBy());
        constructedPost.setLastModifiedDate(post.getLastModifiedDate());
        return constructedPost;
    }


    @Transactional
    public void incrementViewCount(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));
        post.setViews(post.getViews()+1);
        postRepository.save(post);
    }

    public List<Post> getLatestPosts() {
        Pageable pageable = PageRequest.of(0, 5);
        return postRepository.findTop5ByOrderByIdDesc(pageable);
    }

    public List<Post> getLatest6PostsForChampionship(String championship) {
        Pageable pageable = PageRequest.of(0, 6);
        return postRepository.findTop6ByChampionshipOrderByIdDesc(championship, pageable);
    }

    public List<Post> getLatestInternationalPosts() {
        Pageable pageable = PageRequest.of(0, 9);
        return postRepository.findTop9ByNationalPostsOrderByIdDesc(false, pageable);
    }

    public List<Post> getTeamPosts(String team) {
        Pageable pageable = PageRequest.of(0, 20);
        return postRepository.findTop20ByTeamOrderByIdDesc(team, pageable);
    }

    public List<Post> getPostsByChampionship(String championship) {
        Pageable pageable = PageRequest.of(0, 20);
        return postRepository.findFirst20ByChampionshipOrderByIdDesc(championship, pageable);
    }

    public List<Post> getMostViewedPosts() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Post> posts = postRepository.findFirst5ByOrderByViewsDesc(pageable);
        List<Post> constructedPosts = new ArrayList<>();
        for (Post post: posts) {
            constructedPosts.add(Post.builder().id(post.getId()).title(post.getTitle()).build());

        }
        System.out.println(constructedPosts.get(0).getId() + "POST ID GET MOST VIEWED");

        return constructedPosts;
    }

    public Post getPostById(Long id) {
        return postRepository.getPostById(id);
    }


    public List<Post> getLatestPostsByType(String postType) {
        Pageable pageable = PageRequest.of(0, 8);
        PostType postType1 = getPostType(postType);
        return postRepository.findLatestPostsByPostType(postType1, pageable);
    }

    public PostType getPostType(String postType) {
        return switch (postType) {
            case "news" -> PostType.NEWS;
            case "editorial" -> PostType.EDITORIAL;
            case "interview" -> PostType.INTERVIEW;
            default ->
                throw new IllegalArgumentException("Unexpected postType: " + postType);
        };
    }

}
