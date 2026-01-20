import sys
import json
import subprocess

if len(sys.argv) < 2:
    print("Please provide backup folder path")
    sys.exit(1)

backup_path = sys.argv[1]

with open("config.json") as f:
    config = json.load(f)

db = config["mongodb"]

command = [
    "mongorestore",
    "--host", db["host"],
    "--port", str(db["port"]),
    "--username", db["username"],
    "--password", db["password"],
    "--db", db["database"],
    "--drop",
    backup_path
]

subprocess.run(command, check=True)

print("Restore completed")

#python restore.py backups/backup_2026-01-20_10-00-00