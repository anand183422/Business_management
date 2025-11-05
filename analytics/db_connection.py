from sqlalchemy import create_engine

USER = "root"          # your MySQL username
PASSWORD = "Anand%40183"  # your MySQL password
HOST = "localhost"     # usually localhost
PORT = 3306            # default MySQL port
DB = "park"  # your database name

# ✅ Correct connection string
engine = create_engine(f"mysql+mysqlconnector://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}")
