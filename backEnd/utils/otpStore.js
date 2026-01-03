async function saveOtp(email, otp) {
  const key = `otp:${email}`;

  await redisClient.set(
    key,
    otp.toString(),   // store only OTP
    {
      EX: 300         // ⏱️ expires in 5 minutes
    }
  );

  console.log("OTP saved in Redis");
}

export default saveOtp;
