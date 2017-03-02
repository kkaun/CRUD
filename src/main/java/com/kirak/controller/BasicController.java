package com.kirak.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created by Kir on 28.02.2017.
 */

//Basic Controller for single-page REST App with annotation, no-xml mapping
@Controller
@RequestMapping("/*")
public class BasicController {
    @RequestMapping(method = RequestMethod.GET)
    public String viewApplication() {
        return "oppage";
    }
}
