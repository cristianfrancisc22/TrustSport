package com.banz.trustsport.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class RequestDTO {
    private String name;
    private String email;
    private String duration;
    private String priceId;
}
