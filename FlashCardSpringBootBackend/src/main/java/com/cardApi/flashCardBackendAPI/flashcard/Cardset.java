package com.cardApi.flashCardBackendAPI.flashcard;

import com.cardApi.flashCardBackendAPI.flashcard.repository.CardsetRepository;
import com.cardApi.flashCardBackendAPI.user.User;
import jakarta.persistence.*;

import java.util.List;
@Entity
public class Cardset {
    @Id
    @GeneratedValue
    private Long id;

    private String setName;

    private String setDescription;

    private String username;

    public Cardset(String setName, String setDescription, String username) {
        this.setName = setName;
        this.setDescription = setDescription;
        this.username = username;
    }
    public Cardset() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSetName() {
        return setName;
    }

    public void setSetName(String setName) {
        this.setName = setName;
    }

    public String getSetDescription() {
        return setDescription;
    }

    public void setSetDescription(String setDescription) {
        this.setDescription = setDescription;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "Cardset{" +
                "id=" + id +
                ", setName='" + setName + '\'' +
                ", setDescription='" + setDescription + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
