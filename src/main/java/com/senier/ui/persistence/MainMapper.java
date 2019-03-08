package com.senier.ui.persistence;

import java.util.List;

import com.senier.ui.model.DataModel;

public interface MainMapper {
    public DataModel getUserAuthentication(DataModel params);
    public List<DataModel> getHomeDashboard(DataModel params);
}