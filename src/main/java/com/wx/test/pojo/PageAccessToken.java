package com.wx.test.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author:wong
 */
public class PageAccessToken {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("expires_in")
    private int expiresIn;
    @JsonProperty("refresh_token")
    private String refreshToken;
    private String openid;
    private String scope;
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    public String getAccessToken() {
        return accessToken;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }
    public int getExpiresIn() {
        return expiresIn;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    public String getRefreshToken() {
        return refreshToken;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }
    public String getOpenid() {
        return openid;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
    public String getScope() {
        return scope;
    }
}
