from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from analytics import monthly_revenue, package_analytics, last_7_days_revenue,product_interest_analysis
from analytics import business_wise_revenue_last_30_days
from flask import jsonify
app = FastAPI()

# Allow React frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analytics/monthly")
def get_monthly():
    return monthly_revenue()

@app.get("/analytics/packages")
def get_packages():
    return package_analytics()
@app.get("/analytics/last7days")
def get_last_7_days():
    return last_7_days_revenue()


@app.get("/analytics/products")
def get_products_interest():
    return product_interest_analysis()

@app.get("/api/analytics/business-revenue")
def get_business_revenue():
    return business_wise_revenue_last_30_days()