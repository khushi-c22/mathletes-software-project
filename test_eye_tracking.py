import unittest
import cv2
import mediapipe as mp
import numpy as np


class TestEyeTrackingSetup(unittest.TestCase):
    """Test suite for Sprint 2 - Webcam & MediaPipe Setup"""

    def setUp(self):
        """Initialize MediaPipe FaceMesh and webcam before each test."""
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.cap = cv2.VideoCapture(0)

    def tearDown(self):
        """Release resources after each test."""
        self.face_mesh.close()
        self.cap.release()
        cv2.destroyAllWindows()

    # -------------------------
    # Test 1: Webcam opens
    # -------------------------
    def test_webcam_opens(self):
        """Webcam should open successfully."""
        self.assertTrue(
            self.cap.isOpened(),
            "Webcam failed to open. Check that it is connected and not in use."
        )

    # -------------------------
    # Test 2: Frame is readable
    # -------------------------
    def test_frame_read(self):
        """A frame should be readable from the webcam."""
        self.assertTrue(self.cap.isOpened(), "Webcam is not open.")
        success, frame = self.cap.read()
        self.assertTrue(success, "Failed to read a frame from the webcam.")
        self.assertIsNotNone(frame, "Frame is None.")

    # -------------------------
    # Test 3: Frame has valid dimensions
    # -------------------------
    def test_frame_dimensions(self):
        """Frame should have valid height, width, and 3 color channels."""
        success, frame = self.cap.read()
        self.assertTrue(success, "Failed to read a frame.")
        self.assertEqual(len(frame.shape), 3, "Frame does not have 3 dimensions (H, W, C).")
        h, w, c = frame.shape
        self.assertGreater(h, 0, "Frame height should be greater than 0.")
        self.assertGreater(w, 0, "Frame width should be greater than 0.")
        self.assertEqual(c, 3, "Frame should have 3 color channels (BGR).")

    # -------------------------
    # Test 4: MediaPipe initializes
    # -------------------------
    def test_mediapipe_initialization(self):
        """MediaPipe FaceMesh should initialize without errors."""
        self.assertIsNotNone(self.face_mesh, "FaceMesh failed to initialize.")

    # -------------------------
    # Test 5: RGB conversion works
    # -------------------------
    def test_rgb_conversion(self):
        """Frame should convert from BGR to RGB without errors."""
        success, frame = self.cap.read()
        self.assertTrue(success, "Failed to read a frame.")
        try:
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        except Exception as e:
            self.fail(f"BGR to RGB conversion failed: {e}")
        self.assertEqual(rgb_frame.shape, frame.shape, "RGB frame shape should match original.")

    # -------------------------
    # Test 6: Face landmarks detected
    # -------------------------
    def test_face_landmark_detection(self):
        """MediaPipe should detect face landmarks from a live webcam frame."""
        success, frame = self.cap.read()
        self.assertTrue(success, "Failed to read a frame.")
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)
        self.assertIsNotNone(
            results.multi_face_landmarks,
            "No face landmarks detected. Make sure your face is visible to the webcam."
        )

    # -------------------------
    # Test 7: Landmark coordinates are within frame bounds
    # -------------------------
    def test_landmark_coordinates_within_bounds(self):
        """All landmark (x, y) coordinates should fall within the frame dimensions."""
        success, frame = self.cap.read()
        self.assertTrue(success, "Failed to read a frame.")
        h, w, _ = frame.shape
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                for landmark in face_landmarks.landmark:
                    x = int(landmark.x * w)
                    y = int(landmark.y * h)
                    self.assertGreaterEqual(x, 0, f"Landmark x={x} is out of bounds (negative).")
                    self.assertLess(x, w, f"Landmark x={x} exceeds frame width {w}.")
                    self.assertGreaterEqual(y, 0, f"Landmark y={y} is out of bounds (negative).")
                    self.assertLess(y, h, f"Landmark y={y} exceeds frame height {h}.")
        else:
            self.skipTest("No face detected — cannot test landmark bounds without a face in frame.")


if __name__ == "__main__":
    unittest.main(verbosity=2)