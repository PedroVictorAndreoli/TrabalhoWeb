package org.example.Service;

import org.example.model.Conta;
import org.example.repository.ContaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaService {

    private final ContaRepository contaRepository;

    public ContaService(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    public List<Conta> findAll() {
        return contaRepository.findAll();
    }
    public Page<Conta> findAll(Pageable pageable) {
        return contaRepository.findAll(pageable);
    }

    public Conta save(Conta conta) {
        return contaRepository.save(conta);
    }

    public Conta findOne(Long id) {
        return contaRepository.findById(id).orElse(null);
    }

    public boolean exists(Long id) {
        return contaRepository.existsById(id);
    }

    public void delete(Long id) {
        contaRepository.deleteById(id);
    }

}
