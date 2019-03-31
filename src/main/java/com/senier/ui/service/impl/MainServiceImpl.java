package com.senier.ui.service.impl;

import com.senier.ui.common.CommonConstant;
import com.senier.ui.model.DataModel;
import com.senier.ui.persistence.LoginMapper;
import com.senier.ui.persistence.MainMapper;
import com.senier.ui.service.MainService;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("MainService")
public class MainServiceImpl implements MainService {

    private static final Logger logger = LoggerFactory.getLogger(MainServiceImpl.class);

    @Autowired
    private MainMapper mainMapper;

    @Autowired
    private LoginMapper loginMapper;

    @Override
    public DataModel getHomeDashboard(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            // 유저의 권한을 체크한다.
            getUserAuth(params);

            Iterator<DataModel> cdataLst = mainMapper.getHomeDashboard(params).iterator();
            if (cdataLst.hasNext()) {
                List<DataModel> chartData = new ArrayList<>();
                DataModel renewData = new DataModel();
                DataModel serviceModel = new DataModel();

                int idx = 0;
                while (cdataLst.hasNext()) {
                    DataModel cdata = cdataLst.next();

                    if (idx % params.getInteger("monitorServicesLen") == 0) {
                        renewData.putStrNull("week", cdata.getStrNull("week") + "주차");
                    }

                    String serviceCd = cdata.getStrNull("serviceCd");
                    String serviceNm = serviceCd.equals(CommonConstant.ZABBIX_CODE) ? "ZABBIX"
                            : serviceCd.equals(CommonConstant.POSTMAN_CODE) ? "POSTMAN"
                                    : serviceCd.equals(CommonConstant.SEFILCARE_CODE) ? "SEFILCARE"
                                            : serviceCd.equals(CommonConstant.CHECKSERVER_CODE) ? "CHECKSERVER"
                                                    : "NOT EXIST";
                    serviceModel.put(serviceNm, cdata.get("cnt"));

                    if ((idx + 1) % params.getInteger("monitorServicesLen") == 0) {
                        renewData.put("data", serviceModel);
                        chartData.add(renewData);
                        renewData = new DataModel();
                        serviceModel = new DataModel();
                    }
                    idx++;
                }

                resultMap.put("chartData", chartData);
                resultMap.putStrNull("result", CommonConstant.SUCCESS);
            } else {
                logger.info("데이터 없음 !!");
                String message = "데이터가 없습니다.";
                resultMap.putStrNull("result", CommonConstant.FAIL);
                resultMap.putStrNull("message", message);
            }
            logger.info("HOME DASHBOARD 결과 - {}", resultMap);
        } catch (Exception e) {
            logger.error("HOME DASHBOARD 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }

        return resultMap;
    }

    @Override
    public DataModel getSynthesisGraph(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            // 유저의 권한을 체크한다.
            getUserAuth(params);
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
        } catch (Exception e) {
            logger.error("GRAPH MAIN 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }
        return resultMap;
    }

    @Override
    public DataModel getCheckServerGraph(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            // 유저의 권한을 체크한다.
            getUserAuth(params);
            if (params.getStrNull("CHECK_SERVER") == null) {
                String message = "해당 사용자는 권한이 없습니다.";
                logger.error("GRAPH CHECKSERVER - {}", message);
                resultMap.putStrNull("result", CommonConstant.FAIL);
                resultMap.putStrNull("message", message);
                return resultMap;
            }
            Iterator<DataModel> cdataLst = mainMapper.getCheckServerGraph(params).iterator();

            if (cdataLst.hasNext()) {
                DataModel chartData = new DataModel();

                while (cdataLst.hasNext()) {
                    DataModel cdata = cdataLst.next();
                    chartData.put(cdata.getStrNull("logType"), cdata.get("cnt"));
                }

                resultMap.put("chartData", chartData);
                resultMap.putStrNull("result", CommonConstant.SUCCESS);
            } else {
                logger.info("데이터 없음 !!");
                String message = "데이터가 없습니다.";
                resultMap.putStrNull("result", CommonConstant.FAIL);
                resultMap.putStrNull("message", message);
            }
        } catch (Exception e) {
            logger.error("GRAPH CHECKSERVER 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }
        return resultMap;
    }

    @Override
    public DataModel getSefilCareGraph(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            // 유저의 권한을 체크한다.
            getUserAuth(params);
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
            List<DataModel> result = mainMapper.SefilCareGraph();
            resultMap.put("chartData", result);
            logger.info("SefilCareGraph end - {}", resultMap);
        } catch (Exception e) {
            logger.error("GRAPH SEFILCARE 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }
        return resultMap;
    }

    @Override
    public DataModel getZabbixGraph(DataModel params) {
        DataModel resultMap = new DataModel();
        logger.info("getZabbixGraph start - {}", params);
        try {
            // 유저의 권한을 체크한다.
            // getUserAuth(params);
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
            List<DataModel> result = mainMapper.zabbixGraph();
            resultMap.put("chartData", result);
            logger.info("getZabbixGraph end - {}", resultMap);
        } catch (Exception e) {
            logger.error("GRAPH SEFILCARE 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }
        return resultMap;
    }

    // 유저 권한 및 날짜 데이터 세팅
    public void getUserAuth(DataModel params) {
        // 0: yyyy, 1: mm
        String[] yyyymm = new SimpleDateFormat("yyyy/MM").format(new Date()).split("/");
        String date;
        // 전달 1달간의 데이터를 얻기위해 연월날짜를 세팅한다
        if (Integer.parseInt(yyyymm[1]) <= 1) {
            date = String.valueOf(Integer.parseInt(yyyymm[0]) - 1) + "1201";
        } else {
            int exMon = Integer.parseInt(yyyymm[1]) - 1;
            String month = (exMon >= 10) ? String.valueOf(exMon) : "0" + String.valueOf(exMon);
            date = yyyymm[0] + month + "01";
        }
        params.putStrNull("date", date);
        // 유저의 권한을 체크한다.
        DataModel userAuth = mainMapper.getUserAuthentication(params);

        String[] monitorServices = userAuth.getStrNull("description").replaceAll("(ADMIN/|GUEST/)", "").split("/");
        int monitorServicesLen = monitorServices.length;
        params.put("monitorServicesLen", monitorServicesLen);

        for (String serviceNm : monitorServices) {
            if (serviceNm.equals("ZABBIX")) {
                params.putStrNull(serviceNm, CommonConstant.ZABBIX_CODE);
            } else if (serviceNm.equals("POSTMAN")) {
                params.putStrNull(serviceNm, CommonConstant.POSTMAN_CODE);
            } else if (serviceNm.equals("SEFILCARE")) {
                params.putStrNull(serviceNm, CommonConstant.SEFILCARE_CODE);
            } else if (serviceNm.equals("CHECK_SERVER")) {
                params.putStrNull(serviceNm, CommonConstant.CHECKSERVER_CODE);
            }
        }
    }

    @Override
    public DataModel getLogStats(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            // 유저의 권한을 체크한다.
            getUserAuth(params);
            resultMap.putAll(params);
            List<DataModel> rsltList = mainMapper.getLogStats(params);
            resultMap.put("logList", rsltList);
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
        } catch (Exception e) {
            logger.error("GRAPH ZABBIX 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }

        return resultMap;
    }

    @Override
    public DataModel getServiceList(DataModel params) {
        DataModel resultMap = new DataModel();
        try {
            // 유저의 권한을 체크한다.
            getUserAuth(params);
            resultMap.putStrNull("result", CommonConstant.SUCCESS);
            resultMap.putAll(params);
        } catch (Exception e) {
            logger.error("GET SERVICELIST 에러 발생 - {}", e.getMessage());
            String message = "관리자에게 문의하세요.";
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }
        return resultMap;
    }

    @Override
    @Transactional
    public DataModel authUpdate(DataModel params) {
        // authUpdate Params : {uid=admin, zabbix=false, checkserver=false,
        // postman=true, auth=31, sefilcare=true}
        DataModel resultMap = new DataModel();
        String message = "관리자에게 문의하세요.";
        StringBuilder authStr = new StringBuilder();
        try {
            // GUEST or ADMIN
            String isAdmin = mainMapper.getUserAuthentication(params).getStrNull("description").split("/")[0];
            authStr.append(isAdmin + "/");

            if (params.getBoolean("zabbix")) {
                authStr.append("ZABBIX" + "/");
            }
            if (params.getBoolean("postman")) {
                authStr.append("POSTMAN" + "/");
            }
            if (params.getBoolean("sefilcare")) {
                authStr.append("SEFILCARE" + "/");
            }
            if (params.getBoolean("checkserver")) {
                authStr.append("CHECK_SERVER" + "/");
            }
            int len = authStr.length();
            authStr = authStr.replace(len - 1, len, "");
            params.putStrNull("authStr", authStr.toString());
            int cnt = mainMapper.authUpdate(params);

            if (cnt > 0) {
                params.putAll(loginMapper.getUserInfo(params));
                // 유저의 권한을 체크한다.
                getUserAuth(params);
                resultMap.putStrNull("result", CommonConstant.SUCCESS);
                resultMap.putAll(params);
            } else {
                logger.error("AUTH UPDATE 에러 발생 - {}");
                resultMap.putStrNull("result", CommonConstant.FAIL);
                resultMap.putStrNull("message", message);
            }
        } catch (Exception e) {
            logger.error("AUTH UPDATE 에러 발생 - {}", e.getMessage());
            resultMap.putStrNull("result", CommonConstant.FAIL);
            resultMap.putStrNull("message", message);
        }
        return resultMap;
    }

}