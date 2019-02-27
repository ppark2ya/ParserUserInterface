package com.senier.ui.web;

import com.senier.ui.model.DataModel;
import com.senier.ui.service.LoginService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/loginProc", method = RequestMethod.GET)
    public DataModel loginProc(@RequestBody DataModel dm) {
        logger.info("loginProc Params - {}", dm);
        DataModel resultMap = loginService.loginProc(dm);
        logger.info("loginProc Result - {}", resultMap);

        return resultMap;
    }

}