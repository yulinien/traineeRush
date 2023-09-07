package com.windsor.cyanraft.dao;

import com.windsor.cyanraft.dto.ProductQueryParams;
import com.windsor.cyanraft.dto.ProductRequest;
import com.windsor.cyanraft.model.Product;

import java.util.List;

public interface ProductDao {

    List<Product> getProducts(ProductQueryParams productQueryParams);

    Integer countProduct(ProductQueryParams productQueryParams);

    Product getProductById(Integer productId);

    Integer createProduct(ProductRequest productRequest);

    void updateProduct(Integer productId, ProductRequest productRequest);

    void updateStock(Integer productId, Integer stock);

    void deleteProduct(Integer productId);
}
