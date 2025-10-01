import { useState, useEffect, useCallback } from 'react';
import { getArtisanPrompt } from '@/prompts/artisanPrompt';
import { detectLanguage, getLanguageInstruction, getLocalizedText, getTierNames } from '@/utils/languageDetection';

interface UserDetails {
  craftType: string;
  location: string;
  additionalInfo?: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  strategies?: any[]; // Store strategies for selection
  isStrategySelection?: boolean; // Flag to identify strategy selection messages
  hasUserBudget?: boolean; // Whether user provided a budget
  selectedStrategyIndex?: number; // Index of selected strategy
  languageInfo?: { language: string; confidence: number; code: string }; // Language detection info
}

const STORAGE_KEY = 'artisan_chat_details';

// Utility functions for data handling
const formatArrayItem = (item: any, index: number): string => {
  if (typeof item === 'string') {
    return `    ${index + 1}. ${item}\n`;
  } else if (typeof item === 'object' && item !== null) {
    let result = `    ${index + 1}. `;
    Object.entries(item).forEach(([subKey, subValue], idx) => {
      result += ` ${subValue}\n`;
      if (idx < Object.entries(item).length - 1) {
        result += '; ';
      }
    });
    return result + '\n';
  } else {
    return `    ${index + 1}. ${item}\n`;
  }
};

const formatDescriptionValue = (descValue: any): string => {
  if (typeof descValue === 'string') {
    return `  • ${descValue}\n`;
  } else if (Array.isArray(descValue)) {
    let result = `  • Array:\n`;
    descValue.forEach((item, index) => {
      result += formatArrayItem(item, index);
    });
    return result + '\n';
  } else if (typeof descValue === 'object' && descValue !== null) {
    let result = `  • Object:\n`;
    Object.entries(descValue).forEach(([subKey, subValue]) => {
      result += `    - ${subValue}\n`;
    });
    return result + '\n';
  } else {
    return `  • ${descValue}\n`;
  }
};

const formatDescriptionObject = (description: any): string => {
  let result = '';
  let titleKey = '';
  let titleValue = '';
  const otherKeys: Array<{key: string, value: any}> = [];
  
  // Separate title key from other keys
  Object.entries(description).forEach(([descKey, descValue]) => {
    if (descKey.toLowerCase() === 'title') {
      titleKey = descKey;
      titleValue = String(descValue);
    } else {
      otherKeys.push({key: descKey, value: descValue});
    }
  });
  
  // Show title as main heading
  if (titleKey && titleValue) {
    result += `**\n\n${titleValue}**\n\n`;
  }
  
  // Show all other keys as sub-points
  otherKeys.forEach(({key, value}) => {
    if (typeof value === 'string') {
      result += `  • ${value}\n`;
    } else if (Array.isArray(value)) {
      result += `  • `;
      value.forEach((item, index) => {
        if (typeof item === 'string') {
          result += `${item}`;
        } else if (typeof item === 'object' && item !== null) {
          const objectValues = Object.values(item);
          result += `${objectValues.join(', ')}`;
        } else {
          result += `${item}`;
        }
        if (index < value.length - 1) {
          result += '; ';
        }
      });
      result += '\n';
    } else if (typeof value === 'object' && value !== null) {
      result += `  • `;
      const objectValues = Object.values(value);
      result += `${objectValues.join('\n \t- ')}\n\n\n`;
    } else {
      result += `  • ${value}\n`;
    }
  });
  
  return result + '\n';
};

const formatObjectContent = (item: any): string => {
  let result = '';
  let hasHeading = false;
  
  // Handle headings first
  if (item.headings) {
    result += ` ${item.headings} \n\n`;
    hasHeading = true;
  }
  
  // Handle other properties
  Object.entries(item).forEach(([key, value]) => {
    if (key === 'headings') {
      // Already handled above
    } else if (key === 'content' || key === 'description') {
      if (!hasHeading) {
        result += ` ${key.charAt(0).toUpperCase() + key.slice(1)} \n\n`;
      }
      if (key === 'description' && typeof value === 'object') {
        result += formatDescriptionObject(value);
      } else {
        result += `${value}\n\n`;
      }
    } else if (typeof value === 'string' && value.length > 0) {
      if (!hasHeading) {
        result += ` ${key.charAt(0).toUpperCase() + key.slice(1)} \n\n`;
      }
      result += `${value}\n\n`;
    }
  });
  
  return result;
};

