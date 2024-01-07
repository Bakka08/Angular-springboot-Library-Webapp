package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.*;
import com.example.demo.repositories.BookRepository;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Books")
public class BookController {
	@Autowired
	BookRepository bookRepository;

	@GetMapping("/all")
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	// Get book by ID
	@GetMapping("/{id}")
	public Book getBookById(@PathVariable int id) {
		return bookRepository.findById(id);
	}

	// Add a new book
	@PostMapping("/save")
	public Book addBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}

	// Delete book by ID
	@DeleteMapping("delete/{id}")
	public void deleteBook(@PathVariable int id) {
		Book book = bookRepository.findById(id);
		bookRepository.delete(book);
	}

	// Update a book by ID
	@PutMapping("update/{id}")
	public String updateBook(@PathVariable int id, @RequestBody Book updatedBook) {
		Book book = bookRepository.findById(id);
		book.setTitle(updatedBook.getTitle());
		book.setAuthor(updatedBook.getAuthor());
		book.setEdition(updatedBook.getEdition());
		book.setGenre(updatedBook.getGenre());
		book.setImage(updatedBook.getImage());
		bookRepository.save(book);
		return "";
	}
}