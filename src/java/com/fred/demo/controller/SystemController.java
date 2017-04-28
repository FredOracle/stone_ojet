/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fred.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 */
@Controller
public class SystemController {

    @RequestMapping("index")
    public String index() {
        System.out.println("======================");
        return "index";
    }

    @RequestMapping("welcome")
    public String welcome() {
        System.out.println("========aaaa==============");
        return "welcome";
    }
}
