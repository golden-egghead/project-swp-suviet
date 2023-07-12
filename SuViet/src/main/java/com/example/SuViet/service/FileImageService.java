package com.example.SuViet.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileImageService {
    public String storeFile(String path, MultipartFile file);
    public byte[] readFileContent(String filename);
}
