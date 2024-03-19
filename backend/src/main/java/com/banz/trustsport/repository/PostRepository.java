package com.banz.trustsport.repository;


import com.banz.trustsport.entity.Post;
import com.banz.trustsport.enums.PostType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {


//    @Query("SELECT new Post(p.id, p.title, p.text, p.sportType, p.championship, p.team, p.nationalPost, p.postType, p.thumbnail, p.views,p.createdBy, p.createdDate, p.lastModifiedBy, p.lastModifiedDate) FROM Post p WHERE p.id = :postId")
    Post getPostById(@Param("postId") Long postId);


    @Query("SELECT new Post(p.id, p.title, p.text, p.sportType, p.championship, p.team, p.thumbnail) FROM Post p ORDER BY p.id DESC")
    List<Post> findTop5ByOrderByIdDesc(Pageable pageable);


    @Query("SELECT new Post(p.id, p.title, p.text, p.sportType, p.championship, p.team, p.thumbnail) FROM Post p WHERE p.championship = :championship ORDER BY p.id DESC")
    List<Post> findTop6ByChampionshipOrderByIdDesc(@Param("championship") String championship, Pageable pageable);


    @Query("SELECT new Post(p.id, p.title, p.text, p.sportType, p.championship, p.team, p.thumbnail) FROM Post p WHERE p.nationalPost = :nationalPost ORDER BY p.id DESC")
    List<Post> findTop9ByNationalPostsOrderByIdDesc(@Param("nationalPost") boolean nationalPost, Pageable pageable);


    @Query("SELECT new Post(p.id, p.title, p.text, p.sportType, p.championship, p.team, p.thumbnail) FROM Post p WHERE p.team = :team ORDER BY p.id DESC")
    List<Post> findTop20ByTeamOrderByIdDesc(@Param("team") String team, Pageable pageable);


    @Query("SELECT new Post(p.id, p.title, p.text, p.sportType, p.championship, p.team, p.thumbnail) FROM Post p WHERE p.championship = :championship ORDER BY p.id DESC")
    List<Post> findFirst20ByChampionshipOrderByIdDesc(@Param("championship") String championship, Pageable pageable);


    List<Post> findFirst5ByOrderByViewsDesc(Pageable pageable);

    @Query("SELECT new Post(p.id, p.title, p.thumbnail, p.createdBy) FROM Post p WHERE p.postType = :postType ORDER BY p.id DESC")
    List<Post> findLatestPostsByPostType(@Param("postType") PostType postType, Pageable pageable);
}
