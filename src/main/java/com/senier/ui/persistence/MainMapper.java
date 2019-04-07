package com.senier.ui.persistence;

import java.util.List;

import com.senier.ui.model.DataModel;

public interface MainMapper {
    // 유저 권한 취득
    public DataModel getUserAuthentication(DataModel params);
    // Home Dashboard 차트 데이터
    public List<DataModel> getHomeDashboard(DataModel params);
    // Graph > CheckServer 차트 데이터
    public List<DataModel> getCheckServerGraph(DataModel params);
    // 권한에 따른 로그 데이터
    public List<DataModel> getLogStats(DataModel params);
    // 권한 수정
    public int authUpdate(DataModel params);
    // 이메일 주소 삭제
    public int deleteEmailAddr(DataModel params);
    // 이메일 주소 추가
    public int addEmailAddr(DataModel params);
    // 전화번호 삭제
    public int deleteTelNum(DataModel params);
    // 전화번호 추가
    public int addTelNum(DataModel params);
    public List<DataModel> getCriticalServerCount(DataModel params);
    // Graph > Sefilcare 차트 데이터
    public List<DataModel> SefilCareGraph();
    // Graph > Zabbix 차트 데이터
    public List<DataModel> zabbixGraph();
    
    public List<DataModel> zabbixGraphStaus_nm();
    // Setting > Keyword 데이터
    public List<DataModel> getKeywordList(DataModel params);
    // 키워드 사용 상태 변경
    public int toggleUsage(DataModel params);
    // 변경된 키워드 정보
    public List<DataModel> getKeywordInfo(DataModel params);
}