// Function to generate prompt with context for follow-up questions
const getArtisanPromptWithContext = (followUpQuestion: string, userDetails: UserDetails | null, context: any, languageInstruction: string) => {
  const basePrompt = getArtisanPrompt(followUpQuestion, userDetails, languageInstruction);
  
  // Add context information to help the AI understand this is a follow-up about a specific strategy
  const contextInfo = `

CONTEXT FOR FOLLOW-UP QUESTION:
- Original Query: "${context.originalQuery}"
- Selected Strategy: "${context.selectedStrategy.strategy_title}"
- User is asking: "${followUpQuestion}"

This is a follow-up question about the selected strategy. Please provide detailed elaboration in the format specified in the prompt.`;

  return basePrompt + contextInfo;
};

export const useArtisanChat = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDetailsGate, setShowDetailsGate] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const [pendingStrategies, setPendingStrategies] = useState<any[] | null>(null);
  const [hasUserBudget, setHasUserBudget] = useState(false);
  const [conversationContext, setConversationContext] = useState<{
    originalQuery: string;
    selectedStrategy: any;
    strategies: any[];
  } | null>(null);

  // Load user details from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const details = JSON.parse(stored) as UserDetails;
        if (details.craftType?.trim() && details.location?.trim()) {
          setUserDetails(details);
          return;
        }
      }
    } catch (error) {
      console.warn('Failed to load user details from localStorage:', error);
    }
    
    // Show details gate if no valid details found
    setShowDetailsGate(true);
  }, []);

  // Show greeting message when user details are set for the first time
  useEffect(() => {
    if (userDetails && !hasShownGreeting) {
      const additionalText = userDetails.additionalInfo ? ` I also note: ${userDetails.additionalInfo}.` : '';
      const greetingMessage: Message = {
        id: `greeting-${Date.now()}`,
        text: `Namaste! I'm artisan-mini. I see you craft in ${userDetails.craftType} and you're in ${userDetails.location}.${additionalText} How can I help you today?`,
        isUser: false,
        timestamp: new Date(),
        languageInfo: { language: 'English', confidence: 1, code: 'en' }
      };
      
      setMessages([greetingMessage]);
      setHasShownGreeting(true);
    }
  }, [userDetails, hasShownGreeting]);

  const saveUserDetails = useCallback((craftType: string, location: string, additionalInfo?: string) => {
    const details: UserDetails = { craftType, location, additionalInfo };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    } catch (error) {
      console.warn('Failed to save user details to localStorage:', error);
    }
    
    setUserDetails(details);
    setShowDetailsGate(false);
    
    // Always reset greeting flag when details are saved to show new greeting
    setHasShownGreeting(false);
  }, []);

  const openDetailsGate = useCallback(() => {
    setShowDetailsGate(true);
  }, []);

  const selectStrategy = useCallback((strategyIndex: number) => {
    if (pendingStrategies && pendingStrategies[strategyIndex]) {
      const selectedStrategy = pendingStrategies[strategyIndex];
      // Get language info from the last user message
      const lastUserMessage = messages.findLast(m => m.isUser);
      const languageInfo = lastUserMessage?.languageInfo || { language: 'English', confidence: 1, code: 'en' };
      const formattedResponse = formatMarketingStrategy(selectedStrategy, languageInfo);
      
      // Store conversation context for follow-up questions
      setConversationContext({
        originalQuery: messages[messages.length - 1]?.text || '',
        selectedStrategy: selectedStrategy,
        strategies: pendingStrategies
      });
      
      const strategyMessage: Message = {
        id: `strategy-${Date.now()}`,
        text: formattedResponse,
        isUser: false,
        timestamp: new Date(),
        strategies: pendingStrategies,
        isStrategySelection: false,
        hasUserBudget: pendingStrategies[0]?.given_budget > 0,
        selectedStrategyIndex: strategyIndex,
        languageInfo
      };
      
      setMessages(prev => [...prev, strategyMessage]);
      // Don't clear pendingStrategies so user can choose again
    }
  }, [pendingStrategies, messages]);

  const showStrategySelection = useCallback(() => {
    if (pendingStrategies) {
      // Get languageInfo from the last user message in the conversation
      const lastUserMessage = messages.findLast(m => m.isUser);
      const languageInfo = lastUserMessage?.languageInfo || { language: 'English', confidence: 1, code: 'en' };

      const formattedResponse = formatMultipleStrategies(pendingStrategies, languageInfo);
      const selectionMessage: Message = {
        id: `strategy-selection-${Date.now()}`,
        text: formattedResponse,
        isUser: false,
        timestamp: new Date(),
        strategies: pendingStrategies,
        isStrategySelection: true,
        hasUserBudget: pendingStrategies[0]?.given_budget > 0,
        languageInfo
      };
      
      setMessages(prev => [...prev, selectionMessage]);
    }
  }, [pendingStrategies, messages]);

  const sendMessage = useCallback(async (text: string) => {
    // Detect language from user input
    const languageInfo = detectLanguage(text);
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
      timestamp: new Date(),
      languageInfo
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Check if this is a follow-up question (user has selected a strategy and is asking questions)
    const isFollowUpQuestion = conversationContext && conversationContext.selectedStrategy;
    
    // If this is a new query (not a follow-up), clear the conversation context
    if (!isFollowUpQuestion) {
      setConversationContext(null);
    }

    // Get language instruction for AI
    const languageInstruction = getLanguageInstruction(languageInfo);

    // Add waiting message in user's language
    const waitingMessage: Message = {
      id: `waiting-${Date.now()}`,
      text: isFollowUpQuestion 
        ? `🔄 ${getLocalizedText(languageInfo, 'processing')}`
        : `🔄 ${getLocalizedText(languageInfo, 'waiting')}`,
      isUser: false,
      timestamp: new Date(),
      languageInfo
    };
    
    setMessages(prev => [...prev, waitingMessage]);
    
    // Send to Gemini API
    try {
      // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      // if (!apiKey) {
      //   throw new Error('API key not found. Please set VITE_GEMINI_API_KEY in your .env file');
      // }
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBD2hpGn17D5t-nJzN973qJF-7ty_Vcg-4`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: isFollowUpQuestion 
                ? getArtisanPromptWithContext(text, userDetails, conversationContext, languageInstruction)
                : getArtisanPrompt(text, userDetails, languageInstruction)
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const apiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
      
      // Parse JSON from API response
      let strategyData;
      try {
        // Clean the response text and extract JSON
        let cleanedText = apiText.trim();
        
        // Remove any markdown code blocks
        if (cleanedText.includes('```json')) {
          const jsonMatch = cleanedText.match(/```json\s*([\s\S]*?)\s*```/);
          cleanedText = jsonMatch ? jsonMatch[1] : cleanedText;
        } else if (cleanedText.includes('```')) {
          const jsonMatch = cleanedText.match(/```\s*([\s\S]*?)\s*```/);
          cleanedText = jsonMatch ? jsonMatch[1] : cleanedText;
        }
        
        // Clean up any remaining text after JSON
        cleanedText = cleanedText.trim();
        
        // Find JSON object or array in the text
        let jsonMatch;
        if (cleanedText.startsWith('[')) {
          // Handle JSON array case
          jsonMatch = cleanedText.match(/\[[\s\S]*?\]/);
        } else {
          // Handle JSON object case
          jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        }
        
        if (jsonMatch) {
          cleanedText = jsonMatch[0];
        }
        
        strategyData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, 'Raw text:', apiText);
        strategyData = {
          strategy_title: "Processing Error", 
          marketing_strategy: "Unable to parse the marketing strategy at this time.",
          allocations: [],
          estimated_timeline: "N/A",
          tech_requirements: "N/A"
        };
      }

      // Remove waiting message first
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('waiting-')));

      // Handle different response types
      if (strategyData.error) {
        // Error response
        const errorMessage: Message = {
          id: `bot-${Date.now()}`,
          text: `❌  Error : ${strategyData.error}`,
          isUser: false,
          timestamp: new Date(),
          languageInfo
        };
        setMessages(prev => [...prev, errorMessage]);
      } else if (strategyData.elaboration || (isFollowUpQuestion && strategyData)) {
        // Follow-up question response
        const formattedResponse = formatElaboration(strategyData);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: formattedResponse,
          isUser: false,
          timestamp: new Date(),
          languageInfo
        };
        setMessages(prev => [...prev, botMessage]);
      } else if (strategyData.strategies) {
        // Multiple strategy options
        setPendingStrategies(strategyData.strategies);
        // Check if user provided budget by looking at given_budget field in strategies
        const userProvidedBudget = strategyData.strategies[0]?.given_budget > 0;
        setHasUserBudget(userProvidedBudget);
        
        const formattedResponse = formatMultipleStrategies(strategyData.strategies, languageInfo);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: formattedResponse,
          isUser: false,
          timestamp: new Date(),
          strategies: strategyData.strategies,
          isStrategySelection: true,
          hasUserBudget: userProvidedBudget,
          languageInfo
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Check if this is a follow-up question that didn't match other patterns
        if (isFollowUpQuestion) {
          // Treat as elaboration response
          const formattedResponse = formatElaboration(strategyData);
          const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: formattedResponse,
          isUser: false,
          timestamp: new Date(),
          languageInfo
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Complete marketing strategy response
        const formattedResponse = formatMarketingStrategy(strategyData, languageInfo);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: formattedResponse,
          isUser: false,
          timestamp: new Date(),
          languageInfo
        };
        setMessages(prev => [...prev, botMessage]);
        }
      }
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Remove waiting message
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('waiting-')));
      
      const errorMessage: Message = {
        id: `bot-error-${Date.now()}`,
        text: `❌ ${getLocalizedText(languageInfo, 'error')}`,
        isUser: false,
        timestamp: new Date(),
        languageInfo
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [userDetails, conversationContext]);

  const formatElaboration = (data: any) => {
    let response = "";
    
    // Handle different response structures
    if (data.elaboration) {
    if (typeof data.elaboration === 'string') {
        // Clean up the string and format it properly
        const elaborationText = data.elaboration.trim();
        
        // Add proper formatting for better readability
        if (elaborationText.includes('\n')) {
          // If it already has line breaks, use as is
          response = elaborationText;
        } else {
          // If it's a single string, add some structure
          response = `💡  Detailed Information \n\n${elaborationText}`;
        }
      } else if (Array.isArray(data.elaboration)) {
        response = "💡  Content Ideas \n\n";
        data.elaboration.forEach((item: any, index: number) => {
          if (typeof item === 'string') {
            response += `${index + 1}. ${item}\n\n`;
          } else if (typeof item === 'object' && item.headings) {
            // Handle structured content with headings
            response += ` ${item.headings} \n\n`;
            // Add content if available
            if (item.content) {
              response += `${item.content}\n\n`;
            } else if (item.description) {
              if (typeof item.description === 'object') {
                response += formatDescriptionObject(item.description);
              } else {
                response += `${item.description}\n\n`;
              }
            }
          } else if (typeof item === 'object') {
            response += formatObjectContent(item);
          } else {
            response += `${index + 1}. ${JSON.stringify(item)}\n\n`;
          }
        });
      } else if (typeof data.elaboration === 'object') {
        // Handle object elaboration
        response = "💡  Detailed Information \n\n";
        Object.entries(data.elaboration).forEach(([key, value]) => {
          if (key === 'headings') {
            response += `${value}\n\n`;
          } else if (key === 'description' && typeof value === 'object') {
            response += `${key}:\n`;
            response += formatDescriptionObject(value);
          } else {
            response += `${key}: ${value}\n\n`;
          }
        });
      } else {
        response = `💡  Information \n\n${String(data.elaboration)}`;
      }
    } else if (data.error) {
      response = `❌  Error:  ${data.error}`;
    } else if (data.message) {
      response = `💡  Response:  ${data.message}`;
    } else if (Array.isArray(data)) {
      // Handle direct array responses
      response = "💡  Content Ideas \n\n";
      data.forEach((item: any, index: number) => {
        if (typeof item === 'string') {
          response += `${index + 1}. ${item}\n\n`;
        } else if (typeof item === 'object' && item.headings) {
          response += ` ${item.headings} \n\n`;
          // Add content if available
          if (item.content) {
            response += `${item.content}\n\n`;
          } else if (item.description) {
            if (typeof item.description === 'object') {
              response += formatDescriptionObject(item.description);
            } else {
              response += `${item.description}\n\n`;
            }
          }
        } else if (typeof item === 'object') {
          response += formatObjectContent(item);
        } else {
          response += `${index + 1}. ${JSON.stringify(item)}\n\n`;
        }
      });
    } else {
      // Fallback - try to display whatever we have
      response = "💡  Additional Information \n\n";
      if (typeof data === 'string') {
        response += data;
      } else if (typeof data === 'object') {
        // Try to extract meaningful content from objects
        if (data.headings) {
          response += ` ${data.headings} \n\n`;
        }
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'headings' && value) {
            if (key === 'description' && typeof value === 'object') {
              response += `${key}:\n`;
              response += formatDescriptionObject(value);
            } else {
              response += `${key}: ${value}\n\n`;
            }
          }
        });
      } else {
        response += "No additional details available.";
      }
    }
    
    // Clean up the response with regex patterns
    response = response
      // Remove double asterisks and fix formatting
      .replace(/\*\*\*\*/g, '')
      .replace(/\*\*([^*]+)\*\*\s*\n/g, '**$1**\n\n')
      .replace(/\*\*([^*]+)\*\*\s*([^*\n])/g, '**$1**\n\n$2')
      .replace(/\*\*([^*]+)\*\*\s*$/g, '**$1**\n\n')
      // Fix headings that got concatenated
      .replace(/\*\*([^*]+)\*\*\*\*([^*]+)\*\*/g, '**$1**\n\n**$2**')
      // Remove leading hyphens from bold text
      .replace(/-\s*\*\*([^*]+)\*\*/g, '**$1**')
      // Ensure proper spacing after headings
      .replace(/\*\*([^*]+)\*\*\s*([A-Z])/g, '**$1**\n\n$2')
      // Remove empty bold tags
      .replace(/\*\*\s*\*\*/g, '')
      // Clean up excessive line breaks
      .replace(/\n{3,}/g, '\n\n')
      // Remove trailing whitespace
      .trim();
    
    return response;
  };

  const formatMultipleStrategies = (strategies: any[], languageInfo?: { language: string; confidence: number; code: string }) => {
    // Get tier names in user's language
    const tierNames = languageInfo ? getTierNames(languageInfo) : { low: 'Low', mid: 'Mid', high: 'High' };
    
    // Get localized text for strategy options
    const strategyOptionsText = languageInfo ? getLocalizedText(languageInfo, 'strategyOptions') : "🎯 Marketing Strategy Options\n\nI've prepared three strategy options for you:\n\n";
    let response = strategyOptionsText;
    
    // Sort strategies by allocated_budget (lowest to highest)
    const sortedStrategies = [...strategies].sort((a, b) => a.allocated_budget - b.allocated_budget);
    
    let budgetLabels: string[];
    if (strategies[0].given_budget == 0) {
      // Assign labels based on budget order using localized tier names
      budgetLabels = [
        `💰 ${tierNames.low}`, 
        `⭐ ${tierNames.mid}`, 
        `💎 ${tierNames.high}`
      ];
    } else {
      // Use strategy titles when user provided budget
      budgetLabels = sortedStrategies.map((strategy) => strategy.strategy_title);
    }
    
    sortedStrategies.forEach((strategy, index) => {
      if (index > 0) response += "\n" + "=".repeat(50) + "\n\n";
      
      response += `${budgetLabels[index]}\n`;
      if (strategy.allocated_budget) {
        response += `Budget: ₹${strategy.allocated_budget.toLocaleString('en-IN')}\n\n`;
      }
      
      if (strategy.strategy_title && budgetLabels[index] != strategy.strategy_title) {
        response += `${strategy.strategy_title}\n\n`;
      }
      
      if (strategy.marketing_strategy) {
        response += `📋 Strategy Overview\n${strategy.marketing_strategy}\n\n`;
      }
      
      if (strategy.strategy_explanation) {
        response += `🎯 Why This Works\n${strategy.strategy_explanation}\n\n`;
      }
      
      if (strategy.allocations && strategy.allocations.length > 0) {
        response += "💰 Budget Breakdown\n";
        strategy.allocations.forEach((allocation: any, allocationIndex: number) => {
          const amount = allocation.amount || 0;
          const item = allocation.item || "";
          response += `${allocationIndex + 1}. ${item} - ₹${amount.toLocaleString('en-IN')}\n`;
        });
        response += '\n';
      }
      
      if (strategy.estimated_timeline) {
        response += `⏱️ Timeline: ${strategy.estimated_timeline}\n`;
      }
    });
    
    response += "\n---\n";
    
    // Get localized text for end messages
    const chooseStrategyText = languageInfo ? getLocalizedText(languageInfo, 'chooseStrategy') : "🎯  Choose a strategy to explore in detail using the buttons below!";
    const askElaborateText = languageInfo ? getLocalizedText(languageInfo, 'askElaborate') : "Or ask me to elaborate on any specific aspect! 💬";
    
    response += `${chooseStrategyText} \n\n`;
    response += `${askElaborateText}`;
    
    return response;
  };

  const formatMarketingStrategy = (data: any, languageInfo?: { language: string; confidence: number; code: string }) => {
    let response = "";
    
    // Strategy title as main heading
    if (data.strategy_title) {
      response += `🎨 ${data.strategy_title}\n\n`;
    }
    
    // Craft and location info
   
    if (data.budget) {
      response += `Budget: ₹${data.budget.toLocaleString('en-IN')}\n\n`;
    }
    
    // Strategy overview
    if (data.marketing_strategy) {
      const overviewText = languageInfo ? getLocalizedText(languageInfo, 'strategyOverview') : 'Strategy Overview';
      response += `📋 ${overviewText}\n${data.marketing_strategy}\n\n`;
    }
    
    // Strategy explanation
    if (data.strategy_explanation) {
      const whyWorksText = languageInfo ? getLocalizedText(languageInfo, 'whyThisWorks') : 'Why This Works';
      response += `🎯 ${whyWorksText}\n${data.strategy_explanation}\n\n`;
    }
    
    // Implementation steps
    if (data.strategy_working) {
      const stepsText = languageInfo ? getLocalizedText(languageInfo, 'implementationSteps') : 'Implementation Steps';
      response += `📝 ${stepsText}\n${data.strategy_working}\n\n`;
    }
    
    // Budget allocations
    if (data.allocations && data.allocations.length > 0) {
      const budgetText = languageInfo ? getLocalizedText(languageInfo, 'budgetBreakdown') : 'Budget Breakdown';
      response += `💰 ${budgetText}\n\n`;
      data.allocations.forEach((allocation: any, index: number) => {
        const amount = allocation.amount || 0;
        const explanation = allocation.explanation || "";
        const item = allocation.item || "";
        response += `${index + 1}. ${item} - ₹${amount.toLocaleString('en-IN')}\n`;
        if (explanation) {
          response += `   ${explanation}\n`;
        }
        response += '\n';
      });
    }
    
    // Tech requirements
    if (data.tech_requirements) {
      const techText = languageInfo ? getLocalizedText(languageInfo, 'techRequirements') : 'Tech Requirements';
      response += `🛠️ ${techText}\n${data.tech_requirements}\n\n`;
    }
    
    // Timeline
    if (data.estimated_timeline) {
      const timelineText = languageInfo ? getLocalizedText(languageInfo, 'timeline') : 'Timeline';
      response += `⏱️ ${timelineText}\n${data.estimated_timeline}\n\n`;
    }
    
    response += "---\n";
    const feelFreeText = languageInfo ? getLocalizedText(languageInfo, 'feelFreeToAsk') : 'Feel free to ask for more details about any specific aspect of this strategy! 💬';
    response += feelFreeText;
    
    return response;
  };

  return {
    userDetails,
    messages,
    showDetailsGate,
    saveUserDetails,
    openDetailsGate,
    sendMessage,
    selectStrategy,
    showStrategySelection,
    pendingStrategies,
    hasUserBudget,
    conversationContext
  };
};