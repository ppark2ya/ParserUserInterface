package com.senier.ui.persistence;

import com.senier.ui.model.DataModel;

public interface MainMapper {
    public DataModel getUserAuthentication(DataModel params);
    public DataModel getHomeDashboard(DataModel params);
}