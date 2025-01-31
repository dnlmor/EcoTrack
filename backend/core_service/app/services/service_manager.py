# app/services/service_manager.py
import subprocess
from pathlib import Path
import os
import logging
import time
import requests
from typing import Dict, Optional

logger = logging.getLogger(__name__)

class ServiceManager:
    def __init__(self):
        self.processes: Dict[str, subprocess.Popen] = {}
        self.service_paths = {
            "auth": "../auth_service",
            "carbon": "../carbon_tracking_service",
            "game": "../game_service"
        }
        self.service_ports = {
            "auth": 8001,
            "carbon": 8002,
            "game": 8003
        }

    def start_service(self, service_name: str) -> Optional[subprocess.Popen]:
        """Start a single service and verify it's running."""
        if service_name in self.processes and self.processes[service_name].poll() is None:
            logger.info(f"{service_name} service is already running")
            return self.processes[service_name]

        service_path = self.service_paths.get(service_name)
        if not service_path:
            logger.error(f"No path configured for service: {service_name}")
            return None

        abs_path = Path(service_path).resolve()
        if not abs_path.exists():
            logger.error(f"Service path does not exist: {abs_path}")
            return None

        port = self.service_ports.get(service_name)
        if not port:
            logger.error(f"No port configured for service: {service_name}")
            return None

        try:
            logger.info(f"Starting {service_name} service on port {port}")
            process = subprocess.Popen(
                ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", str(port)],
                cwd=str(abs_path),
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            # Wait for service to start
            max_attempts = 5
            for attempt in range(max_attempts):
                if process.poll() is not None:
                    stderr = process.stderr.read().decode() if process.stderr else "No error output"
                    logger.error(f"{service_name} service failed to start: {stderr}")
                    return None
                
                try:
                    response = requests.get(f"http://localhost:{port}/health")
                    if response.status_code == 200:
                        logger.info(f"{service_name} service started successfully")
                        self.processes[service_name] = process
                        return process
                except requests.RequestException:
                    if attempt < max_attempts - 1:
                        time.sleep(2)
                        continue
                    logger.error(f"Failed to verify {service_name} service is running after {max_attempts} attempts")
                    process.terminate()
                    return None

        except Exception as e:
            logger.error(f"Error starting {service_name} service: {str(e)}")
            return None

    def start_all_services(self) -> bool:
        """Start all configured services."""
        success = True
        for service_name in self.service_paths.keys():
            if not self.start_service(service_name):
                success = False
        return success

    def stop_service(self, service_name: str) -> bool:
        """Stop a single service."""
        if service_name in self.processes:
            try:
                self.processes[service_name].terminate()
                self.processes[service_name].wait(timeout=5)
                del self.processes[service_name]
                logger.info(f"Stopped {service_name} service")
                return True
            except Exception as e:
                logger.error(f"Error stopping {service_name} service: {str(e)}")
        return False

    def stop_all_services(self):
        """Stop all running services."""
        for service_name in list(self.processes.keys()):
            self.stop_service(service_name)

service_manager = ServiceManager()