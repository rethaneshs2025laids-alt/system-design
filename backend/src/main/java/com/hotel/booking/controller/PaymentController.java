package com.hotel.booking.controller;

import com.hotel.booking.dto.PaymentDTO;
import com.hotel.booking.dto.PaymentRequest;
import com.hotel.booking.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Mock payment processing")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/mock")
    @Operation(summary = "Process mock payment for a booking")
    public ResponseEntity<PaymentDTO> processPayment(@Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.ok(paymentService.processPayment(request));
    }
}
