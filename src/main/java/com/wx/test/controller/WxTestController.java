package com.wx.test.controller;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.wx.test.pojo.message.ClickMessage;
import com.wx.test.utils.HttpClientUtil;
import com.wx.test.utils.JsonUtils;
import com.wx.test.utils.MessageUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.misc.MessageUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * @author:wong
 */
@Controller
public class WxTestController {
    private String APPID= "wx4a4649598a9c0a2b";
    private String APPSECRET="076ed0969627ecca131757b7f9b10c8e";
    private String ACCESS_TOKEN="11_gxEQk4hfQm3weh8bb491bau5KteJgoJRLvmkwFZYjS5qvBoNAsw4T5GIYyYt5R0HvZH1n8Px7XR6_Tiqk7hyAg_BQfhk_2eINedn7lEh4sHoBbSPLwvGxIafJ2MgBdcc7Tb_8A1cfMAXUFTCIQBbAHAYGR";

    @RequestMapping("/access_token")
    @ResponseBody
    public String testAccessToken(){
        String url="https://api.weixin.qq.com/cgi-bin/token?" +
                "grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET;
        String json = HttpClientUtil.doGet(url);
        return json;
    }

    @RequestMapping("/create_menu")
    @ResponseBody
    public String testCreateMenu(){
        String url="https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+ACCESS_TOKEN;
        String json="{\n" +
                "    \"button\": [\n" +
                "        {\n" +
                "            \"type\": \"click\", \n" +
                "            \"name\": \"今日歌曲\", \n" +
                "            \"key\": \"V1001_TODAY_MUSIC\"\n" +
                "        }, \n" +
                "        {\n" +
                "            \"name\": \"菜单\", \n" +
                "            \"sub_button\": [\n" +
                "                {\n" +
                "                    \"type\": \"view\", \n" +
                "                    \"name\": \"搜索\", \n" +
                "                    \"url\": \"https://www.jianshu.com/\"\n" +
                "                }, \n" +
                "                \n" +
                "                {\n" +
                "                    \"type\": \"click\", \n" +
                "                    \"name\": \"赞一下我们\", \n" +
                "                    \"key\": \"V1001_GOOD\"\n" +
                "                }\n" +
                "            ]\n" +
                "        }\n" +
                "    ]\n" +
                "}";
        String result = HttpClientUtil.doPostJson(url, json);
        return result;
    }

    @RequestMapping("/get_menu")
    @ResponseBody
    public String getMenuJson(){
        String url="https://api.weixin.qq.com/cgi-bin/menu/get?access_token="+ACCESS_TOKEN;
        String json = HttpClientUtil.doGet(url);
        return json;
    }

    @RequestMapping(value = "/",method = RequestMethod.POST)
    //微信消息推送会推送一个xml包，使用post方式推送
    @ResponseBody
    public String getMunuMessage(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //消息接收的处理
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        //调用工具类解析xml
        Map<String, String> map = MessageUtil.pareXml(request);
        //将map转换成java类
        //先转为json
        String json = JsonUtils.objectToJson(map);
        System.out.println(json);
        return null;
    }

//    @RequestMapping(value = "/",method = RequestMethod.POST)
//    @ResponseBody
//    public String commonMessage(HttpServletRequest request,HttpServletResponse response)throws Exception{
//
//
//    }
}
