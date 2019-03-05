package com.senier.ui.service.impl;

import com.senier.ui.common.CommonConstant;
import com.senier.ui.common.utils.TimeUtil;
import com.senier.ui.model.DataModel;
import com.senier.ui.persistence.MainMapper;
import com.senier.ui.service.MainService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("MainService")
public class MainServiceImpl implements MainService {

    private static final Logger logger = LoggerFactory.getLogger(MainServiceImpl.class);
    
    @Autowired
    private MainMapper mainMapper;
    
    @Override
    public DataModel getHomeDashboard(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            resultMap.putAll(mainMapper.getHomeDashboard(params));
        } catch(Exception e) {
            // logger.error("로그인 에러 발생 - {}" , e.getMessage());
            // resultMap.putStrNull("result", CommonConstant.FAIL);
        }

        return resultMap;
    }
}