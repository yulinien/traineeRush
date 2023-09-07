package com.windsor.cyanraft.dao;

import com.windsor.cyanraft.dto.CreateOrderRequest;
import com.windsor.cyanraft.dto.OrderQueryParams;
import com.windsor.cyanraft.model.Order;
import com.windsor.cyanraft.model.OrderItem;

import java.util.List;

public interface OrderDao {

    Integer countOrder(OrderQueryParams orderQueryParams);

    List<Order> getOrders(OrderQueryParams orderQueryParams);

    Order getOrderById(Integer orderId);

    List<OrderItem> getOrderItemsByOrderId(Integer orderId);

    Integer createOrder(Integer userId, Integer totalAmount);

    void createOrderItems(Integer orderId, List<OrderItem> orderItemList);
}
