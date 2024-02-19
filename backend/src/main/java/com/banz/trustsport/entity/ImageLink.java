package com.banz.trustsport.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ImageLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Image link cannot be blank")
    @NotNull(message = "Image link cannot be null")
    private String imageLink;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}

