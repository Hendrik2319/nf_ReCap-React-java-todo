package de.neuefische.backend.todo;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
class TodoRepository {

    private final Map<String, Todo> todos = new HashMap<>(
            Map.of(
                    "1", new Todo("1", "Test 1", TodoStatus.OPEN),
                    "2", new Todo("2", "Test 2", TodoStatus.IN_PROGRESS),
                    "3", new Todo("3", "Test 3", TodoStatus.DONE),
                    "4", new Todo("4", "Test 4", TodoStatus.OPEN),
                    "5", new Todo("5", "Test 5", TodoStatus.IN_PROGRESS),
                    "6", new Todo("6", "Test 6", TodoStatus.OPEN),
                    "7", new Todo("7", "Test 7", TodoStatus.OPEN)
            )
    );

    public List<Todo> getAll() {
        return new ArrayList<>(todos.values());
    }

    public Todo save(Todo todoToSave) {
        todos.put(todoToSave.id(), todoToSave);
        return todoToSave;
    }

    public Todo getById(String id) {
        return todos.get(id);
    }

    public Todo update(Todo todo) {
        todos.put(todo.id(), todo);
        return todo;
    }

    public void delete(String id) {
        todos.remove(id);
    }
}
