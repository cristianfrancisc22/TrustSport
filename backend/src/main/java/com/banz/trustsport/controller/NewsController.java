package com.banz.trustsport.controller;

import com.banz.trustsport.entity.Post;

import com.banz.trustsport.entity.User;
import com.banz.trustsport.enums.PostType;
import com.banz.trustsport.service.PostService;
import com.banz.trustsport.service.UserService;
import jakarta.validation.Path;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1") // Add versioning
public class NewsController {

    private static final Logger log = LoggerFactory.getLogger(NewsController.class);

    private final PostService postService;
    private final UserService userService;

    @Autowired
    public NewsController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping("/createNews")
    public ResponseEntity<Void> createNews(@RequestParam("title") String title,
                                           @RequestParam("text") String text,
                                           @RequestParam("sport") String sport,
                                           @RequestParam("championship") String championship,
                                           @RequestParam("team") String team,
                                           @RequestParam("player") String player,
                                           @RequestParam("postType") PostType postType,
                                           @RequestParam(value = "image", required = false) MultipartFile image,
                                           Authentication authentication) {
        try {
            // Getting user
            User user = userService.getUserByUsername(authentication.getName());

            // Create the post
            Post post = new Post();
            post.setTitle(title);
            post.setText(text);
            post.setSport(sport);
            post.setChampionship(championship);
            post.setTeam(team);
            post.setPlayer(player);
            post.setPostType(postType);
            post.setUser(user);
            postService.createPost(post);

            // Handle file upload
            if (image != null && !image.isEmpty()) {
                // Upload thumbnail
                ResponseEntity<Void> uploadResponse = uploadThumbnail(post.getId(), image);
                if (uploadResponse.getStatusCode() != HttpStatus.ACCEPTED) {
                    return uploadResponse; // Return upload error response
                }
            } else {
                // If no image uploaded, set thumbnail link to null or any default value
                post.setThumbnailLink(null); // Or set to any default thumbnail link
            }


            log.info("News created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            log.error("Invalid post type", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            log.error("Error creating post", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping(
            path = "/uploadThumbnail/{newsID}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> uploadThumbnail(@PathVariable Long newsID, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            log.error("Error, file is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        postService.uploadThumbnail(newsID,file);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PutMapping("/editPost")
    public ResponseEntity<Void> editPost() {
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @GetMapping("/downloadThumbnail/{newsID}")
    public byte[] downloadThumbnail(@PathVariable("newsID") Long newsID) {
        return postService.downloadThumbnail(newsID);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable Long postId) {
        Post post = postService.findById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        // Increment view count
        postService.incrementViewCount(postId);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/getLatestNews/{championship}")
    public List<Post> getLatestNewsForChampionship(@PathVariable("championship") String championship) {
        return postService.getLatest6NewsForChampionship(championship);
    }

    @GetMapping("/getLatestNews")
    public List<Post> getLatestNews() {
        return postService.getLatestNews();
    }

    @GetMapping("/getLatestInternationalNews")
    public List<Post> getLatestInternationalNews() {
        return postService.getLatestInternationalNews();
    }

    @GetMapping("/getTeamNews/{team}")
    public List<Post> getTeamNews(@PathVariable("team") String team) {
        log.info("getting news for team: " + team);
        return postService.getTeamNews(team);
    }

    @GetMapping("/getNewsById/{id}")
    public Post getNewsByID(@PathVariable("id") String id) {
        try {
            Long newsID = Long.parseLong(id); // Parse the id into Long
            return postService.getNewsById(newsID); // Call the service method with the parsed ID
        } catch (NumberFormatException e) {
            // Handle the case where id is not a valid Long
            // For example, you might return a custom error response or log the error
            return null; // or throw an exception
        }
    }

    @GetMapping("/getNewsByChampionship/{championship}")
    public List<Post> getNewsByChampionship(@PathVariable("championship") String championship) {
        return postService.getNewsByChampionship(championship.toUpperCase());
    }

    @GetMapping("/getMostPopularNews")
    public List<Post> getMostPopularNews() {
        return postService.getMostPopularNews();
    }

}
