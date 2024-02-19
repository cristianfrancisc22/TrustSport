package com.banz.trustsport.repository;


import com.banz.trustsport.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Post getPostById(Long newsID);

    List<Post> findFirst5ByOrderByDateDesc();

    List<Post> findTop6ByChampionshipOrderByDateDesc(String championship, Pageable pageable);

    List<Post> findTop8ByNationalNewsOrderByDateDesc(boolean b, Pageable pageable);

    List<Post> findTop20ByTeamOrderByDateDesc(String team, Pageable pageable);

    List<Post> findFirst20ByChampionshipOrderByDateDesc(String championship, Pageable pageable);

    List<Post> findFirst5ByOrderByViewCountDesc(Pageable pageable);
}
