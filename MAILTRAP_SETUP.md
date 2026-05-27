# Email Verification Template

## HTML Email Template

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .content {
            padding: 40px 30px;
        }
        .button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to TravelApp!</h1>
        </div>
        <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Hi {{firstName}},</p>
            <p>Thank you for registering with TravelApp. Please verify your email address by clicking the button below:</p>
            
            <center>
                <a href="{{verificationLink}}" class="button">Verify Email Address</a>
            </center>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="background: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all;">
                {{verificationLink}}
            </p>
            
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                <strong>Note:</strong> After clicking the link, you'll receive an OTP on your registered mobile number.
            </p>
            
            <p style="color: #ef4444; font-size: 14px;">
                ⚠️ This link will expire in 24 hours.
            </p>
        </div>
        <div class="footer">
            <p>© 2024 TravelApp. All rights reserved.</p>
            <p>If you didn't create this account, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
```

## Backend API Implementation

### POST /ums/v1/users/send-verification-email

```javascript
// Node.js Example
router.post('/send-verification-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      { 
        userId: user.userId, 
        email: user.email,
        mobileNumber: user.mobileNumber 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Create verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${email}`;
    
    // Send email using Mailtrap
    await transporter.sendMail({
      from: '"TravelApp" <noreply@travelapp.com>',
      to: email,
      subject: "Verify Your Email Address - TravelApp",
      html: emailTemplate
        .replace('{{firstName}}', user.firstName)
        .replace(/{{verificationLink}}/g, verificationLink)
    });
    
    res.json({ 
      success: true, 
      message: 'Verification email sent successfully' 
    });
    
  } catch (error) {
    console.error('Send verification email error:', error);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
});
```

### POST /ums/v1/users/verify-email-token

```javascript
router.post('/verify-email-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Return user data
    res.json({
      userId: decoded.userId,
      email: decoded.email,
      mobileNumber: decoded.mobileNumber
    });
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Verification link expired' });
    }
    res.status(401).json({ message: 'Invalid verification link' });
  }
});
```

### POST /ums/v1/users/send-otp

```javascript
router.post('/send-otp', async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    
    // For testing: Always use OTP 123456
    const otp = '123456';
    
    // Store OTP in Redis/Database with 10 min expiry
    await redis.setex(`otp:${mobileNumber}`, 600, otp);
    
    // In production: Send SMS using Twilio/AWS SNS
    // await sendSMS(mobileNumber, `Your OTP is: ${otp}`);
    
    console.log(`OTP for ${mobileNumber}: ${otp}`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});
```

### POST /ums/v1/users/verify-otp

```javascript
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    
    // Get stored OTP
    const storedOtp = await redis.get(`otp:${mobileNumber}`);
    
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP expired' });
    }
    
    if (storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Delete OTP after successful verification
    await redis.del(`otp:${mobileNumber}`);
    
    res.json({ 
      success: true, 
      message: 'OTP verified successfully' 
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});
```

### POST /ums/v1/users/activate

```javascript
router.post('/activate', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Update user status to ENABLED
    await User.updateOne(
      { userId },
      { 
        status: 'ENABLED',
        emailVerified: true,
        mobileVerified: true,
        'lifeCycleInfo.aat': new Date().toISOString()
      }
    );
    
    res.json({ 
      success: true, 
      message: 'User activated successfully' 
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to activate user' });
  }
});
```

## Mailtrap Testing Steps

1. **Mailtrap Dashboard**: Login karke inbox check karo
2. **Email Preview**: Email ka HTML preview dekho
3. **Link Testing**: Verification link copy karke browser mein test karo
4. **Spam Check**: Mailtrap spam score bhi dikhata hai
5. **HTML/Text View**: Both versions check kar sakte ho

## Environment Variables (.env)

```env
# Mailtrap Configuration
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Secret
JWT_SECRET=your_secret_key_here
```

## Production Setup

Production mein Mailtrap ki jagah real email service use karna:
- **AWS SES** (Amazon Simple Email Service)
- **SendGrid**
- **Mailgun**
- **Postmark**

Configuration same rahega, sirf SMTP credentials change honge.
