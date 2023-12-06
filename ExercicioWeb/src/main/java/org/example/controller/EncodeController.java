package org.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;

@RestController
@RequestMapping("encode")
public class EncodeController {

    private final RSAGenerete rsaGenerete;

    public EncodeController(RSAGenerete rsaGenerete) {
        this.rsaGenerete = rsaGenerete;
    }

    @GetMapping
    public ResponseEntity<BigInteger> getPublicKey() throws NoSuchAlgorithmException {
        System.out.println(rsaGenerete.getPublicKey().toString());
        RSAPublicKey rsaPub  = (RSAPublicKey)(rsaGenerete.getPublicKey());
        return ResponseEntity.status(HttpStatus.OK)
                .body(rsaPub.getModulus());
    }
}
