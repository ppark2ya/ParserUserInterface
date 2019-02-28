package com.senier.ui.service.impl;

import com.senier.ui.common.CommonConstant;
import com.senier.ui.model.DataModel;
import com.senier.ui.persistence.LoginMapper;
import com.senier.ui.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("LoginService")
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;
    
    @Override
    public DataModel loginProc(DataModel dm) {
        int cnt = loginMapper.loginProc(dm);
        DataModel resultMap = new DataModel();
        if(cnt > 0) {
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
        } else {
            resultMap.putStrNull("result", CommonConstant.FAIL);
        }
        return resultMap;
    }
}