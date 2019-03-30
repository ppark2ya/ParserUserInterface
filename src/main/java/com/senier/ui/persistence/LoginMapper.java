package com.senier.ui.persistence;

import com.senier.ui.model.DataModel;

public interface LoginMapper {
    public int loginProc(DataModel dm);
    public DataModel getUserInfo(DataModel dm);
    public int updateUser(DataModel dm);
}