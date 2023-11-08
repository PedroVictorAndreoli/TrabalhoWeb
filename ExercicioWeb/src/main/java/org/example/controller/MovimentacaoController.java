package org.example.controller;

import org.example.Service.Impl.ContaService;
import org.example.Service.Impl.MovimentacaoService;
import org.example.Service.ICrudService;
import org.example.Service.Impl.MovimentacaoService;
import org.example.dto.ContaDTO;
import org.example.dto.MovimentacaoDTO;
import org.example.enumList.TipoMovimentacao;
import org.example.model.Conta;
import org.example.model.Movimentacao;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("movimentacoes")
public class MovimentacaoController extends CrudController<Movimentacao, MovimentacaoDTO, Long>{
    private final MovimentacaoService movimentacaoService;
    private final ModelMapper modelMapper;

    private final ContaService contaService;

    public MovimentacaoController(MovimentacaoService movimentacaoService, ModelMapper modelMapper, ContaService contaService) {
        super(Movimentacao.class, MovimentacaoDTO.class);
        this.movimentacaoService = movimentacaoService;
        this.modelMapper = modelMapper;
        this.contaService = contaService;
    }

    protected void movimentaSaldoConta(Movimentacao movimentacao, double valor) throws Exception {
        Conta conta = movimentacao.getConta();
        if(movimentacao.getTipoMovimentacao().equals("TransferenciaContasSaida") || movimentacao.getTipoMovimentacao().equals("Despesa"))
            conta.setSaldo(conta.getSaldo() - valor);
        else if(movimentacao.getTipoMovimentacao().equals("TransferenciaContasEntrada") || movimentacao.getTipoMovimentacao().equals("Receita"))
            conta.setSaldo(conta.getSaldo() + valor);
        contaService.save(conta);
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
