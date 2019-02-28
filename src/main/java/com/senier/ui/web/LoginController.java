package com.senier.ui.web;

import javax.annotation.Resource;

import com.senier.ui.model.DataModel;
import com.senier.ui.service.LoginService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin("*")
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource(name = "LoginService")
    private LoginService loginService;

    @PostMapping("/loginProc")
    public DataModel loginProc(@RequestBody DataModel dm) {
        logger.info("loginProc Params - {}", dm);
        DataModel resultMap = loginService.loginProc(dm);
        logger.info("loginProc Result - {}", resultMap);

        return resultMap;
    }

}