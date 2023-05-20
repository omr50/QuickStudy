package com.cardApi.flashCardBackendAPI.todo;

import com.cardApi.flashCardBackendAPI.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoJpaResource {

    @Autowired
    private TodoService todoService;
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/users/{username}/todos")
    public List<Todo> retrieveTodos(@PathVariable String username) {
        return todoRepository.findByUsername(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo retrieveTodo(@PathVariable String username, @PathVariable int id) {
        return todoRepository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id) {
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodo(@PathVariable String username, @PathVariable int id, @RequestBody Todo todo) {
        todoRepository.save(todo);
        return todo;
    }

    @PostMapping("/users/{username}/todos")
    public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
        todo.setUsername(username);
        todo.setId(null);
        return todoRepository.save(todo);
    }

    // since we only really need to update one field on the todo parameter, we don't need to access it from the
    // front end. We just take in the value of the reminder, add it to the current todo, and then save it.
    @PutMapping("/users/{username}/todos/{id}/reminder/{reminder}/{reminderEmail}")
    public Todo addReminder(@PathVariable String username, @PathVariable int id, @PathVariable String reminder, @PathVariable String reminderEmail) {
        Todo todo = todoRepository.findById(id).get();
        todo.setReminder(reminder);
        todo.setReminderEmail(reminderEmail);
        // if same id as an existing one, this just overrides the old
        // object with the new one in the database.
        todoRepository.save(todo);

        return todo;
    }

    // Delete the reminder. If the user no longer wants email reminders then delete the email reminder

    @DeleteMapping("/users/{username}/todos/{id}/reminder")
    public ResponseEntity<Void> deleteReminder(@PathVariable String username, @PathVariable int id) {
        Todo todo = todoRepository.findById(id).get();
        todo.setReminder(null);
        todo.setReminderEmail(null);
        todoRepository.save(todo);
        // if same id as an existing one, this just overrides the old
        // object with the new one in the database.
        return ResponseEntity.noContent().build();
    }
}
