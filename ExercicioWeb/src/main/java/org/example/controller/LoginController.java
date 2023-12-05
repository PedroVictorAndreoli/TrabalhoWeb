package org.example.controller;

import org.example.Service.AuthService;
import org.example.dto.UsuarioDTO;
import org.example.model.Usuario;
import org.example.security.RSAGenerete;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.PublicKey;

public class LoginController {

    private final AuthService authService;


    public LoginController(AuthService authService, RSAGenerete rsaGenerete) {
        this.authService = authService;
    }



    @GetMapping("user-info")
    public UsuarioDTO getUserInfo(Principal principal) {
        return new UsuarioDTO((Usuario) authService.loadUserByUsername(principal.getName()));
    }
}
