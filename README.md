# Multi-AI Bot Conversation 🎭

A crazy experiment where four AI bots with distinct personalities engage in chaotic, entertaining conversations using different AI models and APIs.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb)

![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Jupyter](https://img.shields.io/badge/jupyter-notebook-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

This project creates a multi-AI conversation between bots, each powered by a different AI service and programmed with unique, entertaining personalities. Watch as they interact, argue, and create hilarious conversations!

### Features

- **4 Unique AI Personalities**: Each bot has a distinct character that shapes their responses
- **Multi-API Support**: Uses OpenAI, Google Gemini, OpenRouter, and Groq APIs
- **Free Tier Friendly**: Configured to work with free/low-cost models
- **Easy Setup**: Simple environment configuration and Jupyter notebook execution
- **Google Colab Ready**: Can run directly in Google Colab

## 🤖 Character Personalities

Each bot has a distinct personality that creates entertaining and chaotic conversations:

### 1. The Hot-Head Fighter (gpt-mini)
Explodes over minor issues and treats every disagreement like a final boss battle. Talks fast, interrupts often, and is always "this close" to proving a point. Secretly cools down the moment snacks appear.

### 2. The Sarcastic Instigator (gemini-flash)
Never raises their voice—because sarcasm does all the damage. Delivers calm, cutting one-liners that escalate fights while pretending to be innocent. Enjoys chaos but claims it is "for entertainment purposes only."

### 3. The Zen Coolhead (openrouter-deepseek)
Unbothered by everything, even while a fight is happening around them. Responds to insults with philosophical statements and awkwardly timed smiles. Somehow annoys everyone more by staying calm.

### 4. The Dramatic Peacemaker (groq-compound)
Claims to hate conflict but makes it ten times more dramatic. Over-explains emotions, gives emotional speeches, and tries to hug people mid-argument. Usually the reason the fight becomes funny instead of serious.

## 📋 Prerequisites

- Python 3.8 or higher
- Jupyter Notebook (or JupyterLab)
- API keys for at least one of the following services:
  - OpenAI
  - Google Gemini
  - OpenRouter
  - Groq

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/techVasanthsmart/Multi-AI-Bot-Conversation.git
cd Multi-AI-Bot-Conversation
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

Or if you prefer using a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API keys:
   ```env
   OPENAI_API_KEY=your_actual_openai_key
   GEMINI_API_KEY=your_actual_gemini_key
   OPENROUTER_API_KEY=your_actual_openrouter_key
   GROQ_API_KEY=your_actual_groq_key
   ```

   **Note**: You don't need all four API keys. The project will work with at least one configured.

### 4. Get API Keys

#### OpenAI
- Visit: https://platform.openai.com/api-keys
- Sign up or log in
- Create a new API key
- Free tier available with limited credits

#### Google Gemini
- Visit: https://makersuite.google.com/app/apikey
- Sign in with your Google account
- Create a new API key
- Generous free tier available

#### OpenRouter
- Visit: https://openrouter.ai/keys
- Sign up for an account
- Create a new API key
- Free models available (like DeepSeek)

#### Groq
- Visit: https://console.groq.com/keys
- Sign up for an account
- Create a new API key
- Free tier with rate limits

## 🎮 Running the Project

### Option 1: Local Jupyter Notebook

1. Start Jupyter Notebook:
   ```bash
   jupyter notebook
   ```

2. Open `multi-ai-conversation.ipynb`

3. Run all cells (Cell → Run All) or run cells sequentially

### Option 2: Google Colab

**Quick Start**: Click the "Open in Colab" badge at the top of this README, or use the direct link: [Open in Google Colab](https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb)

For detailed Colab setup instructions, see [COLAB_SETUP.md](COLAB_SETUP.md).

**Quick Setup Steps**:

1. Click the Colab badge above or open the notebook directly in Colab
2. Install dependencies in the first cell:
   ```python
   !pip install python-dotenv openai
   ```
3. Set up environment variables using one of these methods:
   - **Method 1 (Recommended)**: Use Colab Secrets (see [COLAB_SETUP.md](COLAB_SETUP.md) for details)
   - **Method 2**: Set environment variables directly in cells (for quick testing)
4. Run all cells

## ⚙️ Configuration

### Model Selection

The project supports both free and paid models. Edit your `.env` file to change models:

#### Free Tier Models (Zero Cost)

- **OpenAI**: `gpt-3.5-turbo` (free tier) or `gpt-4o-mini` (very cheap, ~$0.15/1M tokens)
- **Gemini**: `gemini-2.0-flash-exp` (generous free tier)
- **OpenRouter**: `deepseek/deepseek-r1-0528:free` (completely free)
- **Groq**: `llama-3.1-8b-instant` or `mixtral-8x7b-32768` (free tier)

#### Paid/Latest Models (For Enhanced Conversations)

**💡 Pro Tip**: For more interesting, nuanced, and "crazy" conversations, try upgrading to paid/latest models:

- **OpenAI**: `gpt-4o`, `gpt-4-turbo`, or `gpt-4` for better reasoning and character consistency
- **Gemini**: `gemini-2.0-flash-thinking-exp-0019` or `gemini-pro` for more sophisticated responses
- **OpenRouter**: `anthropic/claude-3.5-sonnet`, `openai/gpt-4o`, or `google/gemini-pro-1.5`
- **Groq**: Latest models with higher context windows for longer, more coherent conversations

**Note**: Paid models typically provide:
- Better character consistency
- More creative and nuanced responses
- Improved understanding of context
- More entertaining and dynamic conversations

### Customizing Conversations

You can modify the conversation parameters in the notebook:

- **Initial conversation**: Edit the `conversation` list to change the starting messages
- **Number of rounds**: Change the `range(5)` to run more or fewer conversation rounds
- **System prompts**: Modify the personality descriptions to create different characters

## 📊 Example Output

The conversation starts with an initial greeting:

```
### gpt-mini:
Hi, gpt ,gemini, openrouter and groq
```

This sets the stage for the chaotic multi-AI conversation that follows, with each bot responding in character and creating entertaining interactions.

## 🐛 Troubleshooting

### API Key Errors

**Error**: `Model not specified for [speaker_name]`
- **Solution**: Make sure you've set the corresponding model in your `.env` file (e.g., `OPENAI_MODEL`, `GOOGLE_MODEL`, etc.)

**Error**: `Error calling API for [speaker_name]`
- **Solution**: 
  - Verify your API key is correct
  - Check if you have sufficient credits/quota
  - Ensure the model name is correct for your API provider

### Import Errors

**Error**: `ModuleNotFoundError: No module named 'dotenv'`
- **Solution**: Run `pip install -r requirements.txt`

### Environment Variable Issues

**Error**: Environment variables not loading
- **Solution**: 
  - Ensure `.env` file exists in the project root
  - Check that variable names match exactly (case-sensitive)
  - Restart Jupyter kernel after changing `.env` file

### Rate Limiting

**Error**: Rate limit exceeded
- **Solution**: 
  - Wait a few minutes before retrying
  - Consider using free tier models with higher rate limits
  - Upgrade to paid tier if needed

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Groq API Documentation](https://console.groq.com/docs)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new bot personalities
- Improve conversation logic
- Add support for more AI providers
- Enhance documentation
- Fix bugs

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Vasanth Kumar**

- GitHub: [@techVasanthsmart](https://github.com/techVasanthsmart)
- LinkedIn: [Vasanth Kumar S](https://www.linkedin.com/in/vasanthkumar-s-0995a5185/)

## ⭐ Acknowledgments

- Thanks to OpenAI, Google, OpenRouter, and Groq for providing amazing AI APIs
- Inspired by the idea of creating entertaining multi-AI conversations

## 🎉 Have Fun!

Enjoy watching your AI bots have chaotic conversations! Feel free to experiment with different personalities, models, and conversation topics.

---

**Note**: This is a fun experimental project. The conversations are generated by AI and may contain unexpected or humorous content. Use responsibly!
