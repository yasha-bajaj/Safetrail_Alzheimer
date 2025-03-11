from ultralytics import YOLO
import cv2

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Open video source (DroidCam index 1)
cap = cv2.VideoCapture(1)

selected_id = None  # Store the selected person ID
tracking_started = False  # Flag to track if selection is done
detected_people = []  # Store detected persons and their positions


def select_person(event, x, y, flags, param):
    """ Mouse callback function to select a person by clicking on them """
    global selected_id, tracking_started

    if event == cv2.EVENT_LBUTTONDOWN:
        for track_id, x1, y1, x2, y2 in detected_people:
            if x1 < x < x2 and y1 < y < y2:  # Check if click is inside a bounding box
                selected_id = track_id
                tracking_started = True
                print(f"Selected Person ID: {selected_id}")
                break


cv2.namedWindow("Tracking")
cv2.setMouseCallback("Tracking", select_person)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLOv8 tracking
    results = model.track(frame, persist=True)

    detected_people.clear()  # Reset detected list

    if results[0].boxes:
        for box in results[0].boxes:
            track_id = getattr(box, "id", None)  # Use 'id' instead of 'track_id'
            if track_id is not None:
                track_id = int(track_id)
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box
                detected_people.append((track_id, x1, y1, x2, y2))

                # Highlight all detected persons before selection
                color = (0, 0, 255)  # Red for unselected
                if selected_id is None:
                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                    cv2.putText(frame, f"ID: {track_id}", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

                # Once selected, track only that person
                if tracking_started and track_id == selected_id:
                    color = (0, 255, 0)  # Green for selected
                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                    cv2.putText(frame, f"Tracking ID: {track_id}", (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

    cv2.imshow("Tracking", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):  # Press 'q' to exit
        break

cap.release()
cv2.destroyAllWindows()