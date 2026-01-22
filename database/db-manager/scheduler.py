import schedule
import time
import subprocess

def run_backup():
    subprocess.run(["python", "backup.py"])

schedule.every().day.at("02:00").do(run_backup)

print("Backup scheduler started...")

while True:
    schedule.run_pending()
    time.sleep(60)
