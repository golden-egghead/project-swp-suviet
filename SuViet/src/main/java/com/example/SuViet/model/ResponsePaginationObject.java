package com.example.SuViet.model;

public class ResponseVieoObject {
    private String status;
    private String message;
    private String totalNumber;
    private Object data;

    public ResponseVieoObject() {
    }

    public ResponseVieoObject(String status, String message, String totalNumber, Object data) {
        this.status = status;
        this.message = message;
        this.totalNumber = totalNumber;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTotalNumber() {
        return totalNumber;
    }

    public void setTotalNumber(String totalNumber) {
        this.totalNumber = totalNumber;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResponseVieoObject{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", totalNumber='" + totalNumber + '\'' +
                ", data=" + data +
                '}';
    }
}
