package com.banz.trustsport.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.banz.trustsport.enums.Bucket;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Service
public class FileStore {

    private final AmazonS3 s3;

    public FileStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void save(String path,
                     String fileName,
                     Optional<Map<String,String>> optionalMetadata,
                     InputStream inputStream) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        optionalMetadata.ifPresent(map -> {
            if (!map.isEmpty()) {
                map.forEach(objectMetadata::addUserMetadata);
            }
        });
        try {
            s3.putObject(path,fileName,inputStream,objectMetadata);

        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to store file to s3", e);
        }
    }

    public byte[] download(String path, String thumbnailLink) {
        try {
            S3Object object = s3.getObject(path, thumbnailLink);
            try (S3ObjectInputStream inputStream = object.getObjectContent()) {
                return IOUtils.toByteArray(inputStream);
            } catch (IOException e) {
                throw new RuntimeException("Failed to read S3 object content", e);
            }
        } catch (AmazonServiceException e) {
            // Log or handle the AmazonServiceException appropriately
            throw new RuntimeException("Failed to download from S3", e);
        }
    }

    public String uploadImage(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", "image/webp"); // Set content type to WebP
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        String path = String.format("%s", Bucket.IMAGES.getBucketName()); // Customize path based on user ID
        String filename = String.format("%s.webp", UUID.randomUUID()); // Generate unique filename with .webp extension

        try {
            BufferedImage image = ImageIO.read(file.getInputStream());
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(image,"webp", outputStream);
            // Save the uploaded image to the file store
            save(path, filename, Optional.of(metadata), new ByteArrayInputStream(outputStream.toByteArray()));
        } catch (IOException e) {
            throw new IllegalStateException("Failed to upload image", e);
        }
        return filename;
    }
}
