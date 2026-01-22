import sys
import json
import subprocess

if len(sys.argv) < 2:
    print("Please provide backup folder path")
    sys.exit(1)

backup_path = sys.argv[1]

# Get the directory of the current script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(SCRIPT_DIR, "config.json")

if not os.path.exists(CONFIG_PATH):
    print(f"Error: {CONFIG_PATH} not found.")
    sys.exit(1)

with open(CONFIG_PATH) as f:
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