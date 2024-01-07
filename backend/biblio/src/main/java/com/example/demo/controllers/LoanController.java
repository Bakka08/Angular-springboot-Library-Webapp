package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Book;
import com.example.demo.entities.DamageReport;
import com.example.demo.entities.Loan;
import com.example.demo.entities.User;
import com.example.demo.repositories.BookRepository;
import com.example.demo.repositories.DamageReportRepository;
import com.example.demo.repositories.LoanRepository;
import com.example.demo.repositories.UserRepository;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/loans")
public class LoanController {

	@Autowired
	LoanRepository loanRepository;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	UserRepository userRepository;
	@Autowired
	DamageReportRepository damageReportRepository;

	@GetMapping("/all")
	public List<Loan> getAllLoans() {
		return loanRepository.findAll();
	}

	@PutMapping("/end/{id}")
	public String endLoan(@PathVariable int id) {
		Loan loan = loanRepository.findById(id);

		if (loan != null) {
			loan.setStatus("ended");
			loanRepository.save(loan);
			loan.getBook().setIsavailable("available");
			bookRepository.save(loan.getBook());
			return "Loan status updated to ended.";
		} else {
			return "Loan not found with ID: " + id;
		}
	}

	@GetMapping("/create")
	public void createLoan(@RequestParam("bookId") int bookId, @RequestParam("userId") int userId,
			@RequestParam("returnDate") String returnDate) {

		// Retrieve book and user based on IDs
		Book book = bookRepository.findById(bookId);
		User user = userRepository.findById(userId);

		if (book != null && user != null) {
			// Create a new loan
			Loan newLoan = new Loan(book, user, returnDate, "en going");

			// Save the new loan to the repository
			loanRepository.save(newLoan);
			book.setIsavailable("Not available");
			bookRepository.save(book);
		}
		// Note: No return statement, as the method is now void.
	}

	@GetMapping("/createRepo")
	public void createrepo(@RequestParam("bookId") int bookId, @RequestParam("description") String description) {

		// Retrieve book and user based on IDs
		Book book = bookRepository.findById(bookId);

		if (book != null) {
			// Create a new loan
			DamageReport damageReport = new DamageReport(book, description);
			damageReportRepository.save(damageReport);
			book.setStatus("Damaged");
			bookRepository.save(book);
		}
		// Note: No return statement, as the method is now void.
	}

}
