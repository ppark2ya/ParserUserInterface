package com.senier.ui.service;

import com.senier.ui.model.DataModel;

public interface MainService {
    public DataModel getHomeDashboard(DataModel params);
    public DataModel getSynthesisGraph(DataModel params);
    public DataModel getCheckServerGraph(DataModel params);
    public DataModel getSefilCareGraph(DataModel params);
    public DataModel getZabbixGraph(DataModel params);
    public DataModel getLogStats(DataModel params);
    public DataModel getServiceList(DataModel params);
    public DataModel authUpdate(DataModel params);
}