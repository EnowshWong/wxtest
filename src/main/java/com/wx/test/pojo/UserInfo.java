package com.wx.test.pojo;

import java.util.List;

/**
 * @author:wong
 */
public class UserInfo {
    private String openid;
    private String nickname;
    private int sex;
    private String language;
    private String city;
    private String province;
    private String country;
    private String headimgurl;
    private List<String> privilege;
    public void setOpenid(String openid) {
        this.openid = openid;
    }
    public String getOpenid() {
        return openid;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public String getNickname() {
        return nickname;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }
    public int getSex() {
        return sex;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
    public String getLanguage() {
        return language;
    }

    public void setCity(String city) {
        this.city = city;
    }
    public String getCity() {
        return city;
    }

    public void setProvince(String province) {
        this.province = province;
    }
    public String getProvince() {
        return province;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    public String getCountry() {
        return country;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }
    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setPrivilege(List<String> privilege) {
        this.privilege = privilege;
    }
    public List<String> getPrivilege() {
        return privilege;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "openid='" + openid + '\'' +
                ", nickname='" + nickname + '\'' +
                ", sex=" + sex +
                ", language='" + language + '\'' +
                ", city='" + city + '\'' +
                ", province='" + province + '\'' +
                ", country='" + country + '\'' +
                ", headimgurl='" + headimgurl + '\'' +
                ", privilege=" + privilege +
                '}';
    }
}
