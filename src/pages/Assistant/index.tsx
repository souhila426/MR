import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, FileText, Scale, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    type: string;
    relevance: number;
  }>;
  helpful?: boolean;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Bonjour ! Je suis votre assistant juridique intelligent. Je peux vous aider à comprendre les lois, réglementations, et procédures administratives algériennes. Posez-moi vos questions !',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Quelles sont les procédures pour créer une entreprise ?",
    "Comment calculer les congés payés selon le code du travail ?",
    "Quels sont les délais de prescription en droit commercial ?",
    "Comment faire une déclaration fiscale pour une SARL ?",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Voici une réponse détaillée à votre question "${inputMessage}". Selon la législation algérienne en vigueur, les dispositions applicables sont les suivantes...\n\nLes points clés à retenir sont :\n• Première disposition importante\n• Deuxième élément à considérer\n• Troisième aspect réglementaire\n\nPour plus de précisions, n'hésitez pas à me poser des questions de suivi.`,
        timestamp: new Date(),
        sources: [
          { title: 'Code du travail - Loi n° 90-11', type: 'Loi', relevance: 95 },
          { title: 'Décret d\'application n° 91-05', type: 'Décret', relevance: 88 }
        ]
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful } : msg
    ));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <Bot className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Assistant Juridique IA</h1>
            <p className="text-green-100">Votre conseiller juridique intelligent disponible 24h/24</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl flex space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                
                <div className={`rounded-xl p-4 ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-50 text-slate-900'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.sources && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs font-medium text-slate-600 mb-2">Sources consultées :</p>
                      <div className="space-y-2">
                        {message.sources.map((source, index) => (
                          <div key={index} className="flex items-center justify-between text-xs bg-white rounded p-2">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-3 w-3 text-slate-400" />
                              <span className="font-medium">{source.title}</span>
                              <span className="text-slate-500">({source.type})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-12 bg-slate-200 rounded-full h-1">
                                <div 
                                  className="bg-green-500 h-1 rounded-full" 
                                  style={{ width: `${source.relevance}%` }}
                                ></div>
                              </div>
                              <span className="text-slate-600">{source.relevance}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>{message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className={`p-1 rounded hover:bg-slate-200 transition-colors ${
                            message.helpful === true ? 'text-green-600' : 'text-slate-400'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className={`p-1 rounded hover:bg-slate-200 transition-colors ${
                            message.helpful === false ? 'text-red-600' : 'text-slate-400'
                          }`}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-slate-200">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-slate-700">Questions fréquentes</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm text-slate-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Posez votre question juridique..."
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Envoyer</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            L'assistant utilise les dernières données juridiques algériennes. Vérifiez toujours les informations pour des décisions importantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assistant;