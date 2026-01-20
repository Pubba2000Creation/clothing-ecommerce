import os
import json
import datetime
import subprocess

CONFIG_PATH = "config.json"

with open(CONFIG_PATH) as f:
    config = json.load(f)

backup_dir = config["backup"]["backup_path"]
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
