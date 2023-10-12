package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/")
    public String Users(ModelMap model) {

        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "users";

    }
    @GetMapping("/login")
    public String getLogin() {
        return "login";
    }

    @GetMapping("/user")
    public String showUserAccount(Model model, Principal principal) {
        model.addAttribute("user", userService.getUserByName(principal.getName()));

        return "user";
    }


}
