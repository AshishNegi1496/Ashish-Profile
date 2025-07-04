   package com.profile.profile.config;

import com.profile.profile.controller.JwtAuthenticationFilter;
import com.profile.profile.entity.User;
import com.profile.profile.repository.UserRepository;
import com.profile.profile.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.x509.SubjectDnX509PrincipalExtractor;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

import static org.springframework.security.authorization.AuthorityReactiveAuthorizationManager.hasRole;

   @Configuration
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

       @Autowired
       private JwtAuthenticationFilter jwtAuthenticationFilter;
       @Bean
       public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
           http
                   .csrf(ServerHttpSecurity.CsrfSpec::disable)
                   .cors(ServerHttpSecurity.CorsSpec::disable) // Optional, already handled by WebMvcConfigurer
                   .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                   .authorizeExchange(exchange -> exchange
                           .pathMatchers(HttpMethod.OPTIONS).permitAll() // CORS preflight
                           .pathMatchers("/auth/login", "/auth/register", "/auth/test").permitAll()
                           .pathMatchers("/resources/**", "/signup", "/about", "/uploads/**", "/api/projects/**").permitAll()
                           .pathMatchers("/api/projects/create").hasRole("ADMIN")
                           .pathMatchers("/db/**").access((authentication, context) ->
                                   hasRole("ADMIN").check(authentication, context)
                                           .filter(decision -> !decision.isGranted())
                                           .switchIfEmpty(hasRole("DBA").check(authentication, context))
                           )
                           .anyExchange().denyAll()
                   );

           return http.build();
       }




    @Bean
    CommandLineRunner init(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
            }
        };
    }
}