package com.banz.trustsport.entity;

import com.banz.trustsport.enums.PostType;
import com.banz.trustsport.enums.SportType;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    private String title;
    private String text;
    @Enumerated(EnumType.STRING)
    private SportType sportType;
    private String championship;
    private String team;
    private boolean nationalPost;
    @Enumerated(EnumType.STRING)
    private PostType postType;
    private String thumbnail;
    private Long views = 0L;


    public Post(Long id, String title, String text, SportType sportType, String championship, String team, String thumbnail) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.sportType = sportType;
        this.championship = championship;
        this.team = team;
        this.thumbnail = thumbnail;
    }

    public Post(Long id, String title, String thumbnail, String createdBy) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        setCreatedBy(createdBy);
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final Post post = new Post();

        public Builder id(Long id) {
            post.id = id;
            return this;
        }

        public Builder user(User user) {
            post.user = user;
            return this;
        }

        public Builder title(String title) {
            post.title = title;
            return this;
        }

        public Builder text(String text) {
            post.text = text;
            return this;
        }

        public Builder sportType(SportType sportType) {
            post.sportType = sportType;
            return this;
        }

        public Builder championship(String championship) {
            post.championship = championship;
            return this;
        }

        public Builder team(String team) {
            post.team = team;
            return this;
        }

        public Builder nationalPost(boolean nationalPost) {
            post.nationalPost = nationalPost;
            return this;
        }

        public Builder postType(PostType postType) {
            post.postType = postType;
            return this;
        }

        public Builder thumbnail(String thumbnail) {
            post.thumbnail = thumbnail;
            return this;
        }

        public Builder views(Long views) {
            post.views = views;
            return this;
        }

        public Post build() {
            // Add validation logic here if needed
            return post;
        }

    }
}
