package com.senier.ui.web;

import javax.annotation.Resource;

import com.senier.ui.model.DataModel;
import com.senier.ui.service.MainService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="*", allowCredentials="true", maxAge=3600)
@RestController
public class MainController {

    private static final Logger logger = LoggerFactory.getLogger(MainController.class);

    @Resource(name="MainService")
    private MainService mainService;

    /**
     * HOME 탭 대시보드 차트 데이터 요청
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 한 달간 각 서비스별 메시지 발신 횟수
     */
    @GetMapping("/home/dashboard")
    public DataModel getHomeDashboard(
        @RequestParam(name="uid", required=true) String uid, 
        @RequestParam(name="auth", required=true) String auth
    ) {
        DataModel params = new DataModel();
        params.putStrNull("uid", uid);
        params.putStrNull("auth", auth);
        return mainService.getHomeDashboard(params);
    }

    /**
     * GRAPH 탭 MAIN 차트 데이터 요청
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 일별/주간별/월별 + 서비스별 CRITICAL 발생 빈도수, 하룻동안의 LOG_PRIORITY 상태 표시 ( CRITICAL, NORMAL )
     */
    @GetMapping("/graph/synthesis")
    public DataModel getSynthesisGraph(
        @RequestParam(name="uid", required=true) String uid, 
        @RequestParam(name="auth", required=true) String auth
    ) {
        DataModel params = new DataModel();
        params.putStrNull("uid", uid);
        params.putStrNull("auth", auth);
        return mainService.getSynthesisGraph(params);
    }

    /**
     * GRAPH 탭 체크서버 차트 데이터 요청
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 체크서버 전체 CRITICAL 상태 HTTP CODE
     */
    @GetMapping("/graph/checkserver")
    public DataModel getCheckServerGraph(
        @RequestParam(name="uid", required=true) String uid, 
        @RequestParam(name="auth", required=true) String auth
    ) {
        DataModel params = new DataModel();
        params.putStrNull("uid", uid);
        params.putStrNull("auth", auth);
        return mainService.getCheckServerGraph(params);
    }

    /**
     * GRAPH 탭 SefilCare 차트 데이터 요청
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 
     */
    @GetMapping("/graph/sefilcare")
    public DataModel getSefilCareGraph(
        @RequestParam(name="uid", required=true) String uid, 
        @RequestParam(name="auth", required=true) String auth
    ) {
        DataModel params = new DataModel();
        params.putStrNull("uid", uid);
        params.putStrNull("auth", auth);
        return mainService.getSefilCareGraph(params);
    }

    /**
     * GRAPH 탭 ZABBIX 차트 데이터 요청
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 
     */
    @GetMapping("/graph/zabbix")
    public DataModel getZabbixGraph(
        @RequestParam(name="uid", required=true) String uid, 
        @RequestParam(name="auth", required=true) String auth
    ) {
        DataModel params = new DataModel();
        params.putStrNull("uid", uid);
        params.putStrNull("auth", auth);
        return mainService.getZabbixGraph(params);
    }

    /**
     * Statistics 탭 Log 데이터 요청
     * @param params : serviceCd, status, startDt, endDt
     * @return List<DataModel> : 조회옵션에 따른 로그데이터 출력
     */
    @PostMapping("/stats/log")
    public DataModel getLogStats(@RequestBody DataModel params) {
        return mainService.getLogStats(params);
    }

    /**
     * SERVICE LIST 조회
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 사용자가 관제 중인 service 목록
     */
    @GetMapping("/api/serviceList")
    public DataModel getServiceList(
        @RequestParam(name="uid", required=true) String uid, 
        @RequestParam(name="auth", required=true) String auth
    ) {
        DataModel params = new DataModel();
        params.putStrNull("uid", uid);
        params.putStrNull("auth", auth);
        return mainService.getServiceList(params);
    }

    /**
     * SERVICE LIST 조회
     * @param uid : 로그인 유저 아이디
     * @param auth : 권한 코드값
     * @return DataModel : 사용자가 관제 중인 service 목록
     */
    @PatchMapping("/api/authUpdate")
    public DataModel authUpdate(@RequestBody DataModel params) {
        logger.info("authUpdate Params : {}", params);
        return mainService.authUpdate(params);
    }

    @GetMapping("/api/getCriticalServerData")
    public DataModel getCriticalServerData(){
        DataModel resultMap = new DataModel();
        DataModel param = new DataModel();
        resultMap.putAll(mainService.getCriticalServerCount(param));
        return resultMap;
    }
}