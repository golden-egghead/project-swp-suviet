package com.example.SuViet.service.impl;

import com.example.SuViet.model.User;
import com.example.SuViet.service.FileImageService;
import com.example.SuViet.service.UserService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;
@Service
public class FileImageServiceIml implements FileImageService {
    private Path storageFolder;


    private boolean isImageFile(MultipartFile file) {
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        return Arrays.asList(new String[] {"png", "jpg", "jpeg", "bmp"})
                .contains(fileExtension.trim().toLowerCase());
    }

    @Override
    public String storeFile(String path, MultipartFile file) {
        if(path.trim().equals("characters")){
            storageFolder = Paths.get("SuViet\\src\\main\\resources\\static\\characters");
        } else if (path.trim().equals("avatars")) {
            storageFolder = Paths.get("SuViet\\src\\main\\resources\\static\\avatars");
        } else if (path.trim().equals("books")) {
            storageFolder = Paths.get("SuViet\\src\\main\\resources\\static\\books");
        }else{
            storageFolder = Paths.get("SuViet\\src\\main\\resources\\static\\historicalItem");
        }
        try {
            Files.createDirectories(storageFolder);
        } catch (IOException e) {
            throw new RuntimeException("Cannot initialize storage", e);
        }
        try {

            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file.");
            }
            //check file is image?
            if (!isImageFile(file)) {
                throw new RuntimeException("You can only upload image file");
            }
            //file must be <= 5 mb
            double fileSize = file.getSize() / 1_000_000.0f;
            if (fileSize > 5.0f) {
                throw new RuntimeException("You can only upload image file <= 5mb");
            }
            //File must be rename
            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            String generatedFileName = UUID.randomUUID().toString().replace("-", "");
            generatedFileName = generatedFileName + "." + fileExtension;
            Path destinationFilePath = this.storageFolder.resolve(
                            Paths.get(generatedFileName))
                    .normalize().toAbsolutePath();
            if (!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())) {
                throw new RuntimeException("Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
            }
            return generatedFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }

    }

    @Override
    public byte[] readFileContent(String filename) {
        try {
            Path file = storageFolder.resolve(filename);
            UrlResource resource =  new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
                return bytes;
            } else {
                throw new RuntimeException("Could not read file: " + filename);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not read file: " + filename);
        }
    }
}
