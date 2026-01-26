package com.emission_impossible.carbon_modelling_tool.SecurityConfig;

/**
 * Holds environment secret variables for JWT.
 *
 * These environment variables are necessary in that
 * they determine the final jsonWebToken value
 */
public class JwtConstant {
    public static final String SECRET_KEY = "wpembytrwcvnryxksdbqwjebruyGHyudqgwveytrtrCSnwifoesarjbwe";
    public static final String JWT_HEADER = "Authorization";
}
