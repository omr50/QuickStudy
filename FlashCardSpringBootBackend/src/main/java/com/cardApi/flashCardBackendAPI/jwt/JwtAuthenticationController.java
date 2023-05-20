package com.cardApi.flashCardBackendAPI.jwt;
import com.cardApi.flashCardBackendAPI.user.User;
import com.cardApi.flashCardBackendAPI.user.UserDetailsServiceImpl;
import com.cardApi.flashCardBackendAPI.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenService tokenService;

    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationController(JwtTokenService tokenService,
                                       AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/")  // for aws health check
    public String rootUrl() {
        return "App is up and running!";
    }
    @PostMapping("/signup")
    public ResponseEntity<String> createUser(@RequestBody User user){
        try {
            System.out.println('a');
            UserDetails user1 = userDetailsService.loadUserByUsername(user.getUsername());
            System.out.println('b');
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        } catch (UsernameNotFoundException e) {
            System.out.println('c');
            // if the user isn't found then that's good because that allows
            // us to create a new user.

            // Before saving, encrpy the password
            String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            System.out.println('d');
            user.setPassword(encodedPassword);
            System.out.println('e');
            userRepository.save(user);
            System.out.println('f');
            return ResponseEntity.ok("User Created Successfully!");
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(
            @RequestBody JwtTokenRequest jwtTokenRequest) {
        var authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(),
                        jwtTokenRequest.password());
        var authentication =
                authenticationManager.authenticate(authenticationToken);
        var token = tokenService.generateToken(authentication);
        System.out.println(token);
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}