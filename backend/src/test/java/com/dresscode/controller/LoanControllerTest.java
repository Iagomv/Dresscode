// package com.dresscode.controller;

// import com.dresscode.constants.ApiRoutes;
// import com.dresscode.model.Loan;
// import com.dresscode.service.LoanService;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;

// import org.springframework.beans.factory.annotation.Autowired;
// import
// org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;

// import org.springframework.test.web.servlet.MockMvc;

// import java.util.Arrays;
// import java.util.List;
// import java.util.Optional;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.anyLong;
// import static org.mockito.ArgumentMatchers.eq;
// import static org.mockito.Mockito.*;
// import static
// org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static
// org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(LoanController.class)
// @AutoConfigureMockMvc(addFilters = false)
// public class LoanControllerTest {

// @Autowired
// private MockMvc mockMvc;

// @MockBean
// private LoanService loanService;

// private Loan mockLoan;

// @BeforeEach
// void setup() {
// mockLoan = new Loan();
// mockLoan.setId(1L);
// }

// @Test
// void testGetAllLoans() throws Exception {
// List<Loan> loans = Arrays.asList(mockLoan);
// when(loanService.getAllLoans()).thenReturn(loans);

// mockMvc.perform(get(ApiRoutes.LOANS + "/"))
// .andExpect(status().isOk())
// .andExpect(jsonPath("$[0].id").value(1L));
// }

// @Test
// void testGetLoanById_found() throws Exception {
// when(loanService.getLoanById(1L)).thenReturn(Optional.of(mockLoan));

// mockMvc.perform(get(ApiRoutes.LOANS + "/{id}", 1L))
// .andExpect(status().isOk())
// .andExpect(jsonPath("$.id").value(1L));
// }

// @Test
// void testGetLoanById_notFound() throws Exception {
// when(loanService.getLoanById(1L)).thenReturn(Optional.empty());

// mockMvc.perform(get(ApiRoutes.LOANS + "/{id}", 1L))
// .andExpect(status().isNotFound());
// }

// @Test
// void testCreateLoan() throws Exception {
// when(loanService.createLoan(any(Loan.class))).thenReturn(mockLoan);

// mockMvc.perform(post(ApiRoutes.LOANS + "/")
// .contentType(MediaType.APPLICATION_JSON)
// .content(new ObjectMapper().writeValueAsString(mockLoan)))
// .andExpect(status().isCreated())
// .andExpect(jsonPath("$.id").value(1L));
// }

// @Test
// void testUpdateLoan() throws Exception {
// Loan updatedLoan = new Loan();
// updatedLoan.setId(1L);

// when(loanService.updateLoan(eq(1L),
// any(Loan.class))).thenReturn(updatedLoan);

// mockMvc.perform(put(ApiRoutes.LOANS + "/{id}", 1L)
// .contentType(MediaType.APPLICATION_JSON)
// .content(new ObjectMapper().writeValueAsString(mockLoan)))
// .andExpect(status().isOk())
// .andExpect(jsonPath("$.id").value(1L));
// }

// @Test
// void testDeleteLoan() throws Exception {
// when(loanService.deleteLoan(mockLoan.getId())).thenReturn(mockLoan);

// mockMvc.perform(delete(ApiRoutes.LOANS + "/{id}", 1L)
// .contentType(MediaType.APPLICATION_JSON)
// .content(new ObjectMapper().writeValueAsString(mockLoan)))
// .andExpect(status().isOk())
// .andExpect(jsonPath("$.id").value(1L));
// }

// @Test
// void testDeleteLoan_NotFound() throws Exception {
// when(loanService.deleteLoan(mockLoan.getId())).thenReturn(null);

// mockMvc.perform(delete(ApiRoutes.LOANS + "/{id}", 2L))
// .andExpect(status().isNotFound());
// }

// @Test
// void testGetLoansByUserId() throws Exception {
// List<Loan> userLoans = Arrays.asList(mockLoan);
// when(loanService.getLoansByUserId(1L)).thenReturn(userLoans);

// mockMvc.perform(get(ApiRoutes.LOANS + "/user/{userId}", 1L))
// .andExpect(status().isOk())
// .andExpect(jsonPath("$[0].id").value(1L));
// }

// @Test
// void testGetLoansByUserId_NotFound() throws Exception {
// when(loanService.getLoansByUserId(anyLong())).thenReturn(List.of());

// mockMvc.perform(get(ApiRoutes.LOANS + "/user/{userId}", 1L))
// .andExpect(status().isNoContent());
// }
// }
