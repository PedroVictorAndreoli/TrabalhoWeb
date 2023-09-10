package org.example.controller;

import jakarta.validation.Valid;
import org.example.Service.MovimentacaoService;
import org.example.model.Movimentacao;
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
@RequestMapping("movimentacoes")
public class MovimentacaoController {
    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    @GetMapping
    public ResponseEntity<List<Movimentacao>> findAll() {
        return ResponseEntity.ok(movimentacaoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Movimentacao> create(@RequestBody @Valid Movimentacao movimentacao) {
        movimentacaoService.save(movimentacao);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand( movimentacao.getId() ).toUri();

        return ResponseEntity.created( location ).body( movimentacao );
    }

    @GetMapping("{id}") //http://localhost:8025/movimentacaos/1
    public ResponseEntity<Movimentacao> findOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(movimentacaoService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        movimentacaoService.delete(id);
    }

    @GetMapping("page")
    // http://localhost:8025/movimentacaos/page?page=0&size=5&order=name&asc=true
    public ResponseEntity<Page<Movimentacao>> findAllPaged(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String order,
            @RequestParam(required = false) Boolean asc
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (order != null && asc != null) {
            pageRequest = PageRequest.of(page, size,
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);
        }
        return ResponseEntity.ok(movimentacaoService.findAll(pageRequest));
    }
}
