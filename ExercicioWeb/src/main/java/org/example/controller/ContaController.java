package org.example.controller;

import jakarta.validation.Valid;
import org.example.Service.IContaService;
import org.example.Service.ICrudService;
import org.example.Service.Impl.ContaService;
import org.example.dto.ContaDTO;
import org.example.model.Conta;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("contas")
public class ContaController  extends CrudController<Conta, ContaDTO, Long>{
    private final IContaService contaService;
    private final ModelMapper modelMapper;

    public ContaController(IContaService contaService, ModelMapper modelMapper) {
        super(Conta.class, ContaDTO.class);
        this.contaService = contaService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Conta, Long> getService() {
        return contaService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
