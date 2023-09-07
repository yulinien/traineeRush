package com.windsor.cyanraft.dao;

import com.windsor.cyanraft.dto.UserRegisterRequest;
import com.windsor.cyanraft.model.User;

public interface UserDao {

    User getUserById(Integer userId);

    User getUserByEmail(String email);

    Integer createUser(UserRegisterRequest userRegisterRequest);
}
