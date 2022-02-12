package com.mindhub.homebanking.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@EnableWebSecurity
@Configuration
public class WebAuthorization extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/web/index.html", "/web/script/login.js","/web/login.html","/web/script/login.js","/web/registrarvista.html","/web/styles/**", "/web/assets/**", "/web/script/index.js","/web/images/**", "/web/img/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/clients").permitAll()
               // .antMatchers("/api/payment").permitAll()
                .antMatchers("/rest/**").hasAuthority("ADMIN")
                .antMatchers("/api/admin/**").hasAuthority("ADMIN")
                .antMatchers("/manager.html", "/web/script/manager.js", "/admin.html", "/admin.js","/assets/logo-removebg-preview.png").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/transactions").hasAuthority("CLIENT")
                .antMatchers(HttpMethod.POST, "/api/cards").hasAuthority("CLIENT")
                .antMatchers("/**","/web/styles/assets/**","/web/styles/card-gold.css","/web/styles/card-silver.css","/web/styles/card-titanium.css").hasAuthority("CLIENT");


        http.formLogin()
                .usernameParameter("email")
                .passwordParameter("password")
                .loginPage("/api/login");

        http.logout().logoutUrl("/api/logout");

        // turn off checking for CSRF tokens
        http.csrf().disable();

        //disabling frameOptions so h2-console can be accessed
        http.headers().frameOptions().disable();

        // if user is not authenticated, just send an authentication failure response
        http.exceptionHandling().authenticationEntryPoint((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        // if login is successful, just clear the flags asking for authentication
        http.formLogin().successHandler((req, res, auth) -> clearAuthenticationAttributes(req));

        // if login fails, just send an authentication failure response
        http.formLogin().failureHandler((req, res, exc) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        // if logout is successful, just send a success response
        http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());

        //if you spend too much time without doing something it will send you again to the login
        http.sessionManagement()
                .invalidSessionUrl("/web/index.html");

    }

    private void clearAuthenticationAttributes(HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        if (session != null) {

            session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);

        }

    }
}
