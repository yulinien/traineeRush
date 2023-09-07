package com.windsor.cyanraft.service;

import com.windsor.cyanraft.dto.CreateOrderRequest;
import com.windsor.cyanraft.dto.OrderQueryParams;
import com.windsor.cyanraft.model.Order;

import java.util.List;

public interface OrderService {

    void isUserExist(Integer userId);

    Integer countOrder(OrderQueryParams orderQueryParams);

    List<Order> getOrders(OrderQueryParams orderQueryParams);

    Order getOrderById(Integer orderId);

    Integer createOrder(Integer userId, CreateOrderRequest createOrderRequest);
}
