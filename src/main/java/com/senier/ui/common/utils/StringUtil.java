package com.senier.ui.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {

    /**
     * 패턴 매칭 함수
     * @param message
     * @param regex
     * @return
     * @throws Exception
     */
    public static String findSpecificWord(String message, String regex) throws Exception {
        String findStr = "";

        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(message);

        while(m.find()) {
            String matchStr = m.group().trim();
            if(matchStr != null && !matchStr.equals("")) {
                findStr = matchStr;
                break;
            }
        }

        return findStr;
    }

    /**
     * nvl 처리 함수
     * @param param
     * @return
     */
    public static String nvl(String param, String value) {
        if(param == null || param.equals("")) {
            return value;
        } else {
            return param;
        }
    }
}