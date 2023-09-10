package org.example.Service;

import org.example.model.Movimentacao;
import org.example.repository.MovimentacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;

    public MovimentacaoService(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }

    public List<Movimentacao> findAll() {
        return movimentacaoRepository.findAll();
    }
    public Page<Movimentacao> findAll(Pageable pageable) {
        return movimentacaoRepository.findAll(pageable);
    }

    public Movimentacao save(Movimentacao movimentacao) {
        return movimentacaoRepository.save(movimentacao);
    }

    public Movimentacao findOne(Long id) {
        return movimentacaoRepository.findById(id).orElse(null);
    }

    public boolean exists(Long id) {
        return movimentacaoRepository.existsById(id);
    }

    public void delete(Long id) {
        movimentacaoRepository.deleteById(id);
    }
}
