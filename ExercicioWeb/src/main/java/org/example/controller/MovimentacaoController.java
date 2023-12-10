package org.example.controller;

import org.example.Service.Impl.MovimentacaoService;
import org.example.Service.ICrudService;
import org.example.dto.MovimentacaoDTO;
import org.example.model.Movimentacao;
import org.example.repository.interfaces.ValorAndCategoriaMovimentacao;
import org.example.repository.interfaces.ValorMovimentacao;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("movimentacoes")
public class MovimentacaoController extends CrudController<Movimentacao, MovimentacaoDTO, Long>{
    private final MovimentacaoService movimentacaoService;
    private final ModelMapper modelMapper;


    public MovimentacaoController(MovimentacaoService movimentacaoService, ModelMapper modelMapper) {
        super(Movimentacao.class, MovimentacaoDTO.class);
        this.movimentacaoService = movimentacaoService;
        this.modelMapper = modelMapper;
    }


    @GetMapping("maiorvalor")
    public ResponseEntity<Optional<ValorAndCategoriaMovimentacao>> findValorMaior(){
        return ResponseEntity.status(HttpStatus.OK).body(movimentacaoService.findCategoriaMaisGasta().stream().findFirst());
    }

    @GetMapping("pendente")
    public ResponseEntity<Double> findPentende(){
        return ResponseEntity.status(HttpStatus.OK).body(movimentacaoService.findPendente());
    }
    @GetMapping("saldoFuturo")
    public ResponseEntity<Double> findSaldoFuturo(){
        return ResponseEntity.status(HttpStatus.OK).body(movimentacaoService.saldoFuturo());
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
