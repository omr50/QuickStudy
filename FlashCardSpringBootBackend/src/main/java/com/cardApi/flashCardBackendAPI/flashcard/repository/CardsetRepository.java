package com.cardApi.flashCardBackendAPI.flashcard.repository;

import com.cardApi.flashCardBackendAPI.flashcard.Cards;
import com.cardApi.flashCardBackendAPI.flashcard.Cardset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardsetRepository extends JpaRepository<Cardset, Long> {
    public List<Cardset> findByUsername(String username);
}
