import pandas as pd
from db_connection import engine

def get_bookings_df():
    query = """
    SELECT id, package_id, total_amount, created_at 
    FROM bookings 
    WHERE status='CONFIRMED'
    """
    df = pd.read_sql(query, engine)
    return df

# Monthly Revenue
def monthly_revenue():
    df = get_bookings_df()
    df['created_at'] = pd.to_datetime(df['created_at'])
    df['month'] = df['created_at'].dt.to_period('M').astype(str)  # <-- convert to string
    revenue = df.groupby('month')['total_amount'].sum().reset_index()
    return revenue.to_dict(orient="records")

# Last 7 Days Revenue
def last_7_days_revenue():
    df = get_bookings_df()
    df['created_at'] = pd.to_datetime(df['created_at'])
    last_7_days = pd.Timestamp.now() - pd.Timedelta(days=7)
    df = df[df['created_at'] >= last_7_days]
    df['date'] = df['created_at'].dt.strftime("%Y-%m-%d")  # <-- convert to string
    revenue = df.groupby('date')['total_amount'].sum().reset_index()
    return revenue.to_dict(orient="records")

# Package-wise Bookings
def package_analytics():
    df = get_bookings_df()
    package_counts = df.groupby('package_id')['id'].count().reset_index(name='bookings')
    return package_counts.to_dict(orient="records")

def product_interest_analysis():
    query = """
    SELECT 
        p.id AS product_id,
        p.name AS product_name,
        COUNT(*) AS booking_count
    FROM bookings b
    JOIN package_features pf ON b.package_id = pf.package_id
    JOIN products p ON pf.product_id = p.id
    WHERE b.status = 'CONFIRMED'
    GROUP BY p.id, p.name
    ORDER BY booking_count DESC
    """
    df = pd.read_sql(query, engine)
    return df.to_dict(orient="records")
def get_businesses_df():
    query = "SELECT id AS business_id, name AS business_name FROM businesses"
    return pd.read_sql(query, engine)

def get_payments_df():
    query = """
    SELECT 
        p.business_id, 
        p.amount, 
        p.status, 
        p.payment_date
    FROM payments p
    """
    return pd.read_sql(query, engine)


def business_wise_revenue_last_30_days():
    businesses_df = get_businesses_df()
    payments_df = get_payments_df()

    # Convert dates
    payments_df["payment_date"] = pd.to_datetime(payments_df["payment_date"], errors="coerce")

    # Filter last 30 days and successful payments
    cutoff_date = pd.Timestamp.now() - pd.Timedelta(days=30)
    filtered = payments_df[
        (payments_df["status"] == "SUCCESS") & 
        (payments_df["payment_date"] >= cutoff_date)
    ]

    # Group by business and sum
    revenue_df = (
        filtered.groupby("business_id", as_index=False)["amount"]
        .sum()
        .rename(columns={"amount": "total_revenue"})
    )

    # Merge all businesses (left join ensures all are included)
    merged = pd.merge(businesses_df, revenue_df, on="business_id", how="left")

    # Fill missing revenues with 0
    merged["total_revenue"] = merged["total_revenue"].fillna(0)

    # Sort descending by revenue
    merged = merged.sort_values(by="total_revenue", ascending=False)

    return merged.to_dict(orient="records")
