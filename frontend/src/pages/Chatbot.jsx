import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Chatbot() {
  const navigate = useNavigate()
  const [chatState, setChatState] = useState('closed') // 'closed', 'open'
  const [viewState, setViewState] = useState('chat') // 'chat', 'navigation', 'confirmation', 'form'
  const [selectedPage, setSelectedPage] = useState(null)
  const [messageHistory, setMessageHistory] = useState([
    {
      id: 1,
      text: 'Hello, how can i assist you?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [displayedThinkingText, setDisplayedThinkingText] = useState('')
  const [isWriting, setIsWriting] = useState(false)
  const [isThinking, setIsThinking] = useState(true)
  const [currentFormQuestion, setCurrentFormQuestion] = useState(0)
  const [formAnswers, setFormAnswers] = useState({})
  const [multiChoiceSelections, setMultiChoiceSelections] = useState([])
  const messagesEndRef = useRef(null)

  const navigationItems = [
    { name: 'Dashboard', path: '/build', hasForm: false },
    { name: 'Build', path: '/outcome', hasForm: true },
    { name: 'Analysis', path: '/outcome', hasForm: false },
  ]

  const buildFormQuestions = [
    // Step 1: Project & Service
    {
      id: 'projectName',
      question: 'What is your project name?',
      type: 'text',
      placeholder: 'Enter project name',
    },
    {
      id: 'serviceStages',
      question: 'Which service stages are in scope?',
      type: 'multichoice',
      options: ['Design & Set-up (DS)', 'Build & Delivery (BD)', 'Operation (O)', 'End of Life (EL)'],
    },

    // Step 2: Tech & Cloud
    {
      id: 'cloudProvider',
      question: 'Which cloud provider do you use?',
      type: 'choice',
      options: ['Azure', 'AWS', 'Other'],
    },
    {
      id: 'cloudRegion',
      question: 'Which cloud region?',
      type: 'choice',
      options: ['UK', 'Ireland', 'West Europe', 'North Europe', 'US - Avg', 'US - West', 'Canada', 'Australia', 'India'],
    },
    {
      id: 'storageClass',
      question: 'What storage class will you use?',
      type: 'choice',
      options: ['Live', 'Archive'],
    },

    // Step 3: AI / Compute Intensity
    {
      id: 'modelTraining',
      question: 'Will you use model training?',
      type: 'choice',
      options: ['Yes', 'No'],
    },

    // Step 4: Team & Delivery
    {
      id: 'teamSize',
      question: 'How many people are in your team?',
      type: 'text',
      placeholder: 'Enter team size',
    },
    {
      id: 'workingPattern',
      question: 'What is your working pattern?',
      type: 'choice',
      options: ['Office', 'Work from home', 'Hybrid'],
    },

    // Step 5: Region & Location
    {
      id: 'primaryOffice',
      question: 'Where is your primary office located?',
      type: 'text',
      placeholder: 'Enter city or region',
    },
    {
      id: 'travelMode',
      question: 'What is your primary mode of commute?',
      type: 'choice',
      options: ['Car', 'Train', 'Bus', 'Tube/Metro', 'Mixed'],
    },

    // Step 6: Duration & Usage
    {
      id: 'designSetupDuration',
      question: 'How long is the Design & Setup phase (in days)?',
      type: 'text',
      placeholder: 'Enter number of days',
    },
    {
      id: 'buildDeliveryDuration',
      question: 'How long is the Build & Delivery phase (in days)?',
      type: 'text',
      placeholder: 'Enter number of days',
    },
    {
      id: 'operationDuration',
      question: 'How long will the operation phase last (in years)?',
      type: 'text',
      placeholder: 'Enter number of years',
    },
    {
      id: 'estimatedDataStored',
      question: 'How much data will be stored (in MB)?',
      type: 'text',
      placeholder: 'Enter amount in MB',
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageHistory, currentMessageIndex])

  // Typing animation effect
  useEffect(() => {
    const currentMessage = messageHistory[currentMessageIndex]?.text || 'Hello, how can i assist you?'

    // Different thinking text based on context
    let thinkingMessage = '>Trying to break the ice... not literally'

    if (viewState === 'confirmation') {
      thinkingMessage = '>Preparing navigation options...'
    } else if (viewState === 'form') {
      if (currentFormQuestion === 0) {
        thinkingMessage = '>Setting up your project configuration...'
      } else if (currentFormQuestion < 5) {
        thinkingMessage = '>Processing your response...'
      } else if (currentFormQuestion < 10) {
        thinkingMessage = '>Calculating environmental impact...'
      } else {
        thinkingMessage = '>Almost done, finalizing details...'
      }
    }

    if (viewState === 'chat' || viewState === 'confirmation' || viewState === 'form') {
      setDisplayedText('Thinking...')
      setDisplayedThinkingText('')
      setIsWriting(false)
      setIsThinking(true)

      // First, type out the thinking text
      let thinkingCharIndex = 0
      const thinkingInterval = setInterval(() => {
        if (thinkingCharIndex <= thinkingMessage.length) {
          setDisplayedThinkingText(thinkingMessage.slice(0, thinkingCharIndex))
          thinkingCharIndex++
        } else {
          clearInterval(thinkingInterval)
          setIsThinking(false)
          setIsWriting(true)
          setDisplayedText('')

          // Then start typing the main message
          let charIndex = 0
          const typingInterval = setInterval(() => {
            if (charIndex <= currentMessage.length) {
              setDisplayedText(currentMessage.slice(0, charIndex))
              charIndex++
            } else {
              setIsWriting(false)
              clearInterval(typingInterval)
            }
          }, 30) // 30ms per character for smooth typing
        }
      }, 20) // 20ms per character for thinking text (slightly faster)

      return () => {
        clearInterval(thinkingInterval)
      }
    }
  }, [currentMessageIndex, messageHistory, viewState, currentFormQuestion])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userInputText = inputMessage
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now(),
        text: getBotResponse(userInputText),
        sender: 'bot',
        timestamp: new Date(),
      }
      // Add new message to history
      setMessageHistory((prev) => [...prev, botMessage])
      // Set current index to the newest message
      setCurrentMessageIndex((prev) => prev + 1)
      setIsTyping(false)
    }, 1000)
  }

  const handlePrevious = () => {
    if (viewState === 'form') {
      if (currentFormQuestion > 0) {
        // Go back to previous form question
        setCurrentFormQuestion(currentFormQuestion - 1)
        setCurrentMessageIndex(currentMessageIndex - 1)
      } else {
        // Go back to confirmation
        setViewState('confirmation')
        setCurrentFormQuestion(0)
        setFormAnswers({})
      }
    } else if (viewState === 'confirmation') {
      setViewState('navigation')
      setSelectedPage(null)
    } else if (viewState === 'navigation') {
      setViewState('chat')
    } else if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1)
    }
  }

  const handleInputFocus = () => {
    setViewState('navigation')
  }

  const handlePageSelect = (page) => {
    setSelectedPage(page)
    setViewState('confirmation')
    // Update the message to the confirmation question
    const confirmationMessage = {
      id: Date.now(),
      text: `Do you want to go to ${page.name}?`,
      sender: 'bot',
      timestamp: new Date(),
    }
    setMessageHistory((prev) => [...prev, confirmationMessage])
    setCurrentMessageIndex((prev) => prev + 1)
  }

  const handleConfirmYes = () => {
    if (selectedPage) {
      // If the selected page has a form, start the form flow
      if (selectedPage.hasForm) {
        setViewState('form')
        setCurrentFormQuestion(0)
        setFormAnswers({})
        // Add first question to message history
        const firstQuestion = buildFormQuestions[0]
        const questionMessage = {
          id: Date.now(),
          text: firstQuestion.question,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessageHistory((prev) => [...prev, questionMessage])
        setCurrentMessageIndex((prev) => prev + 1)
      } else {
        // Otherwise navigate normally
        navigate(selectedPage.path)
        setViewState('chat')
        setSelectedPage(null)
        setChatState('closed')
      }
    }
  }

  const handleConfirmNo = () => {
    setViewState('navigation')
    setSelectedPage(null)
  }

  const handleFormAnswer = (answer) => {
    const currentQuestion = buildFormQuestions[currentFormQuestion]

    // Store the answer
    setFormAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))

    // Reset multi-choice selections
    setMultiChoiceSelections([])

    // Move to next question or finish
    if (currentFormQuestion < buildFormQuestions.length - 1) {
      const nextQuestionIndex = currentFormQuestion + 1
      const nextQuestion = buildFormQuestions[nextQuestionIndex]

      setCurrentFormQuestion(nextQuestionIndex)

      // Add next question to message history
      const questionMessage = {
        id: Date.now(),
        text: nextQuestion.question,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessageHistory((prev) => [...prev, questionMessage])
      setCurrentMessageIndex((prev) => prev + 1)
    } else {
      // Form complete - navigate to the page
      console.log('Form complete:', formAnswers)
      navigate(selectedPage.path)
      setViewState('chat')
      setSelectedPage(null)
      setChatState('closed')
      setCurrentFormQuestion(0)
      setFormAnswers({})
    }
  }

  const handleMultiChoiceToggle = (option) => {
    setMultiChoiceSelections((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option)
      } else {
        return [...prev, option]
      }
    })
  }

  const handleMultiChoiceContinue = () => {
    if (multiChoiceSelections.length > 0) {
      handleFormAnswer(multiChoiceSelections)
    }
  }

  const handleBackToChat = () => {
    setViewState('chat')
    setSelectedPage(null)
  }

  const handleCloseAll = () => {
    setChatState('closed')
    setViewState('chat')
    setSelectedPage(null)
  }

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! How can I assist you with your carbon emissions calculations today?'
    } else if (input.includes('help')) {
      return 'I can help you with:\n• Building emission scenarios\n• Understanding lifecycle stages\n• Interpreting your results\n• Comparing scenarios\n• Navigating to different pages\n\nType "dashboard" to see navigation options!'
    } else if (input.includes('scenario') || input.includes('build')) {
      return 'To build a scenario, click on "Build" in the sidebar. You\'ll go through 6 steps to input your project details, cloud configuration, team information, and more.'
    } else if (input.includes('lifecycle') || input.includes('stage')) {
      return 'We track emissions across 4 lifecycle stages:\n• Design & Setup (DS)\n• Build & Delivery (BD)\n• Operations (O)\n• End of Life (EL)\n\nEach stage has different emission calculations.'
    } else if (input.includes('result') || input.includes('outcome')) {
      return 'After building your scenario, you can view detailed outcomes including lifecycle breakdowns, scope emissions, and compare different scenarios to see potential savings.'
    } else if (input.includes('scope')) {
      return 'Emissions are categorized into 3 scopes:\n• Scope 1: Direct emissions\n• Scope 2: Indirect emissions from energy\n• Scope 3: Other indirect emissions\n\nYou can see the breakdown in your outcome page.'
    } else {
      return 'I\'m here to help! You can ask me about building scenarios, understanding emissions, or navigating the app. Type "dashboard" to see all available pages!'
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      {/* Full chat interface */}
      {chatState === 'open' && (
        <div className="fixed bottom-24 right-6 w-[600px] h-[600px] bg-white rounded-2xl shadow-2xl border border-[#e5e7eb] flex flex-col z-50 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="relative px-6 py-4 border-b-2 border-[#00C6C2] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              {(viewState === 'navigation' || viewState === 'confirmation' || viewState === 'form') ? (
                <button
                  onClick={handlePrevious}
                  className="text-[#00C6C2] hover:text-[#00B0AC] transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm">Previous</span>
                </button>
              ) : (
                currentMessageIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="text-[#00C6C2] hover:text-[#00B0AC] transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm">Previous</span>
                  </button>
                )
              )}
            </div>
            <span className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-normal text-black">
              {(viewState === 'confirmation' || viewState === 'form') && selectedPage ? selectedPage.name : 'Title:'}
            </span>
            <button
              onClick={() => {
                setChatState('closed')
                setViewState('chat')
                setSelectedPage(null)
                setCurrentFormQuestion(0)
                setFormAnswers({})
                setMultiChoiceSelections([])
              }}
              className="text-black hover:text-[#6b7280] transition-colors text-2xl leading-none"
            >
              X
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {viewState === 'navigation' ? (
              /* Navigation Menu */
              <div className="space-y-2">
                <div className="text-sm font-medium text-black mb-4 pb-3 border-b border-[#e5e7eb]">
                  Navigate
                </div>
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageSelect(item)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-black hover:bg-[#f9fafb] transition-colors border-b border-[#e5e7eb]"
                  >
                    <span>{item.name}</span>
                    <span className="text-[#9ca3af]">›</span>
                  </button>
                ))}
              </div>
            ) : viewState === 'confirmation' ? (
              /* Confirmation View */
              <div className="flex flex-col h-full px-8">
                <div className="flex flex-col justify-center flex-1 max-w-4xl">
                  <div className="flex items-start gap-6">
                    <img
                      src="/ai-avatar.png"
                      alt="AI Assistant"
                      className="w-24 h-24 rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col">
                      <p className="text-xl text-[#64748b] mb-4">
                        {displayedThinkingText}
                        {isThinking && <span className="inline-block w-0.5 h-5 bg-[#64748b] ml-1 animate-pulse"></span>}
                      </p>
                      <p className="text-3xl text-black font-medium">
                        {displayedText}
                        {isWriting && <span className="inline-block w-0.5 h-8 bg-black ml-1 animate-pulse"></span>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 ml-auto w-80 pb-4">
                  <button
                    onClick={handleConfirmYes}
                    className="w-full h-14 bg-[#00C6C2] hover:bg-[#00B0AC] text-white text-base font-medium rounded-full transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleConfirmNo}
                    className="w-full h-14 bg-white hover:bg-[#f9fafb] text-black text-base font-medium rounded-full border-2 border-[#00C6C2] transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : viewState === 'form' ? (
              /* Form View */
              <div className="flex flex-col h-full px-8">
                <div className="flex flex-col justify-center flex-1 max-w-4xl">
                  <div className="flex items-start gap-6 mb-8">
                    <img
                      src="/ai-avatar.png"
                      alt="AI Assistant"
                      className="w-24 h-24 rounded-full object-cover shrink-0"
                    />
                    <div className="flex flex-col">
                      <p className="text-xl text-[#64748b] mb-4">
                        {displayedThinkingText}
                        {isThinking && <span className="inline-block w-0.5 h-5 bg-[#64748b] ml-1 animate-pulse"></span>}
                      </p>
                      <p className="text-3xl text-black font-medium">
                        {displayedText}
                        {isWriting && <span className="inline-block w-0.5 h-8 bg-black ml-1 animate-pulse"></span>}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Input Area */}
                {!isThinking && !isWriting && (
                  <div className="pb-4">
                    {buildFormQuestions[currentFormQuestion]?.type === 'text' ? (
                      /* Text Input */
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (inputMessage.trim()) {
                            handleFormAnswer(inputMessage)
                            setInputMessage('')
                          }
                        }}
                        className="relative"
                      >
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder={buildFormQuestions[currentFormQuestion]?.placeholder || 'Type your answer...'}
                          className="w-full h-14 bg-white border border-[#e5e7eb] rounded-full px-6 text-base text-black placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                          autoFocus
                        />
                        <button
                          type="submit"
                          disabled={!inputMessage.trim()}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#00C6C2] hover:bg-[#00B0AC] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </form>
                    ) : buildFormQuestions[currentFormQuestion]?.type === 'multichoice' ? (
                      /* Multi-choice Selection */
                      <div className="flex flex-col gap-3 ml-auto w-80">
                        {buildFormQuestions[currentFormQuestion]?.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleMultiChoiceToggle(option)}
                            className={`w-full h-14 text-base font-medium rounded-full transition-colors border-2 ${
                              multiChoiceSelections.includes(option)
                                ? 'bg-[#00C6C2] text-white border-[#00C6C2]'
                                : 'bg-white text-black border-[#00C6C2] hover:bg-[#f9fafb]'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                        <button
                          onClick={handleMultiChoiceContinue}
                          disabled={multiChoiceSelections.length === 0}
                          className="w-full h-14 bg-[#00C6C2] hover:bg-[#00B0AC] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-white text-base font-medium rounded-full transition-colors mt-2"
                        >
                          Continue
                        </button>
                      </div>
                    ) : (
                      /* Single Choice Buttons */
                      <div className="flex flex-col gap-3 ml-auto w-80">
                        {buildFormQuestions[currentFormQuestion]?.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleFormAnswer(option)}
                            className="w-full h-14 bg-[#00C6C2] hover:bg-[#00B0AC] text-white text-base font-medium rounded-full transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Regular Chat Messages */
              <div className="flex flex-col justify-center h-full px-8">
                <div className="flex items-start gap-6 max-w-4xl">
                  <img
                    src="/ai-avatar.png"
                    alt="AI Assistant"
                    className="w-24 h-24 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col">
                    <p className="text-xl text-[#64748b] mb-4">
                      {displayedThinkingText}
                      {isThinking && <span className="inline-block w-0.5 h-5 bg-[#64748b] ml-1 animate-pulse"></span>}
                    </p>
                    <p className="text-3xl text-black font-medium">
                      {displayedText}
                      {isWriting && <span className="inline-block w-0.5 h-8 bg-black ml-1 animate-pulse"></span>}
                    </p>
                  </div>
                </div>

                {isTyping && (
                  <div className="flex items-start gap-3 mt-6">
                    <img
                      src="/ai-avatar.png"
                      alt="AI Assistant"
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                    <div className="bg-[#f3f4f6] rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input - Only shown in chat view */}
          {viewState === 'chat' && (
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-[#e5e7eb] rounded-b-2xl shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder="e.g Dashboard"
                  className="w-full h-14 bg-white border border-[#e5e7eb] rounded-full px-6 text-base text-black placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00C6C2] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#00C6C2] hover:bg-[#00B0AC] disabled:bg-[#e5e7eb] disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Floating Button - Closed state */}
      {chatState === 'closed' && (
        <button
          onClick={() => setChatState('open')}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#00C6C2] hover:bg-[#00B0AC] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </>
  )
}

export default Chatbot
