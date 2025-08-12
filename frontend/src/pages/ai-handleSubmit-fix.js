  // Fixed handleSubmit function for AI recipe generation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isStreaming) return;

    const userInput = input.trim();
    setInput(""); // Clear input immediately
    setError("");

    try {
      let currentChatId = chatId;

      // Create new chat if none exists
      if (!currentChatId) {
        setIsLoading(true);
        try {
          const chatTitle = userInput.length > 30 
            ? `Recipe: ${userInput.substring(0, 30)}...`
            : `Recipe: ${userInput}`;
          const newChat = await aiService.createChat(chatTitle);
          setCurrentChat(newChat);
          setMessages([]);
          setOutput("");
          setError("");
          setStreamingOutput("");
          navigate(`/ai/${newChat._id}`);
          currentChatId = newChat._id;
          setIsLoading(false);
        } catch (chatError) {
          setError("Failed to create chat session. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      // Add user message to chat
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: userInput,
        timestamp: new Date().toISOString(),
        mode: selectedMode,
        restrictions: selectedRestrictions
      };

      setMessages(prev => [...prev, userMessage]);

      // For "idea" mode, use streaming
      if (selectedMode === "idea") {
        setIsStreaming(true);
        
        // Initialize the streaming formatter
        initializeStreamingFormatter();
        
        // Add AI message placeholder for streaming
        const aiMessageId = Date.now() + 1;
        const aiMessage = {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          isStreaming: true
        };
        
        setMessages(prev => [...prev, aiMessage]);

        try {
          await aiService.generateRecipeStream(
            currentChatId,
            userInput,
            "generate_recipe",
            // onChunk callback
            (chunkData) => {
              if (chunkData.chunk) {
                const formatted = processStreamingChunk(chunkData.chunk);
                setStreamingOutput(formatted);
                
                setMessages(prev => prev.map(msg => 
                  msg.id === aiMessageId 
                    ? { ...msg, content: formatted }
                    : msg
                ));
              }
            },
            // onComplete callback
            (completeData) => {
              setIsStreaming(false);
              
              let formattedOutput = "";
              if (streamingFormatterRef.current) {
                formattedOutput = streamingFormatterRef.current.getFormattedOutput();
              }
              
              if (!formattedOutput && completeData.data) {
                formattedOutput = formatRecipeDisplay(completeData.data, selectedMode);
              }
              
              if (!formattedOutput) {
                formattedOutput = completeData.fullText || "Recipe generated successfully!";
              }

              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: formattedOutput, 
                      isStreaming: false,
                      recipeData: completeData.data 
                    }
                  : msg
              ));
              
              setStreamingOutput("");
              loadChatHistory();
            },
            // onError callback
            (error) => {
              setIsStreaming(false);
              console.error("Streaming error:", error);
              
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { 
                      ...msg, 
                      content: "Sorry, I encountered an error while generating the recipe. Please try again.",
                      isStreaming: false,
                      isError: true
                    }
                  : msg
              ));
              
              setError("Failed to generate recipe: " + error.message);
              setStreamingOutput("");
            }
          );

        } catch (streamingError) {
          setIsStreaming(false);
          console.error("Streaming setup error:", streamingError);
          
          setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
          setError("Failed to start recipe generation. Please try again.");
          setStreamingOutput("");
        }

      } else {
        // Non-streaming modes (ingredients and adapt)
        setIsLoading(true);
        
        try {
          let response;
          
          if (selectedMode === "ingredients") {
            const ingredients = availableIngredients
              ? availableIngredients.split(",").map((i) => i.trim()).filter((i) => i)
              : [];
            response = await aiService.generateRecipeWithIngredients(
              currentChatId,
              userInput,
              ingredients,
              useInventory
            );
          } else if (selectedMode === "adapt") {
            if (recipeId) {
              response = await aiService.adaptExistingRecipe(currentChatId, null, userInput, recipeId);
            } else if (originalRecipe.title) {
              response = await aiService.adaptExistingRecipe(currentChatId, originalRecipe, userInput);
            } else {
              throw new Error("Please provide either a recipe ID or original recipe details to adapt");
            }
          }

          const recipeData = response.response?.recipeData;
          let formattedOutput = "";

          if (recipeData && typeof recipeData === "object") {
            formattedOutput = formatRecipeDisplay(recipeData, selectedMode);
          } else {
            formattedOutput = response.response?.content || "Recipe generated successfully!";
          }

          const aiMessage = {
            id: Date.now() + 1,
            role: 'assistant',
            content: formattedOutput,
            timestamp: new Date().toISOString(),
            recipeData: recipeData,
            mode: selectedMode
          };

          setMessages(prev => [...prev, aiMessage]);
          setIsLoading(false);
          loadChatHistory();

        } catch (apiError) {
          setIsLoading(false);
          console.error("API Error:", apiError);
          setError(apiError.message || "Failed to generate recipe. Please try again.");
        }
      }

    } catch (error) {
      console.error("General error in handleSubmit:", error);
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingOutput("");
      setError(error.message || "An unexpected error occurred. Please try again.");
    }
  };
