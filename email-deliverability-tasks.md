# Email Deliverability Setup Tasks

## Current Status

✅ **Completed:**
- SendGrid SDK installed (`@sendgrid/mail`)
- Email sender code updated to use SendGrid Web API
- SENDGRID_API_KEY environment variable configured
- Prenup generation and document creation working
- Download fallback working when email fails

❌ **Pending:**
- SendGrid sender verification
- SENDGRID_FROM_EMAIL environment variable configuration

## Tasks to Complete

### Task 1: Verify Sender Email in SendGrid

**Options:**

**Option A: Single Sender Verification (Quick - for testing)**
1. Log into [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to Settings → Sender Authentication
3. Click "Verify a Single Sender"
4. Enter email address (e.g., `noreply@drafter.com` or your personal email)
5. Complete verification via email confirmation
6. Use this email as the FROM address

**Option B: Domain Authentication (Recommended - for production)**
1. Log into [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to Settings → Sender Authentication
3. Click "Authenticate Your Domain"
4. Enter your domain (e.g., `drafter.com`)
5. Add DNS records (CNAME) to your domain provider
6. Wait for DNS propagation and verification
7. Use any email from your verified domain

### Task 2: Configure FROM Email Environment Variable

1. Open Replit Secrets tab (lock icon in sidebar)
2. Add new secret:
   - **Key:** `SENDGRID_FROM_EMAIL`
   - **Value:** Your verified email address (from Task 1)
   
Examples:
- `noreply@drafter.com`
- `hello@drafter.com`
- `joshua@renfro.dev` (if using personal email)

### Task 3: Test Email Delivery

1. Navigate to `/intake` in the application
2. Complete the prenup intake form with test data
3. Use a real email address for delivery
4. Click "Generate Prenup"
5. Check that:
   - Email delivers successfully
   - `emailDelivered: true` in response
   - Email arrives with prenup attachment
   - Email formatting looks correct

### Task 4: Verify Email Content

Check the delivered email for:
- ✅ Professional formatting
- ✅ Correct party names
- ✅ Legal disclaimers present
- ✅ Next steps clearly listed
- ✅ Word document attached
- ✅ Download link works if provided

## Troubleshooting

### 401 Unauthorized Error
- **Cause:** Sender email not verified in SendGrid
- **Solution:** Complete Task 1 (sender verification)

### 403 Forbidden Error
- **Cause:** Invalid SendGrid API key
- **Solution:** Check SENDGRID_API_KEY secret value

### "From address not verified" Error
- **Cause:** Using unverified email as FROM address
- **Solution:** Verify the email in SendGrid dashboard or use different verified email

### Email Not Received
- Check spam/junk folder
- Verify email address is correct
- Check SendGrid dashboard → Activity Feed for delivery status
- Review SendGrid API response for error details

## Production Considerations

Before going live:
1. ✅ Use domain authentication (not single sender)
2. ✅ Set up SPF, DKIM, DMARC records
3. ✅ Configure custom return path
4. ✅ Set up email templates in SendGrid (optional)
5. ✅ Configure webhook for delivery tracking (optional)
6. ✅ Set up suppression lists for bounces/unsubscribes
7. ✅ Monitor sending reputation
8. ✅ Use branded domain for FROM address

## Notes

- Current implementation gracefully handles email failures
- Download fallback ensures users always get their document
- SendGrid has generous free tier (100 emails/day)
- Consider rate limiting for production use
- Monitor SendGrid usage to avoid overage charges
