package com.example.SuViet.response;

public class ResponseObjectComment {
    private String status;
    private String message;
    private Object data;
    private int totalComments;

    public ResponseObjectComment() {
    }

    public ResponseObjectComment(String status, String message, Object data,
        int totalComments) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.totalComments = totalComments;
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

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
    
    @Override
    public String toString() {
        return "ResponseObject{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }

    public int getTotalComments() {
        return totalComments;
    }

    public void setTotalComments(int totalComments) {
        this.totalComments = totalComments;
    }
}

