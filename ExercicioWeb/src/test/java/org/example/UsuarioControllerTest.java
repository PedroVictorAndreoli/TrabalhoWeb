package org.example;

import org.example.Service.ICrudService;
import org.example.model.Usuario;
import org.example.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

import java.io.Serializable;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {
    private static final String API_USERS = "/usuarios";
    @Autowired
    private TestRestTemplate testRestTemplate;
    @Autowired
    private UsuarioRepository usuarioRepository;


    @BeforeEach
    public void cleanup() {
        usuarioRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }
    public <T> ResponseEntity<T> postSignup(Object request, Class<T> responseType) {
        return testRestTemplate.postForEntity(API_USERS, request, responseType);
    }
    @Test
    public void post_quandoEValido_retorneOk(){
        Usuario user = criarUsuarioValido();
        ResponseEntity<Object> response = postSignup(user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    private Usuario criarUsuarioValido() {
        Usuario user = new Usuario();
        user.setUsername("test-user");
        user.setNome("test-display");
        user.setSenha("P4ssword");
        return user;
    }
}
