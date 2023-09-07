package com.windsor.cyanraft.dto;

import lombok.Data;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class CreateOrderRequest {

    @Valid
    @NotEmpty
    private List<BuyItem> buyItemList;
}
