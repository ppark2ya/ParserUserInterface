package com.senier.ui.service.impl;

import javax.servlet.http.HttpSession;

import com.senier.ui.common.CommonConstant;
import com.senier.ui.common.utils.TimeUtil;
import com.senier.ui.model.DataModel;
import com.senier.ui.persistence.LoginMapper;
import com.senier.ui.service.LoginService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("LoginService")
public class LoginServiceImpl implements LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
    
    @Autowired
    private LoginMapper loginMapper;
    
    @Override
    public DataModel loginProc(DataModel dm, HttpSession session) {
        DataModel resultMap = new DataModel();
        try {
            // 아이디, 패스워드 확인
            int cnt = loginMapper.loginProc(dm);
    
            // 아이디, 패스워드 일치
            if(cnt > 0) {
                // 유저 정보 확인
                DataModel userInfo = loginMapper.getUserInfo(dm);
                // 사용 중인 계정일 때
                if(userInfo.getStrNull("useCl").equals("1")) {
                    logger.info("{}({}) - 로그인 성공", userInfo.getStrNull("uid"), userInfo.getStrNull("auth"));
                    resultMap.putStrNull("result", CommonConstant.SUCCESS);
                    // 화면에서 권한 체크에 필요한 데이터 저장
                    resultMap.putStrNull("uid", userInfo.getStrNull("uid"));
                    resultMap.putStrNull("auth", userInfo.getStrNull("auth"));
                    resultMap.putStrNull("expired", TimeUtil.currentTime());
                    // 세션에 유저정보 저장
                    session.setAttribute("auth", userInfo);
                    // 세션 유지시간 20분
                    session.setMaxInactiveInterval(60*20);
                } else {
                    // 미사용 계정일 때
                    resultMap.putStrNull("result", CommonConstant.FAIL);
                }
            } else {
                resultMap.putStrNull("result", CommonConstant.FAIL);
            }
    

        } catch(Exception e) {
            logger.error("로그인 에러 발생 - {}" , e.getMessage());
            resultMap.putStrNull("result", CommonConstant.FAIL);
        }

        return resultMap;
    }

    @Override
    public DataModel getUserInfo(DataModel dm) {
        DataModel resultMap = new DataModel();

        try {
            DataModel userInfo = loginMapper.getUserInfo(dm);
            resultMap.putAll(userInfo);
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
        } catch(Exception e) {
            logger.error("유저 정보 조회 에러 발생 - {}" , e.getMessage());
            resultMap.putStrNull("result", CommonConstant.FAIL);
        }
        return resultMap;
    }

    @Override
    public DataModel updateUser(DataModel dm) {
        DataModel resultMap = new DataModel(); 
        try {
            int cnt = loginMapper.updateUser(dm);

            if(cnt > 0) {
                DataModel userInfo = loginMapper.getUserInfo(dm);
                resultMap.putAll(userInfo);
                resultMap.putStrNull("result", CommonConstant.SUCCESS);
            } else {
                resultMap.putStrNull("result", CommonConstant.FAIL);
            }
        } catch(Exception e) {
            logger.error("사용자 정보 수정 에러 발생 - {}" , e.getMessage());
            resultMap.putStrNull("result", CommonConstant.FAIL);
        }
        return resultMap;
    }

    @Override
    public DataModel signUp(DataModel dm) {
        DataModel resultMap = new DataModel(); 
        try {
            int cnt = loginMapper.signUp(dm);

            if(cnt > 0) {
                resultMap.putStrNull("result", CommonConstant.SUCCESS);
            } else {
                resultMap.putStrNull("result", CommonConstant.FAIL);
            }
        } catch(Exception e) {
            logger.error("회원가입 에러 발생 - {}" , e.getMessage());
            resultMap.putStrNull("result", CommonConstant.FAIL);
        }
        return resultMap;
    }
}