# SafeTrail 🚶‍♂️🤖
![Safetrail](https://github.com/user-attachments/assets/3c4bf708-e833-4afd-8fe7-18e707c1a589)


### Overview
SafeTrail is an AI-powered robotic companion designed to **follow a person** without using GPS. It uses **computer vision (YOLOv8, OpenCV)** for real-time tracking and can send alerts if the tracked person moves beyond a predefined area.

### Features 🚀
- **AI-Powered Tracking**: Uses **YOLOv8 & OpenCV** for real-time person tracking.
- **SOS Alerts**: Emergency notification system for caregivers.
- **Geo-Fencing Without GPS**: Detects movement beyond predefined areas and triggers alerts.
- **Simulation Support**: The tracking mechanism is demonstrated in a simulation.
- **Web Portal**: Displays the live tracking status and emergency controls.

### App working Screenshots
![WhatsApp Image 2025-03-11 at 19 53 43_01bff8f2](https://github.com/user-attachments/assets/9eb376c0-e502-4fd8-b366-b762d9dc9117)
![WhatsApp Image 2025-03-11 at 19 53 44_ec9b139d](https://github.com/user-attachments/assets/a1148152-cf13-41af-adcd-31ce3405dce0)
![WhatsApp Image 2025-03-11 at 19 53 43_bb84e0f9](https://github.com/user-attachments/assets/a8c56476-fdda-47ea-8a59-bf01c80e5741)
![WhatsApp Image 2025-03-11 at 19 53 43_559707ef](https://github.com/user-attachments/assets/60e735e4-dd57-462d-b402-5d282014b413)


### How It Works ⚙️
1. **Tracking**: The robot identifies and follows the target using OpenCV and YOLOv8.
2. **Alerts**: If the person moves out of the defined safe zone, an alert is triggered.
3. **User Dashboard**: Provides a map (if GPS is integrated), real-time tracking logs, and emergency contacts.

### Tech Stack 🛠️
- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **AI & CV**: OpenCV, YOLOv8
- **Hardware**: Arduino Uno (future integration)

### Working SolidWorks Simulation
https://github.com/user-attachments/assets/ad25014f-5b3b-4d51-801b-9df738a0df34



### Installation & Setup 🏗️
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SafeTrail.git
   cd SafeTrail
   ```
2. Install dependencies:
   ```bash
   npm install  # For the web portal
   ```
3. Run the project:
   ```bash
   npm start
   ```

### Future Enhancements 🌟
- Hardware integration with Arduino & motors.
- Edge AI for on-device tracking.
- Cloud-based monitoring system.

---
🔗 **Contribute & Support**: Feel free to contribute or report issues!
