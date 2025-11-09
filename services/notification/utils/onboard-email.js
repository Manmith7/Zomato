export const handleOnboardingEmail = async (user) => {
  // Simulate sending an email (e.g., via nodemailer, SendGrid, etc.)
  console.log(`📨 Sending onboarding email to ${user.email}...`);

  // Example logic:
  // await sendEmail({
  //   to: user.email,
  //   subject: 'Welcome!',
  //   html: `<h1>Hello ${user.name}, welcome to our platform!</h1>`
  // });

  // Simulated delay
  await new Promise((res) => setTimeout(res, 500));

  console.log(`✅ Email sent to ${user.email}`);
};
