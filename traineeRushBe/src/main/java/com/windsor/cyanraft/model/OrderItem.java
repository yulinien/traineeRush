package com.windsor.cyanraft.model;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.Data;

@Data
public class OrderItem {

    // 對應到order_item table
    private Integer orderItemId;
    private Integer orderId;
    private Integer productId;
    private Integer quantity;
    private Integer amount;

    // 對應到product table
    private String productName;
    @Excel(name = "Image", type = 2, imageType = 2)
    private String imageUrl;
}
