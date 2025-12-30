// Gemini AI Service for welcome message generation
// This is a mock service - replace with actual API integration if needed

export const getWelcomeGreeting = async (name) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const greetings = [
    `Welcome aboard, ${name}! Let's build something amazing together.`,
    `Great to have you here, ${name}! Your journey to better user management starts now.`,
    `Hello ${name}! We're excited to see what you'll accomplish.`,
    `Welcome ${name}! Ready to streamline your workflow?`,
    `Hi ${name}! Let's make user management effortless for you.`
  ];
  
  // Return a random greeting
  return greetings[Math.floor(Math.random() * greetings.length)];
};
