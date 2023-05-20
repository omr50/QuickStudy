package com.cardApi.flashCardBackendAPI.todo.repository;

import com.cardApi.flashCardBackendAPI.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByUsername(String username);
    List<Todo> findByReminder(String reminder);
}
