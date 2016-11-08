package org.cboard.services;

import com.alibaba.fastjson.JSONObject;
import org.cboard.dao.WidgetDao;
import org.cboard.pojo.DashboardWidget;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by yfyuan on 2016/8/22.
 */
@Repository
public class WidgetService {

    @Autowired
    private WidgetDao widgetDao;

    public ServiceStatus save(int userId, String json) {
        JSONObject jsonObject = JSONObject.parseObject(json);
        DashboardWidget widget = new DashboardWidget();
        widget.setUserId(userId);
        widget.setName(jsonObject.getString("name"));
        widget.setData(jsonObject.getString("data"));
        widget.setCategoryName(jsonObject.getString("categoryName"));
        if (StringUtils.isEmpty(widget.getCategoryName())) {
            widget.setCategoryName("默认分类");
        }
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("widget_name", widget.getName());
        paramMap.put("user_id", widget.getUserId());

        if (widgetDao.countExistWidgetName(paramMap) <= 0) {
            widgetDao.save(widget);
            return new ServiceStatus(ServiceStatus.Status.Success, "success");
        } else {
            return new ServiceStatus(ServiceStatus.Status.Fail, "名称已存在");
        }
    }

    public ServiceStatus update(int userId, String json) {
        JSONObject jsonObject = JSONObject.parseObject(json);
        DashboardWidget widget = new DashboardWidget();
        widget.setUserId(userId);
        widget.setId(jsonObject.getLong("id"));
        widget.setName(jsonObject.getString("name"));
        widget.setCategoryName(jsonObject.getString("categoryName"));
        widget.setData(jsonObject.getString("data"));
        if (StringUtils.isEmpty(widget.getCategoryName())) {
            widget.setCategoryName("默认分类");
        }
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("widget_name", widget.getName());
        paramMap.put("user_id", widget.getUserId());
        paramMap.put("widget_id", widget.getId());
        if (widgetDao.countExistWidgetName(paramMap) <= 0) {
            widgetDao.update(widget);
            return new ServiceStatus(ServiceStatus.Status.Success, "success");
        } else {
            return new ServiceStatus(ServiceStatus.Status.Fail, "名称已存在");
        }
    }

    public ServiceStatus delete(int userId, Long id) {
        widgetDao.delete(id, userId);
        return new ServiceStatus(ServiceStatus.Status.Success, "success");
    }
}
