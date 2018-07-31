package com.wx.test.controller;

import com.sun.jndi.toolkit.url.UrlUtil;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.tomcat.util.buf.UriUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import sun.net.util.URLUtil;

/**
 * @author:wong
 * 网页授权
 */
@Controller
public class AuthenController {

    @Value("${APPID}")
    private String appId;

    @RequestMapping("/auth")
    //引导用户打开https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
    public ModelAndView getAuth(){
        //
        String redirectURL="http://zqbxs6.natappfree.cc";
        String redirectURLEncode= com.wx.test.utils.UrlUtil.getURLEncoderString(redirectURL);
        String url="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+redirectURLEncode+"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
        return new ModelAndView(new RedirectView(url));
    }
}
