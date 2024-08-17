package com.example.shoppingmate.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

public class SearchProductDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        private String query = ""; // 검색어 utf-8로 인코딩 필요
        private int display = 20;
        private int start = 1;
        private String sort = "sim"; // 정확도순

        public MultiValueMap<String, String> toMultiValueMap() {
            var map = new LinkedMultiValueMap<String, String>();
            map.add("query", query);
            map.add("display", String.valueOf(display));
            map.add("start", String.valueOf(start));
            map.add("sort", sort);

            return map;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response { //반환값
        private String lastBuildDate; //검색한 결과를 생성한 시간
        private int total; // 총 검색결과 갯수
        private int start; // 검색 시작 위치
        private int display; // 한번에 표시할 검색결과 갯수
        private List<ShopItem> items;
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class ShopItem {
            private String title; //제목
            private String link;
            private String image;
            private int lprice;
            private long productId;
            private String category1;
        }
    }
}
