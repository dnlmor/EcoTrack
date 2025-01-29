import subprocess
import psutil
import time

def is_service_running(port: int) -> bool:
    """Check if a service is running on a given port."""
    for conn in psutil.net_connections(kind='inet'):
        if conn.laddr.port == port:
            return True
    return False

def start_service(command: str) -> subprocess.Popen:
    """Start a service using subprocess."""
    print(f"Starting service: {command}")
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(2)  # Adding a delay to ensure the service starts properly
    return process

def stop_service(process: subprocess.Popen):
    """Stop a running service."""
    if process:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
