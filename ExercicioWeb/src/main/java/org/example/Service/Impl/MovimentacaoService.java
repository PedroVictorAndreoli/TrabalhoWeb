package org.example.Service.Impl;

import org.example.Service.IContaService;
import org.example.Service.IMovimentacaoService;
import org.example.model.Conta;
import org.example.model.Movimentacao;
import org.example.repository.MovimentacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimentacaoService extends CrudService<Movimentacao, Long>
        implements IMovimentacaoService{

    private final MovimentacaoRepository movimentacaoRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }


    @Override
    protected JpaRepository<Movimentacao, Long> getRepository() {
        return movimentacaoRepository;
    }
}
