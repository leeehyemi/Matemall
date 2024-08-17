package com.example.shoppingmate.service;

import com.example.shoppingmate.Dto.SearchProductDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class NaverShoppingService {

    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverClientSecret;

    private final String url = "https://openapi.naver.com/v1/search/shop.json";

    public SearchProductDto.Response searchProduct(SearchProductDto.Post post){
        var uri = UriComponentsBuilder.fromUriString(url)
                .queryParams(post.toMultiValueMap())
                .build()
                .encode()
                .toUri();

        var headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", naverClientId);
        headers.set("X-Naver-Client-Secret", naverClientSecret);
        headers.setContentType(MediaType.APPLICATION_JSON);

        var httpEntity = new HttpEntity<>(headers);
        var responseType = new ParameterizedTypeReference<SearchProductDto.Response>(){};

        var responseEntity = new RestTemplate().exchange(
                uri,
                HttpMethod.GET,
                httpEntity,
                responseType
        );
        return responseEntity.getBody();
    }

    public SearchProductDto.Response searchQuerySet(String query, int display, int start, String sort) {
        SearchProductDto.Post post = new SearchProductDto.Post();
        post.setQuery(query);
        post.setStart(start);
        post.setDisplay(display);
        post.setSort(sort);

        return searchProduct(post);
    }

}
