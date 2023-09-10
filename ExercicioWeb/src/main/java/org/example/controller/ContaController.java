package org.example.controller;

import jakarta.validation.Valid;
import org.example.Service.ContaService;
import org.example.model.Conta;
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
public class ContaController {
    private final ContaService contaService;

    public ContaController(ContaService contaService) {
        this.contaService = contaService;
    }

    @GetMapping
    public ResponseEntity<List<Conta>> findAll() {
        return ResponseEntity.ok(contaService.findAll());
    }

    @PostMapping
    public ResponseEntity<Conta> create(@RequestBody @Valid Conta conta) {
        contaService.save(conta);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand( conta.getId() ).toUri();

        return ResponseEntity.created( location ).body( conta );
    }

    @GetMapping("{id}") //http://localhost:8025/contas/1
    public ResponseEntity<Conta> findOne(@PathVariable("id") Long id) {
        return ResponseEntity.ok(contaService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        contaService.delete(id);
    }

    @GetMapping("page")
    // http://localhost:8025/contas/page?page=0&size=5&order=name&asc=true
    public ResponseEntity<Page<Conta>> findAllPaged(
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
        return ResponseEntity.ok(contaService.findAll(pageRequest));
    }
}
