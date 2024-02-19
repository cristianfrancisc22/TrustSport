package com.banz.trustsport.enums;

import lombok.Getter;

@Getter
public enum Bucket {
    IMAGES("trustsport");

    private final String bucketName;
    Bucket(String bucketName) {
        this.bucketName = bucketName;
    }

}
