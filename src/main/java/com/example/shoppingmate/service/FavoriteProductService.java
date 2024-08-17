package com.example.shoppingmate.service;

import com.example.shoppingmate.domain.FavoriteProduct;
import com.example.shoppingmate.domain.User;
import com.example.shoppingmate.repository.FavoriteProductRepository;
import com.example.shoppingmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteProductService {

    private final FavoriteProductRepository favoriteProductRepository;
    private final UserRepository userRepository;

    public List<FavoriteProduct> getFavoritesByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return favoriteProductRepository.findByUser(user);
        } else {
            return List.of();
        }
    }
}
