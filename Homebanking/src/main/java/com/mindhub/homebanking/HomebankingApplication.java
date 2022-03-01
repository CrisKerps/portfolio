package com.mindhub.homebanking;

import com.mindhub.homebanking.models.*;
import com.mindhub.homebanking.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class HomebankingApplication {

	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(HomebankingApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(ClientRepository clientRepository,
									  AccountRepository accountRepository,
									  TransactionRepository transactionRepository,
									  LoanRepository loanRepository,
									  ClientLoanRepository clientLoanRepository,
									  CardRepository cardRepository){
		return args -> {
			//CREO CLIENTE
			Client cliente1= new Client("Melba", "Morel", "melba@mindhub.com", "1234567890");
			Client cliente2= new Client("Cristian", "Kerps", "cristiankerps27@gmail.com", "1234567890");
			Client cliente3= new Client("Juan", "Marderwald","juan@marderwald.com", "1234567890");
			//ADMIN
			Client admin = new Client("Admin", "Admin", "admin@admin.com", "admin");

			cliente1.setPassword(passwordEncoder.encode(cliente1.getPassword()));
			cliente2.setPassword(passwordEncoder.encode(cliente2.getPassword()));
			cliente3.setPassword(passwordEncoder.encode(cliente3.getPassword()));
			admin.setPassword(passwordEncoder.encode(admin.getPassword()));

			//REPO CLIENT
			clientRepository.save(cliente1);
			clientRepository.save(cliente2);
			clientRepository.save(cliente3);
			clientRepository.save(admin);

			//CREO CUENTA
			Account cuentaMelba= new Account("VIN001", LocalDateTime.now(),5000);
			Account cuentaMelba2= new Account("VIN002", LocalDateTime.now().plusDays(1),7500);
			Account cuentaCristian= new Account("VIN003", LocalDateTime.now(), 32000);
			Account cuentaJuan= new Account("VIN014", LocalDateTime.now().plusDays(2), 4500);

			//ASIGNO CUENTA AL CLIENTE
			cliente1.addAccount(cuentaMelba);
			cliente1.addAccount(cuentaMelba2);
			cliente2.addAccount(cuentaCristian);
			cliente3.addAccount(cuentaJuan);

			//AGREGO AL REPOSITORIO

			accountRepository.save(cuentaMelba);
			accountRepository.save(cuentaMelba2);
			accountRepository.save(cuentaCristian);
			accountRepository.save(cuentaJuan);


			//CREO TRANSACCIONES
			Transaction transaccion1= new Transaction(TransactionType.CREDITO, 2500, "Brubank", LocalDateTime.now(), cuentaMelba);
			transactionRepository.save(transaccion1);
			cuentaMelba.setBalance(cuentaMelba.getBalance()+ transaccion1.getAmount());
			accountRepository.save(cuentaMelba);
			Transaction transaccion2= new Transaction(TransactionType.DEBITO, -1000, "McDonalds", LocalDateTime.now(), cuentaMelba);
			transactionRepository.save(transaccion2);
			cuentaMelba.setBalance(cuentaMelba.getBalance()+ transaccion2.getAmount());
			accountRepository.save(cuentaMelba);
			Transaction transaccion3= new Transaction(TransactionType.CREDITO, 2000, "Juan transf", LocalDateTime.now(), cuentaMelba2);
			transactionRepository.save(transaccion3);
			cuentaMelba2.setBalance(transaccion3.getBalance());
			accountRepository.save(cuentaMelba2);
			Transaction transaccion4= new Transaction(TransactionType.DEBITO, -500, "Flores", LocalDateTime.now(), cuentaMelba2);
			transactionRepository.save(transaccion4);
			cuentaMelba2.setBalance(transaccion4.getBalance());
			accountRepository.save(cuentaMelba2);
			Transaction transaction5= new Transaction(TransactionType.CREDITO, 2500, "Binance", LocalDateTime.now(), cuentaCristian);
			transactionRepository.save(transaction5);
			cuentaCristian.setBalance(transaction5.getBalance());
			accountRepository.save(cuentaCristian);

			//ASIGNO TRANSACCIONES
			cuentaMelba.addTransaction(transaccion1);
			cuentaMelba.addTransaction(transaccion2);
			cuentaMelba2.addTransaction(transaccion3);
			cuentaMelba2.addTransaction(transaccion4);
			cuentaCristian.addTransaction(transaction5);

			//CREO LOAN
			Loan hipotecario = new Loan("Hipotecario",500000,List.of(12,24,36,48,60));
			Loan personal = new Loan("Personal",100000,List.of(6,12,24));
			Loan automotriz = new Loan("Automotriz",300000,List.of(6,12,24,36));

			loanRepository.save(hipotecario);
			loanRepository.save(personal);
			loanRepository.save(automotriz);

			//CREO PRESTAMOS
			ClientLoan prestamoMelba= new ClientLoan(400000, 60, cliente1, hipotecario);
			ClientLoan prestamoMelba2= new ClientLoan(50000, 12, cliente1, personal);
			ClientLoan prestamoJuan= new ClientLoan(100000, 24, cliente3, personal);
			ClientLoan prestamoJuan2= new ClientLoan(200000, 36, cliente3, automotriz);

			//ASIGNO PRESTAMO al Cliente //USE EL ADDCLIENTLOAN QUE TENGO DEFINIDO EN CLIENT
			cliente1.addClientLoan(prestamoMelba);
			cliente1.addClientLoan(prestamoMelba2);
			cliente3.addClientLoan(prestamoJuan);
			cliente3.addClientLoan(prestamoJuan2);

			//ASIGNO CLIENTE AL prestamo //USE EL ADDCLIENTLOAN QUE TENGO DEFINIDO EN LOAN
			hipotecario.addClientLoan(prestamoMelba);
			personal.addClientLoan(prestamoMelba2);
			personal.addClientLoan(prestamoJuan);
			automotriz.addClientLoan(prestamoJuan2);

			//CREO TARJETAS
			Card gold= new Card(cliente1, CardType.DEBIT, CardColor.GOLD, "4562106389793697", 485, LocalDateTime.now(), LocalDateTime.now().plusYears(5));
			Card titanium= new Card(cliente1, CardType.CREDIT, CardColor.TITANIUM, "4562116387719631", 879, LocalDateTime.now(), LocalDateTime.now().plusYears(5));
			Card silver= new Card(cliente2, CardType.CREDIT, CardColor.SILVER, "4562116877206479", 145, LocalDateTime.now(), LocalDateTime.now().plusYears(5));





			//AGREGO AL REPOSITORIO LOAN
			loanRepository.save(hipotecario);
			loanRepository.save(personal);
			loanRepository.save(automotriz);

			//AGREGO AL REPO...CREO UN CLIENTLOAN REPOSITORY
			clientLoanRepository.save(prestamoMelba);
			clientLoanRepository.save(prestamoMelba2);
			clientLoanRepository.save(prestamoJuan);
			clientLoanRepository.save(prestamoJuan2);

			//AGREGO AL REPO LAS TARJETAS
			cardRepository.save(gold);
			cardRepository.save(titanium);
			cardRepository.save(silver);


		};
	}



}
