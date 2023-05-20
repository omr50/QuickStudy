package com.cardApi.flashCardBackendAPI.flashcard.repository;

import com.cardApi.flashCardBackendAPI.flashcard.Cards;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardsRepository extends JpaRepository<Cards, Long> {
    public List<Cards> findByCardsetId(Long id);
}
