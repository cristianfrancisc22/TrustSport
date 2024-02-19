package com.banz.trustsport.entity;


import com.banz.trustsport.enums.PostType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;


import java.awt.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @CreationTimestamp
    private ZonedDateTime date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @NotNull
    private String title;

    @Column(columnDefinition = "TEXT")
    private String text;

    @NotNull
    @Column(length = 50)
    private String sport;

    //FRONTEND -> TRANSFERMARKT API -> BACKEND
    private String championship;

    private String team;

    private String player;

    @Column(name = "national_news")
    private boolean nationalNews;

    @Enumerated(EnumType.STRING)
    private PostType postType;

    private String thumbnailLink;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImageLink> images = new ArrayList<>();

    @Column(name = "view_count")
    private int viewCount = 0;

    public void incrementViewCount() {
        this.viewCount++;
    }


    // Additional properties or methods common to all posts
}
