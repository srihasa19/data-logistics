package com.logistics.backend.controller;

import com.logistics.backend.dto.AuthRequest;
import com.logistics.backend.dto.AuthResponse;
import com.logistics.backend.dto.RegisterRequest;
import com.logistics.backend.dto.UserDto;
import com.logistics.backend.entity.User;
import com.logistics.backend.security.JwtTokenProvider;
import com.logistics.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            var userDto = userService.registerUser(request);
            String token = tokenProvider.generateToken(request.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(token, userDto));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody AuthRequest request) {
        try {
            User user = userService.getUserByEmail(request.getEmail());

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(null, null));
            }

            if (!user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new AuthResponse(null, null));
            }

            String token = tokenProvider.generateToken(user.getEmail());

            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setEmail(user.getEmail());
            userDto.setFullName(user.getFullName());
            userDto.setRole(user.getRole());

            return ResponseEntity.ok(new AuthResponse(token, userDto));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null));
        }
    }
}
