package br.edu.fbuni.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.fbuni.model.Customers;
import br.edu.fbuni.repository.CustomersRepository;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/")
public class CustomersController {

	@Autowired
	CustomersRepository customersRepository;

	@GetMapping("customers")
	public ResponseEntity<List<Customers>> getAllCustomers(@RequestParam(required = false) String name) {
		try {
			List<Customers> customers = new ArrayList<Customers>();

			if (name == null)
				customersRepository.findAll().forEach(customers::add);
			else
				customersRepository.findCustomerByName(name).forEach(customers::add);

			if (customers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(customers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("customers/{id}")
	public ResponseEntity<Customers> getCustomerById(@PathVariable("id") long id) {
		Optional<Customers> customerData = customersRepository.findById(id);

		if (customerData.isPresent()) {
			return new ResponseEntity<>(customerData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("customers")
	public ResponseEntity<Customers> createCustomer(@RequestBody Customers customers) {
		try {
			if (customers.getName() == null || customers.getName().isEmpty()) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}

			Customers _customers = customersRepository
					.save(new Customers(customers.getName()));
			return new ResponseEntity<>(_customers, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("customers/{id}")
	public ResponseEntity<Customers> updateCustomer(@PathVariable("id") long id, @RequestBody Customers customers) {
		Optional<Customers> customerData = customersRepository.findById(id);

		if (customerData.isPresent()) {
			Customers _customers = customerData.get();
			_customers.setName(customers.getName());
			return new ResponseEntity<>(customersRepository.save(_customers), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("customers/{id}")
	public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable("id") long id) {
		try {
			customersRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
