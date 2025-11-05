package com.example.PackageManager.dto;

public class DashboardResponse {
    private long admins;
    private long businesses;
    private long users;
    private double revenue;

    public DashboardResponse(long admins, long businesses, long users, double revenue) {
        this.admins = admins;
        this.businesses = businesses;
        this.users = users;
        this.revenue = revenue;
    }

    // Getters and setters
    public long getAdmins() { return admins; }
    public void setAdmins(long admins) { this.admins = admins; }

    public long getBusinesses() { return businesses; }
    public void setBusinesses(long businesses) { this.businesses = businesses; }

    public long getUsers() { return users; }
    public void setUsers(long users) { this.users = users; }

    public double getRevenue() { return revenue; }
    public void setRevenue(double revenue) { this.revenue = revenue; }
}
