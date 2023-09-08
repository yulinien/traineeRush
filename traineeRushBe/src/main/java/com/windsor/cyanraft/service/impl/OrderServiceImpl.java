package com.windsor.cyanraft.service.impl;

import cn.afterturn.easypoi.excel.entity.params.ExcelExportEntity;
import com.windsor.cyanraft.dao.OrderDao;
import com.windsor.cyanraft.dao.ProductDao;
import com.windsor.cyanraft.dao.UserDao;
import com.windsor.cyanraft.dto.BuyItem;
import com.windsor.cyanraft.dto.CreateOrderRequest;
import com.windsor.cyanraft.dto.OrderQueryParams;
import com.windsor.cyanraft.model.Order;
import com.windsor.cyanraft.model.OrderItem;
import com.windsor.cyanraft.model.Product;
import com.windsor.cyanraft.model.User;
import com.windsor.cyanraft.service.OrderService;
import com.windsor.cyanraft.util.ExcelUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final static Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;

    @Value("./src/main/resources/template/tempFiles/")
    private String tempFiles;
    @Override
    public void isUserExist(Integer userId) {
        User user = userDao.getUserById(userId);

        if (user == null) {
            log.warn("The user {} does not exist", userId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public Integer countOrder(OrderQueryParams orderQueryParams) {
        return orderDao.countOrder(orderQueryParams);
    }

    @Override
    public List<Order> getOrders(OrderQueryParams orderQueryParams) {
        List<Order> orderList = orderDao.getOrders(orderQueryParams);

        for (Order order : orderList) {
            List<OrderItem> orderItemList = orderDao.getOrderItemsByOrderId(order.getOrderId());

            order.setOrderItemList(orderItemList);
        }

        return orderList;
    }

    @Override
    public Order getOrderById(Integer orderId) {
        Order order = orderDao.getOrderById(orderId);

        List<OrderItem> orderItemList = orderDao.getOrderItemsByOrderId(orderId);

        order.setOrderItemList(orderItemList);

        return order;
    }

    @Override
    @Transactional
    public Integer createOrder(Integer userId, CreateOrderRequest createOrderRequest) {
        int totalAmount = 0;
        List<OrderItem> orderItemList = new ArrayList<>();

        for (BuyItem buyItem : createOrderRequest.getBuyItemList()) {
            Product product = productDao.getProductById(buyItem.getProductId());

            // 檢查 product是否存在、stock是否足夠
            if (product == null) {
                log.warn("The product {} does not exist", buyItem.getProductId());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

            } else if (product.getStock() < buyItem.getQuantity()) {
                log.warn("The quantity of product {} is insufficient and cannot be purchased. " +
                                "Remaining inventory {}, want to buy {}",
                        buyItem.getProductId(), product.getStock(), buyItem.getQuantity());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            // 扣除商品庫存
            productDao.updateStock(product.getProductId(), product.getStock() - buyItem.getQuantity());

            // 計算訂單總花費
            int amount = buyItem.getQuantity() * product.getPrice();
            totalAmount += amount;

            // 轉換 BuyItem to OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(buyItem.getProductId());
            orderItem.setQuantity(buyItem.getQuantity());
            orderItem.setAmount(amount);

            orderItemList.add(orderItem);
        }

        // 創建訂單
        Integer orderId = orderDao.createOrder(userId, totalAmount);

        orderDao.createOrderItems(orderId, orderItemList);

        return orderId;
    }

    @Override
    public String orderPrint(Integer orderId) {

        var orderList = orderDao.getOrderItemsByOrderId(orderId);

        String fileDatetime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String fileName = "order_list"+ fileDatetime + "xlsx";
        String filePath = tempFiles + fileName;

        List<ExcelExportEntity> excelParams;

        excelParams = List.of(
                new ExcelExportEntity("Order_Item", "orderItemId", 20),
                new ExcelExportEntity("order_id", "orderId", 20),
                new ExcelExportEntity("product_id", "productId", 20),
                new ExcelExportEntity("quantity","quantity",20),
                new ExcelExportEntity("amount","amount",20),
                new ExcelExportEntity("product_name","productName",25),
                new ExcelExportEntity("image_url","imageUrl",40)
        );

        ExcelUtil.exportExcel(orderList,null , fileName, excelParams, filePath, true);
        return filePath;
    }
}
