package com.cardApi.flashCardBackendAPI.flashcard;

import com.cardApi.flashCardBackendAPI.flashcard.repository.CardsRepository;
import com.cardApi.flashCardBackendAPI.flashcard.repository.CardsetRepository;
import com.cardApi.flashCardBackendAPI.todo.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CardResource {
    @Autowired
    CardsetRepository cardsetRepository;

    @Autowired
    CardsRepository cardsRepository;

    // CRUD FOR CARD SETS --------------------------------------------------------------------------------------

    // get all cardsets
    @GetMapping("/users/{username}/flashcards")
    public List<Cardset> retrieveFlashcards(@PathVariable String username) {
        // important make sure you have getters/ setters / constructor
        // otherwise you get back a blank JSON response.
        return cardsetRepository.findByUsername(username);
    }

    // get cardset by id
    // -----------------
    // used for editing the card set. Retrieve the entire card set
    // to fill out the form for editing.
    @GetMapping("/users/{username}/flashcards/{id}")
    public Cardset retrieveFlashcardSet(@PathVariable String username, @PathVariable Long id) {
        // important make sure you have getters/ setters / constructor
        // otherwise you get back a blank JSON response.
        return cardsetRepository.findById(id).get();
    }


    // post a new card set
    @PostMapping("/users/{username}/flashcards")
    public Cardset createFlashcard(@PathVariable String username, @RequestBody Cardset cardset) {
        System.out.println("Added new cardset " + cardset);
        Cardset savedCardset = cardsetRepository.save(cardset);
        return savedCardset;
    }

    // delete card set
    @DeleteMapping("/users/{username}/flashcards/{id}")
    public ResponseEntity<Void> deleteCardset(@PathVariable String username, @PathVariable Long id) {
        cardsetRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // update card set
    @PutMapping("/users/{username}/flashcards/{id}")
    public Cardset updateCardset(@PathVariable String username, @PathVariable Long id, @RequestBody Cardset cardset) {
        cardsetRepository.save(cardset);
        return cardset;
    }

    // CRUD FOR INDIVIDUAL CARDS ---------------------------------------------------------------------------------------

    // get all cards in specific cardset.
    @GetMapping("/users/{username}/flashcards/{id}/cards")
    public List<Cards> retrieveFlashcards(@PathVariable String username, @PathVariable long id) {
        return cardsRepository.findByCardsetId(id);
    }

    // get one card by id
    @GetMapping("/users/{username}/cards/{id}")
    public Cards retrieveCard(@PathVariable String username, @PathVariable long id) {
        return cardsRepository.findById(id).get();
    }

    // Delete a card by id
    @DeleteMapping("/users/{username}/cards/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable String username, @PathVariable Long id) {
        cardsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Post a new card by id
    // not necessary to use path variable
    // for set id, front end should send the json
    // with the set id as one of the fields
    @PostMapping("/users/{username}/cards")
    public Cards createCard(@PathVariable String username, @RequestBody Cards card) {
        System.out.println("Added new card " + card);
        Cards savedCard = cardsRepository.save(card);
        return savedCard;
    }

    // Update a card by id
    @PutMapping("/users/{username}/cards/{id}")
    public Cards updateCard(@PathVariable String username, @PathVariable Long id, @RequestBody Cards card) {
        System.out.println(card);
        cardsRepository.save(card);
        return card;
    }
}
