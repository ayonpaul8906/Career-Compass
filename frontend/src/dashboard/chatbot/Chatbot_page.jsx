import ChatInterface from '../../components/chatbot/ChatInterface';

export default function ChatbotPage() {
  return (
    <div className="h-full flex flex-col">
       <div className="space-y-2 mb-8">
        <h1 className="text-3xl text-white font-bold tracking-tight font-headline">AI Career Mentor</h1>
        <p className="text-muted-foreground text-white">Ask me anything about career planning, resumes, interviews, and more!</p>
      </div>
      <div className="flex-grow">
        <ChatInterface />
      </div>
    </div>
  );
}
