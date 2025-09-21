import React from 'react';
import { DetailsGate } from '@/components/DetailsGate';
import { ChatView } from '@/components/ChatView';
import { useArtisanChat } from '@/hooks/useArtisanChat';

const Index = () => {
  const {
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
  } = useArtisanChat();

  if (showDetailsGate) {
    return (
      <DetailsGate
        onSubmit={saveUserDetails}
        initialData={userDetails || undefined}
      />
    );
  }

  return (
    <ChatView
      messages={messages}
      onSendMessage={sendMessage}
      onChangeDetails={openDetailsGate}
      selectStrategy={selectStrategy}
      showStrategySelection={showStrategySelection}
      pendingStrategies={pendingStrategies}
      conversationContext={conversationContext}
    />
  );
};

export default Index;
