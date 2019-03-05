package com.senier.ui.service.impl;

import com.senier.ui.common.CommonConstant;
import com.senier.ui.model.DataModel;
import com.senier.ui.persistence.MainMapper;
import com.senier.ui.service.MainService;

import java.text.SimpleDateFormat;
import java.util.Date;

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
            // 0: yyyy, 1: mm
            String[] yyyymm = new SimpleDateFormat("yyyy/MM").format(new Date()).split("/");
            String date;
            // 전달 1달간의 데이터를 얻기위해 연월날짜를 세팅한다
            if(Integer.parseInt(yyyymm[1]) <= 1) {
                date = String.valueOf(Integer.parseInt(yyyymm[0]) - 1) + "1201";
            } else {
                int exMon = Integer.parseInt(yyyymm[1]) - 1;
                String month = (exMon >= 10) ? String.valueOf(exMon) : "0" + String.valueOf(exMon);
                date = yyyymm[0] + month + "01";
            }
            params.putStrNull("date", date);

            // 유저의 권한을 체크한다.
            DataModel userAuth = mainMapper.getUserAuthentication(params);
            resultMap.putAll(mainMapper.getHomeDashboard(params));
        } catch(Exception e) {
            // logger.error("로그인 에러 발생 - {}" , e.getMessage());
            // resultMap.putStrNull("result", CommonConstant.FAIL);
        }

        return resultMap;
    }
}