package com.example.shoppingmate.controller;

import com.example.shoppingmate.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recommend")
public class RecommendationController {
    @Autowired
    private OpenAIService openAIService;

    @GetMapping
    public String recommend(@RequestParam("style") String style) {
        return openAIService.getRecommendation(style);
    }
}
