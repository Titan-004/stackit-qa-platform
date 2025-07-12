package com.odoo.stackit_backend.service;

import com.odoo.stackit_backend.Entities.User;
import com.odoo.stackit_backend.Entities.dto.UserDTO;
import com.odoo.stackit_backend.Repo.userRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {
    private final userRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    public userService(userRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserDTO dto) {
        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        String role = "USER";
        String username = dto.getUsername();

        if (username.startsWith("odoo")) {
            try {
                int num = Integer.parseInt(username.substring(4));
                if (num >= 0 && num <= 100) {
                    role = "ADMIN";
                }
            } catch (NumberFormatException ignored) {}
        }

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(role)
                .build();

        return userRepository.save(user);
    }
}
