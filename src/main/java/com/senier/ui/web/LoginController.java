package com.senier.ui.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import com.senier.ui.model.DataModel;
import com.senier.ui.service.LoginService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins="*", allowCredentials="true", maxAge=3600)
@RestController
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource(name = "LoginService")
    private LoginService loginService;

    @PostMapping("/auth/loginProc")
    public DataModel loginProc(@RequestBody DataModel dm, HttpSession session) {
        logger.info("loginProc Params - {}", dm);
        DataModel resultMap = loginService.loginProc(dm, session);
        logger.info("loginProc Result - {}", resultMap);

        return resultMap;
    }
    
    @PostMapping("/auth/getUserInfo")
    public DataModel getUserInfo(@RequestBody DataModel dm) {
        logger.info("getUserInfo Params - {}", dm);
        DataModel resultMap = loginService.getUserInfo(dm);
        logger.info("getUserInfo Result - {}", resultMap);

        return resultMap;
    }

    @PostMapping("/auth/updateUser")
    public DataModel updateUser(@RequestBody DataModel dm) {
        logger.info("updateUser Params - {}", dm);
        DataModel resultMap = loginService.updateUser(dm);
        logger.info("updateUser Result - {}", resultMap);

        return resultMap;
    }

}