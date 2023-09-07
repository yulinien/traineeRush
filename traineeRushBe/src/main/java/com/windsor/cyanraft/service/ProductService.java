package com.windsor.cyanraft.service;

import com.windsor.cyanraft.dto.ProductQueryParams;
import com.windsor.cyanraft.dto.ProductRequest;
import com.windsor.cyanraft.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts(ProductQueryParams productQueryParams);

    Integer countProduct(ProductQueryParams productQueryParams);

    Product getProductById(Integer productId);

    Integer createProduct(ProductRequest productRequest);

    void updateProduct(Integer productId, ProductRequest productRequest);

    void deleteProduct(Integer productId);
}
