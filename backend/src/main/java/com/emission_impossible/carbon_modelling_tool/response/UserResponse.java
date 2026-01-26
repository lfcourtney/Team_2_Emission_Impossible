package com.emission_impossible.carbon_modelling_tool.response;

/**
 * HTTP response entity object
 *
 * Used to securely return the information of the currently logged in user:
 * does not include the user password.
 */

public class UserResponse {

    private String fullName;
    private String email;

    public UserResponse() {}

    public UserResponse(String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
