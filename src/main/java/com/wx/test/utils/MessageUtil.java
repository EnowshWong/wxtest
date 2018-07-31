package com.wx.test.utils;


import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author:wong
 */
public class MessageUtil {
    /**
     * 返回信息类型：文本
     */
    public static final String  RESP_MESSSAGE_TYPE_TEXT = "text";
    /**
     * 返回信息类型：音乐
     */
    public static final String  RESP_MESSSAGE_TYPE_MUSIC = "music";
    /**
     * 返回信息类型：图文
     */
    public static final String  RESP_MESSSAGE_TYPE_NEWS = "news";
    /**
     * 请求信息类型：文本
     */
    public static final String  REQ_MESSSAGE_TYPE_TEXT = "text";
    /**
     * 请求信息类型：图片
     */
    public static final String  REQ_MESSSAGE_TYPE_IMAGE = "image";
    /**
     * 请求信息类型：链接
     */
    public static final String  REQ_MESSSAGE_TYPE_LINK = "link";
    /**
     * 请求信息类型：地理位置
     */
    public static final String  REQ_MESSSAGE_TYPE_LOCATION = "LOCATION";
    /**
     * 请求信息类型：音频
     */
    public static final String  REQ_MESSSAGE_TYPE_VOICE = "voice";
    /**
     * 请求信息类型：推送
     */
    public static final String  REQ_MESSSAGE_TYPE_EVENT = "event";
    /**
     * 事件类型：subscribe（订阅）
     */
    public static final String  EVENT_TYPE_SUBSCRIBE = "subscribe";
    /**
     * 事件类型：unsubscribe（取消订阅）
     */
    public static final String  EVENT_TYPE_UNSUBSCRIBE = "unsubscribe";
    /**
     * 事件类型：click（自定义菜单点击事件）
     */
    public static final String  EVENT_TYPE_CLICK= "CLICK";

    /**
     * 事件类型：view（自定义菜单点击事件,返回url）
     */
    public static final String  EVENT_TYPE_VIEW= "VIEW";
    /**
     * 解析微信发来的请求 XML
     */
    @SuppressWarnings("unchecked")
    public static Map<String,String> pareXml(HttpServletRequest request) throws Exception {

        //将解析的结果存储在HashMap中
        Map<String,String> reqMap = new HashMap<String, String>();

        //从request中取得输入流
        InputStream inputStream = request.getInputStream();
        //读取输入流
        SAXReader reader = new SAXReader();
        Document document = reader.read(inputStream);
        //得到xml根元素
        Element root = document.getRootElement();
        //得到根元素的所有子节点
        List<Element> elementList = root.elements();
        //遍历所有的子节点取得信息类容
        for(Element elem:elementList){
            reqMap.put(elem.getName(),elem.getText());
        }
        //释放资源
        inputStream.close();
        inputStream = null;

        return reqMap;
    }
}
