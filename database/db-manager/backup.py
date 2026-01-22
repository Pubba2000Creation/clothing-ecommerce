import os
import json
import datetime
import subprocess

# Get the directory of the current script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(SCRIPT_DIR, "config.json")

if not os.path.exists(CONFIG_PATH):
    print(f"Error: {CONFIG_PATH} not found.")
    sys.exit(1)

with open(CONFIG_PATH) as f:
    config = json.load(f)

# Use absolute path for backup directory if it's relative
backup_dir = config["backup"]["backup_path"]
if not os.path.isabs(backup_dir):
    backup_dir = os.path.join(SCRIPT_DIR, backup_dir)

db = config["mongodb"]

os.makedirs(backup_dir, exist_ok=True)

timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
backup_path = f"{backup_dir}/backup_{timestamp}"

command = [
    "mongodump",
    "--host", db["host"],
    "--port", str(db["port"]),
    "--username", db["username"],
    "--password", db["password"],
    "--db", db["database"],
    "--out", backup_path
]

subprocess.run(command, check=True)

print(f"Backup completed: {backup_path}")
