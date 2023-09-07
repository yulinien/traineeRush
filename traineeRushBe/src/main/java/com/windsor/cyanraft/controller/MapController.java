package com.windsor.cyanraft.controller;

import com.windsor.cyanraft.dto.MapResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.TravelMode;

@RestController
@RequestMapping("/map")
public class MapController {

    private final String apiKey = "AIzaSyAIIHneT5FxG8d7evKo5eTmFopqAPGwpbo";

    @GetMapping
    public MapResponse getDistance(@RequestParam String from,
                                                   @RequestParam String to) {

        // 建立 GeoApiContext
        GeoApiContext context = new GeoApiContext.Builder().apiKey(apiKey).build();

        MapResponse mapResponse = new MapResponse();

        // 使用 DirectionsApiRequest 來發送請求
        DirectionsApiRequest request = DirectionsApi.getDirections(context,
                from, // 使用者的地址
                to   // 特定店家的地址
        );

        // 設定交通模式
        request.mode(TravelMode.DRIVING);  // 你可以根據需要更改為其他模式，如步行、公共交通等

        try {
            // 執行請求
            DirectionsResult result = request.await();

            // 提取距離和預計抵達時間
            String distance = result.routes[0].legs[0].distance.humanReadable;
            String duration = result.routes[0].legs[0].duration.humanReadable;

            mapResponse.setDistance(distance);
            mapResponse.setDuration(duration);

            return mapResponse;

        } catch (Exception e) {
            e.getStackTrace();
            return null;
        }
    }
}
