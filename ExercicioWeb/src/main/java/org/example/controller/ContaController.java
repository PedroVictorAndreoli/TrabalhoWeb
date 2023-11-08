package org.example.controller;

import org.example.Service.IContaService;
import org.example.Service.ICrudService;
import org.example.dto.ContaDTO;
import org.example.model.Conta;
import org.example.model.Movimentacao;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
