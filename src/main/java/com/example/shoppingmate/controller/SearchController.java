package com.example.shoppingmate.controller;

import com.example.shoppingmate.Dto.SearchProductDto;
import com.example.shoppingmate.service.FavoriteProductService;
import com.example.shoppingmate.service.NaverShoppingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final NaverShoppingService naverShoppingService;
    private final FavoriteProductService favoriteProductService;

    @GetMapping
    public ResponseEntity<SearchProductDto.Response> searchProduct(@RequestParam(name = "query", required = false, defaultValue = "반팔") String query,
                                                                @RequestParam(name = "start", required = false, defaultValue = "1") int start,
                                                                @RequestParam(name = "display", required = false, defaultValue = "20") int display,
                                                                @RequestParam(name = "sort", required = false, defaultValue = "sim") String sort){

        String sanitizedQuery = query.replaceAll("</?b>", "");
        SearchProductDto.Response response = naverShoppingService.searchQuerySet(sanitizedQuery, display, start, sort);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/related")
    public ResponseEntity<List<SearchProductDto.Response.ShopItem>> searchRelatedProducts(
            @RequestParam("productTitle") String productTitle) {
        // 해당 상품의 제목에서 HTML 태그를 제거
        String sanitizedTitle = productTitle.replaceAll("</?b>", "");
        String[] words = sanitizedTitle.split(" ");

        // 단어 3개만 사용
        String query = String.join(" ", Arrays.copyOfRange(words, 0, Math.min(3, words.length)));

        // 해당 제목을 이용하여 연관 상품을 검색
        SearchProductDto.Response response = naverShoppingService.searchQuerySet(query, 10, 1, "sim");

        // 중복되지 않는 상품들만 리스트에 담기
        Set<String> seenProductIds = new HashSet<>();
        List<SearchProductDto.Response.ShopItem> relatedProductList = response.getItems().stream()
                .filter(item -> seenProductIds.add(String.valueOf(item.getProductId()))) // 중복 제거
                .collect(Collectors.toList());

        return new ResponseEntity<>(relatedProductList, HttpStatus.OK);
    }


}
