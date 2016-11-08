package org.cboard.dto;

/**
 * Created by yfyuan on 2016/9/29.
 */
public class User {

    private int userId;
    private String userName;
    private String password;
    private String company;
    private String department;

    public User(){

    }

    public User(int userId, String userName) {
        this.userId = userId;
        this.userName = userName;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
