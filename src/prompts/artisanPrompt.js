// Artisan Marketing Prompt for AI Assistant

import promptYaml from './artisan-marketing-prompt.yaml?raw';

export const getArtisanPrompt = (userMessage, userDetails) => {
  // Parse the YAML content and replace the userMessage variable
  const prompt1 = promptYaml.replace('${userMessage}', userMessage);
  const prompt = prompt1.replace('${userDetails}', JSON.stringify(userDetails));
  
  return prompt;
};