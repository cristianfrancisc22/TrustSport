package com.banz.trustsport.DTO;

import com.banz.trustsport.enums.PostType;
import com.banz.trustsport.enums.SportType;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreatePostDTO {
    private String title;
    private String text;
    private SportType sportType;
    private String championship;
    private String team;
    private PostType postType;
    private MultipartFile thumbnail;

    @JsonCreator
    public CreatePostDTO(@JsonProperty("title") String title,
                         @JsonProperty("text") String text,
                         @JsonProperty("sportType") SportType sportType,
                         @JsonProperty("championship") String championship,
                         @JsonProperty("team") String team,
                         @JsonProperty("postType") PostType postType,
                         @JsonProperty("thumbnail") MultipartFile thumbnail) {
        this.title = title;
        this.text = text;
        this.sportType = sportType;
        this.championship = championship;
        this.team = team;
        this.postType = postType;
        this.thumbnail = thumbnail;
    }
}
