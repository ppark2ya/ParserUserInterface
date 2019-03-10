package com.senier.ui.web;

import javax.annotation.Resource;

import com.senier.ui.model.DataModel;
import com.senier.ui.service.MainService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

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
     * @return DataModel : 한 달간 각 서비스별 메시지 발신 횟수
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
     * @return DataModel : 한 달간 각 서비스별 메시지 발신 횟수
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
     * @return DataModel : 한 달간 각 서비스별 메시지 발신 횟수
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
     * @return DataModel : 한 달간 각 서비스별 메시지 발신 횟수
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


}