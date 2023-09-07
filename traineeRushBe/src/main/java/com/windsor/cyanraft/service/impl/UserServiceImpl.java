package com.windsor.cyanraft.service.impl;

import com.windsor.cyanraft.dao.UserDao;
import com.windsor.cyanraft.dto.UserLoginRequest;
import com.windsor.cyanraft.dto.UserRegisterRequest;
import com.windsor.cyanraft.model.User;
import com.windsor.cyanraft.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Override
    public User getUserById(Integer userId) {
        return userDao.getUserById(userId);
    }

    @Override
    public Integer register(UserRegisterRequest userRegisterRequest) {
        // 檢查email是否被註冊
        User user = userDao.getUserByEmail(userRegisterRequest.getEmail());

        if (user != null) {
            log.warn("The email: {} has been registered", userRegisterRequest.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        // 使用MD5生成密碼的雜湊值
        String hashedPassword = DigestUtils.md5DigestAsHex(userRegisterRequest.getPassword().getBytes());
        userRegisterRequest.setPassword(hashedPassword);

        // 創建帳號
        return userDao.createUser(userRegisterRequest);
    }

    @Override
    public User login(UserLoginRequest userLoginRequest) {
        User user = userDao.getUserByEmail(userLoginRequest.getEmail());

        // 檢查user是否存在
        if (user == null) {
            log.warn("The email: {} has not been registered yet", userLoginRequest.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        // 使用MD5生成密碼的雜湊值
        String hashedPassword = DigestUtils.md5DigestAsHex(userLoginRequest.getPassword().getBytes());

        // 比較密碼
        if (user.getPassword().equals(hashedPassword)) {
            return user;
        } else {
            log.warn("email: {} wrong password", userLoginRequest.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
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
