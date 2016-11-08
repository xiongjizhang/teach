package org.cboard.dao;

import org.cboard.dto.User;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2016/11/8 0008.
 */
@Repository
public interface UserDao {
    User getUserByName(String name);
}
