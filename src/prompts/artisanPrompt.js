// Artisan Marketing Prompt for AI Assistant

import promptYaml from './artisan-marketing-prompt.yaml?raw';

export const getArtisanPrompt = (userMessage, userDetails, languageInstruction = 'Respond in English.') => {
  // Parse the YAML content and replace the variables
  let prompt = promptYaml.replace('${userMessage}', userMessage);
  prompt = prompt.replace('${userDetails}', JSON.stringify(userDetails));
  prompt = prompt.replace('${languageInstruction}', languageInstruction);
  
  return prompt;
};