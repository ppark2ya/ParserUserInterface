package com.senier.ui.service;

import javax.servlet.http.HttpSession;

import com.senier.ui.model.DataModel;

public interface LoginService {
    public DataModel loginProc(DataModel dm, HttpSession session);
    public DataModel getUserInfo(DataModel dm);
    public DataModel updateUser(DataModel dm);
    public DataModel signUp(DataModel dm);
}