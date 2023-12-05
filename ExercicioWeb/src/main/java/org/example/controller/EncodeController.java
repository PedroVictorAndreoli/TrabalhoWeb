package org.example.controller;

import org.example.security.RSAGenerete;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
@RestController
@RequestMapping("encode")
public class EncodeController {

    private final RSAGenerete rsaGenerete;

    public EncodeController(RSAGenerete rsaGenerete) {
        this.rsaGenerete = rsaGenerete;
    }

    @GetMapping
    public ResponseEntity<String> getPublicKey() throws NoSuchAlgorithmException {
        return ResponseEntity.status(HttpStatus.OK)
                .body(rsaGenerete.getPublicKey().toString());

    }
}
