package com.wx.test.controller;

import com.wx.test.pojo.PageAccessToken;
import com.wx.test.pojo.UserInfo;
import com.wx.test.utils.HttpClientUtil;
import com.wx.test.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author:wong
 */
@Controller
public class PageController {

    @Value("${APPID}")
    private String appId;
    @Value("${APPSECRET}")
    private String appSecret;

    @RequestMapping("/")
    public String getPage(Model model, String code, String state){
        System.out.println("code："+code+"\nstate:"+state);
        //获取网页的access_token标志一个用户
        String url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appId+"&secret="+appSecret+"&code="+code+"&grant_type=authorization_code";
        String json = HttpClientUtil.doGet(url);
        //将json转为对象
        PageAccessToken accessToken = JsonUtils.jsonToPojo(json, PageAccessToken.class);
        //根据access_token获得用户信息
        String url1="https://api.weixin.qq.com/sns/userinfo?access_token="+accessToken.getAccessToken()+"&openid="+accessToken.getOpenid()+"&lang=zh_CN";
        String userInfoJson = HttpClientUtil.doGet(url1);
        UserInfo userInfo = JsonUtils.jsonToPojo(userInfoJson, UserInfo.class);
        model.addAttribute("userInfo",userInfo);
        return "index";
    }
}
