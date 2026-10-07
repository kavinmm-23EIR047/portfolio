import express from 'express';

const router = express.Router();

const ADMIN_EMAIL = 'akwebflairtechnologies@gmail.com';
const ADMIN_PASS = 'Kavin20#';

// ADMIN LOGIN ROUTE
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    // Generate a simple auth token
    const token = Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString('base64');
    return res.json({
      success: true,
      message: '✅ Admin Authentication Successful',
      token,
      admin: {
        email: ADMIN_EMAIL,
        name: 'Kavin M M (Founder & CEO)',
        role: 'SUPER_ADMIN',
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: '❌ Invalid Email or Password. Access Denied.',
  });
});

export default router;
