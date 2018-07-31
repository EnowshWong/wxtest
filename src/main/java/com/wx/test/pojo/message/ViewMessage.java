package com.wx.test.pojo.message;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author:wong
 */
public class ViewMessage {
    @JsonProperty("MenuId")
    private String menuid;
    @JsonProperty("CreateTime")
    private String createtime;
    @JsonProperty("EventKey")
    private String eventkey;
    @JsonProperty("Event")
    private String event;
    @JsonProperty("ToUserName")
    private String tousername;
    @JsonProperty("FromUserName")
    private String fromusername;
    @JsonProperty("MsgType")
    private String msgtype;
    public void setMenuid(String menuid) {
        this.menuid = menuid;
    }
    public String getMenuid() {
        return menuid;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }
    public String getCreatetime() {
        return createtime;
    }

    public void setEventkey(String eventkey) {
        this.eventkey = eventkey;
    }
    public String getEventkey() {
        return eventkey;
    }

    public void setEvent(String event) {
        this.event = event;
    }
    public String getEvent() {
        return event;
    }

    public void setTousername(String tousername) {
        this.tousername = tousername;
    }
    public String getTousername() {
        return tousername;
    }

    public void setFromusername(String fromusername) {
        this.fromusername = fromusername;
    }
    public String getFromusername() {
        return fromusername;
    }

    public void setMsgtype(String msgtype) {
        this.msgtype = msgtype;
    }
    public String getMsgtype() {
        return msgtype;
    }

}
