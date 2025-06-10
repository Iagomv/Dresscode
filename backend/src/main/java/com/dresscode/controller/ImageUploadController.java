package com.dresscode.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.dresscode.constants.ApiRoutes;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiRoutes.IMAGES)
@Tag(name = "Images", description = "Image Upload API")
public class ImageUploadController {

    @Value("${files.images.path}")
    private String imagesDir;
    private final List<String> ALLOWED_TYPES = List.of("jpeg", "jpg", "png", "gif");

    @Operation(summary = "Upload an image file", description = "Accepts a multipart file upload and returns the image URL.")
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile file,
            @RequestPart("title") String title,
            @RequestPart("category") String category) {

        if (file.isEmpty()) {
            return badRequestWithMessage("Please select a file to upload.");
        }

        if (!isAllowedType(file.getOriginalFilename())) {
            return badRequestWithMessage("Only JPEG, JPG, PNG and GIF files are allowed.");
        }

        try {
            String uniqueFilename = getUniqueFilename(file, title);

            // Prepare directory: imagesDir/category
            Path categoryPath = getCategoryPath(category);

            Path targetLocation = categoryPath.resolve(uniqueFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "/images/" + category + "/" + uniqueFilename;

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("message", "Could not store file: " + e.getMessage()));
        }
    }

    private Path getCategoryPath(String category) throws IOException {
        Path categoryPath = Paths.get(imagesDir, category);
        if (!Files.exists(categoryPath)) {
            Files.createDirectories(categoryPath);
        }
        return categoryPath;
    }

    private String getUniqueFilename(MultipartFile file, String title) {
        String safeTitle = title.replaceAll("[^a-zA-Z0-9-_\\.]", "_");
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFilename = safeTitle + "-" + filename;
        return uniqueFilename;
    }

    private boolean isAllowedType(String filename) {
        if (filename == null || !filename.contains(".")) {
            return false;
        }
        String extension = filename.substring(filename.lastIndexOf(".") + 1);
        return ALLOWED_TYPES.contains(extension.toLowerCase());
    }

    private ResponseEntity<Map<String, String>> badRequestWithMessage(String message) {
        return ResponseEntity.badRequest().body(Map.of("message", message));
    }
}