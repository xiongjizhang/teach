package org.cboard.security.service;

import org.cboard.dto.User;
import org.cboard.dto.UserInfoVo;
import org.cboard.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Created by Administrator on 2016/11/8 0008.
 */
public class UserDetailService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User u = userService.getUserByName(s);
        UserInfoVo user = new UserInfoVo();
        user.setUsername(s);
        user.setPassword(u.getPassword());
        return user;
    }
}
