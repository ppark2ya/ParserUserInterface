package com.senier.ui.persistence;

import java.util.List;

import com.senier.ui.model.DataModel;

public interface MainMapper {
    public DataModel getUserAuthentication(DataModel params);

    public List<DataModel> getHomeDashboard(DataModel params);

    public List<DataModel> getSynthesisGraph(DataModel params);

    public List<DataModel> getCheckServerGraph(DataModel params);

    public List<DataModel> getSefilCareGraph(DataModel params);

    public List<DataModel> getZabbixGraph(DataModel params);

    public List<DataModel> getLogStats(DataModel params);

    public int authUpdate(DataModel params);
    public int deleteEmailAddr(DataModel params);
    public int addEmailAddr(DataModel params);
    public int deleteTelNum(DataModel params);
    public int addTelNum(DataModel params);
    public List<DataModel> getCriticalServerCount(DataModel params);

    public List<DataModel> SefilCareGraph();

    public List<DataModel> zabbixGraph();
}