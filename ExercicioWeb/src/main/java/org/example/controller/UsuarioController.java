package org.example.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.example.Service.UsuarioService;
import org.example.model.Usuario;
import org.example.shared.GenericResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public GenericResponse createUser(@Valid @RequestBody Usuario usuario) {
        usuarioService.save(usuario);
        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setMessage("User saved");
        return genericResponse;
    }

}
