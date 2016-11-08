package org.cboard.services;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.cboard.dao.BoardDao;
import org.cboard.dao.UserDao;
import org.cboard.dao.WidgetDao;
import org.cboard.dto.User;
import org.cboard.dto.ViewDashboardBoard;
import org.cboard.dto.ViewDashboardWidget;
import org.cboard.pojo.DashboardBoard;
import org.cboard.pojo.DashboardWidget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yfyuan on 2016/8/23.
 */
@Repository
public class UserService {

    @Autowired
    private UserDao userDao;

    public User getUserByName(String userName){
        return userDao.getUserByName(userName);
    }

}
