package br.edu.fbuni.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.fbuni.model.Customers;

public interface CustomersRepository extends JpaRepository<Customers, Long> {
  List<Customers> findCustomerByName(String name);
}
