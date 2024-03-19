package com.banz.trustsport.controller;

import com.banz.trustsport.DTO.CreatePostDTO;
import com.banz.trustsport.entity.Post;

import com.banz.trustsport.entity.User;
import com.banz.trustsport.service.PostService;
import com.banz.trustsport.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/post")
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN','SCOPE_JOURNALIST','SCOPE_MODERATOR')")
    @PostMapping("/create")
    public ResponseEntity<Void> createPost(@RequestBody CreatePostDTO createPostDTO,
                                           Authentication authentication) {
        try {
            // Getting user
            User user = userService.getUserByUsername(authentication.getName());

            // Delegate creation of post to service layer
            postService.createPost(
                    createPostDTO.getTitle(),
                    createPostDTO.getText(),
                    createPostDTO.getSportType(),
                    createPostDTO.getChampionship(),
                    createPostDTO.getTeam(),
                    createPostDTO.getPostType(),
                    createPostDTO.getThumbnail(),
                    user);

            log.info("Post created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            log.error("Invalid post type", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            log.error("Error creating post", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN','SCOPE_JOURNALIST','SCOPE_MODERATOR')")
    @PutMapping(
            path = "/thumbnail/upload/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> uploadThumbnail(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            log.error("Error, file is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            Post post = postService.getPostById(id);
            postService.addThumbnail(post,file);
        } catch (Exception e) {
            log.info("Error uploading post" , e);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN','SCOPE_JOURNALIST','SCOPE_MODERATOR')")
    @PutMapping("/edit")
    public ResponseEntity<Void> editPost() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @GetMapping(value = "/thumbnail/download/{id}", produces = "image/webp")
    public byte[] downloadThumbnail(@PathVariable("id") Long id) throws Exception {
        return postService.downloadThumbnail(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postService.findById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        postService.incrementViewCount(id);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/latest/championship/{championship}")
    public List<Post> getLatestPostsForChampionship(@PathVariable("championship") String championship) {
        return postService.getLatest6PostsForChampionship(championship);
    }

    @GetMapping("/latest")
    public List<Post> getLatestPosts() {
        return postService.getLatestPosts();
    }

    @GetMapping("/international/latest")
    public List<Post> getLatestInternationalPosts() {
        return postService.getLatestInternationalPosts();
    }

    @GetMapping("/team/{team}")
    public List<Post> getTeamPosts(@PathVariable("team") String team) {
        log.info("getting news for team: " + team);
        return postService.getTeamPosts(team);
    }

    @GetMapping("/championship/{championship}")
    public List<Post> getPostsByChampionship(@PathVariable("championship") String championship) {
        return postService.getPostsByChampionship(championship.toUpperCase());
    }

    @GetMapping("/most-viewed")
    public List<Post> getMostViewedPosts() {
        return postService.getMostViewedPosts();
    }

    @GetMapping("/latest/postType/{postType}")
    public List<Post> getLatestPostsByType(@PathVariable("postType") String postType) {
        List<Post> posts = postService.getLatestPostsByType(postType);
        System.out.println(posts.get(0).getPostType() + " posttype");
        return posts;
    }
}
