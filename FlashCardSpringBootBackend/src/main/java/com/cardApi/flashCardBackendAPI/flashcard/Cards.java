package com.cardApi.flashCardBackendAPI.flashcard;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Cards {
    @Id
    @GeneratedValue
    private Long id;

    private String word;

    private String definition;

    // this will be used to retrieve
    // all cards for a specific card set
    private Long cardsetId;

    public Cards(Long id, String word, String definition, Long cardsetId) {
        this.id = id;
        this.word = word;
        this.definition = definition;
        this.cardsetId = cardsetId;
    }
    public Cards(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public Long getCardsetId() {
        return cardsetId;
    }

    public void setCardsetId(Long cardsetId) {
        this.cardsetId = cardsetId;
    }

    @Override
    public String toString() {
        return "Cards{" +
                "id=" + id +
                ", word='" + word + '\'' +
                ", definition='" + definition + '\'' +
                ", cardsetId=" + cardsetId +
                '}';
    }
}
