package com.example.demo.controller;

import com.example.demo.model.Location;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private UserService userService;

    // Save location for user
    @PostMapping
    public Location saveLocation(@RequestBody Location location) {
        if (location.getUser() == null || location.getUser().getId() == null) {
            throw new RuntimeException("User is not valid.");
        }
        return userService.saveLocation(location, location.getUser().getId());
    }

    // Get all saved locations for a user
    @GetMapping("/user/{userId}")
    public List<Location> getAllLocations(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> user.getSavedLocations()) // Assuming you have the saved locations in the User entity
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
