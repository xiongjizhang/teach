package org.cboard.security.service;

import org.cboard.dto.User;
import org.cboard.dto.UserInfoVo;
import org.cboard.services.AuthenticationService;
import org.cboard.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by yfyuan on 2016/9/29.
 */
public class InMemAuthenticationService implements AuthenticationService {
    @Autowired
    private UserService userService;

    @Override
    public User getCurrentUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null) {
            return null;
        }
        Authentication authentication = context.getAuthentication();
        if (authentication == null) {
            return null;
        }
        UserInfoVo user = (UserInfoVo) authentication.getPrincipal();
        if (user == null) {
            return null;
        }
        return userService.getUserByName(user.getUsername());
    }
}
