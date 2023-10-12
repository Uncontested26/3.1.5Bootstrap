package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    void add(User user);

    void updateUser(Long id, User user);

    void deleteUser(Long id);

    User getUserById(Long id);

    User getUserByName(String name);

     User findByEmail(String email);

    List<User> getAllUsers();
}
