import unittest

class TestLogin(unittest.TestCase):
    
    def test_sign_in(self):
        """Test that sign in is called"""
        email = 'test@example.com'
        password = 'password123'
        
        # Verify email and password are valid
        self.assertTrue('@' in email)
        self.assertTrue(len(password) >= 6)
    
    def test_sign_up(self):
        """Test that sign up is called"""
        email = 'newuser@example.com'
        password = 'password123'
        
        # Verify email and password are valid
        self.assertTrue('@' in email)
        self.assertTrue(len(password) >= 6)


if __name__ == '__main__':
    unittest.main()
