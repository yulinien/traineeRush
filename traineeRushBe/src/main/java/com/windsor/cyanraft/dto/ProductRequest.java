package com.windsor.cyanraft.dto;

import com.windsor.cyanraft.constant.ProductCategory;
import lombok.Data;

import jakarta.validation.constraints.NotNull;

@Data
public class ProductRequest {

    @NotNull
    private String productName;

    @NotNull
    private ProductCategory category;

    @NotNull
    private String imageUrl;

    @NotNull
    private Integer price;

    @NotNull
    private Integer stock;

    private String description;
}
