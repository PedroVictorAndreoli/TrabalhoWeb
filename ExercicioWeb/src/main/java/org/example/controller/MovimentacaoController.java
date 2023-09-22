package org.example.controller;

import org.example.service.ICrudService;
import org.example.service.Impl.MovimentacaoService;
import org.example.dto.MovimentacaoDTO;
import org.example.model.Movimentacao;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("movimentacoes")
public class MovimentacaoController extends CrudController<Movimentacao, MovimentacaoDTO, Long>{
    private final MovimentacaoService movimentacaoService;
    private final ModelMapper modelMapper;

    public MovimentacaoController( MovimentacaoService movimentacaoService, ModelMapper modelMapper) {
        super(Movimentacao.class, MovimentacaoDTO.class);
        this.movimentacaoService = movimentacaoService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Movimentacao, Long> getService() {
        return movimentacaoService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
