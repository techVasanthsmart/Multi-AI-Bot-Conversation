# Google Colab Setup Guide

Complete guide for running the Multi-AI Bot Conversation project in Google Colab.

## 🚀 Quick Start

### Option 1: One-Click Open in Colab

Click the badge below to open the notebook directly in Google Colab:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb)

### Option 2: Direct Link

Copy and paste this URL in your browser:
```
https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb
```

## 📋 Prerequisites

- Google account (free)
- API keys for at least one AI service:
  - OpenAI
  - Google Gemini
  - OpenRouter
  - Groq

## 🔧 Step-by-Step Setup

### Step 1: Open the Notebook in Colab

1. Click the Colab badge above, or
2. Go to [Google Colab](https://colab.research.google.com/)
3. Click **File** → **Open Notebook**
4. Select the **GitHub** tab
5. Enter your repository URL: `techVasanthsmart/Multi-AI-Bot-Conversation`
6. Select `multi-ai-conversation.ipynb`

### Step 2: Install Dependencies

The notebook will automatically install dependencies, but if needed, run this in a new cell:

```python
!pip install python-dotenv openai
```

### Step 3: Set Up API Keys

Choose one of the methods below to configure your API keys.

## 🔐 Method 1: Using Colab Secrets (Recommended)

Colab Secrets is the most secure way to store API keys in Colab.

### Setting Up Secrets

1. Click the **key icon** (🔑) in the left sidebar of Colab
2. Click **+ Add Secret**
3. Add each API key with these exact names:
   - `OPENAI_API_KEY` → Your OpenAI API key
   - `GEMINI_API_KEY` → Your Google Gemini API key
   - `OPENROUTER_API_KEY` → Your OpenRouter API key
   - `GROQ_API_KEY` → Your Groq API key

4. Add model names (also as secrets or environment variables):
   - `OPENAI_MODEL` → e.g., `gpt-4o-mini`
   - `GOOGLE_MODEL` → e.g., `gemini-2.0-flash-exp`
   - `OPENROUTER_MODEL` → e.g., `deepseek/deepseek-r1-0528:free`
   - `GROQ_MODEL` → e.g., `llama-3.1-8b-instant`

### Using Secrets in the Notebook

Add this cell **before** the cell that loads environment variables:

```python
from google.colab import userdata
import os

# Load API keys from Colab Secrets
os.environ['OPENAI_API_KEY'] = userdata.get('OPENAI_API_KEY')
os.environ['GEMINI_API_KEY'] = userdata.get('GEMINI_API_KEY')
os.environ['OPENROUTER_API_KEY'] = userdata.get('OPENROUTER_API_KEY')
os.environ['GROQ_API_KEY'] = userdata.get('GROQ_API_KEY')

# Load model names
os.environ['OPENAI_MODEL'] = userdata.get('OPENAI_MODEL')
os.environ['GOOGLE_MODEL'] = userdata.get('GOOGLE_MODEL')
os.environ['OPENROUTER_MODEL'] = userdata.get('OPENROUTER_MODEL')
os.environ['GROQ_MODEL'] = userdata.get('GROQ_MODEL')
```

## 🔐 Method 2: Direct Environment Variables (Quick Testing)

For quick testing, you can set environment variables directly in cells. **Note**: This is less secure as keys are visible in the notebook.

### Add This Cell Before Loading Environment Variables

```python
import os

# Set your API keys directly (replace with your actual keys)
os.environ['OPENAI_API_KEY'] = 'your-openai-api-key-here'
os.environ['GEMINI_API_KEY'] = 'your-gemini-api-key-here'
os.environ['OPENROUTER_API_KEY'] = 'your-openrouter-api-key-here'
os.environ['GROQ_API_KEY'] = 'your-groq-api-key-here'

# Set model names
os.environ['OPENAI_MODEL'] = 'gpt-4o-mini'
os.environ['GOOGLE_MODEL'] = 'gemini-2.0-flash-exp'
os.environ['OPENROUTER_MODEL'] = 'deepseek/deepseek-r1-0528:free'
os.environ['GROQ_MODEL'] = 'llama-3.1-8b-instant'
```

**Security Warning**: If you use this method, make sure to:
- Clear the cell output before sharing
- Don't commit this cell to version control
- Use Colab Secrets for production use

## 🔐 Method 3: Upload .env File

1. Create a `.env` file locally with your API keys (see `.env.example`)
2. In Colab, click the **folder icon** (📁) in the left sidebar
3. Click **Upload** and select your `.env` file
4. The notebook will automatically load it using `python-dotenv`

## ▶️ Running the Notebook

1. **Run All Cells**: Go to **Runtime** → **Run all**
2. **Run Sequentially**: Click each cell and press **Shift + Enter**
3. **Run from Current Cell**: Click a cell and press **Ctrl + Enter**

The conversation will start automatically and display in the notebook output.

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'dotenv'"

**Solution**: Install dependencies in a new cell:
```python
!pip install python-dotenv openai
```

### Issue: "Model not specified for [speaker_name]"

**Solution**: 
- Check that you've set the model environment variables (e.g., `OPENAI_MODEL`, `GOOGLE_MODEL`)
- Verify the variable names match exactly (case-sensitive)
- Restart the runtime after setting environment variables

### Issue: "Error calling API for [speaker_name]"

**Solutions**:
1. **Invalid API Key**: Verify your API key is correct
2. **Rate Limit**: Wait a few minutes and try again
3. **Insufficient Credits**: Check your API provider dashboard for remaining credits
4. **Wrong Model Name**: Ensure the model name matches your API provider's available models

### Issue: "userdata.get() KeyError"

**Solution**: 
- Make sure you've added the secret in Colab Secrets (🔑 icon)
- Verify the secret name matches exactly (case-sensitive)
- Try using Method 2 (direct environment variables) as an alternative

### Issue: Session Disconnected

**Solutions**:
- Colab sessions timeout after inactivity (~90 minutes)
- Click **Runtime** → **Connect** to reconnect
- Re-run cells from the beginning if needed
- Consider saving your work periodically

### Issue: Environment Variables Not Persisting

**Solution**:
- Set environment variables in a cell **before** the cell that uses them
- Run cells in order
- Restart runtime if variables aren't loading: **Runtime** → **Restart runtime**

## 💡 Best Practices

### 1. Secure API Key Management

- ✅ **Use Colab Secrets** for API keys (Method 1)
- ❌ **Don't** hardcode API keys in cells
- ❌ **Don't** commit API keys to GitHub
- ✅ Clear cell outputs before sharing notebooks

### 2. Session Management

- **Save Frequently**: Colab auto-saves, but you can also download the notebook
- **Export Results**: Download conversation outputs if you want to keep them
- **Session Limits**: Free Colab has usage limits; consider upgrading for longer sessions

### 3. Model Selection

- **Start with Free Models**: Test with free tier models first
- **Monitor Costs**: Keep track of API usage if using paid models
- **Experiment**: Try different models to see which create the best conversations

### 4. Performance Tips

- **Run Cells Sequentially**: Helps identify issues early
- **Check Outputs**: Verify each cell runs successfully before proceeding
- **Restart if Needed**: If something seems off, restart runtime and re-run

### 5. Sharing and Collaboration

- **Share Notebooks**: Use Colab's sharing feature to collaborate
- **Clear Sensitive Data**: Remove API keys before sharing
- **Export Formats**: Download as `.ipynb` or `.py` for local use

## 📊 Colab vs Local Setup

| Feature | Google Colab | Local Jupyter |
|---------|-------------|---------------|
| Setup Time | Instant | Requires installation |
| API Keys | Colab Secrets | `.env` file |
| Dependencies | Auto-install | Manual install |
| Persistence | Session-based | Permanent |
| Cost | Free (with limits) | Free |
| GPU Access | Free tier available | Requires local GPU |

## 🔗 Additional Resources

- [Google Colab Documentation](https://colab.research.google.com/notebooks/intro.ipynb)
- [Colab Secrets Guide](https://colab.research.google.com/notebooks/snippets/secrets.ipynb)
- [Colab FAQ](https://research.google.com/colaboratory/faq.html)

## 🎯 Quick Reference

### Colab Badge Code (for README)

```html
<a href="https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb" target="_parent">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
```

### Markdown Badge (for README)

```markdown
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb)
```

### Direct Colab Link Format

```
https://colab.research.google.com/github/techVasanthsmart/Multi-AI-Bot-Conversation/blob/master/multi-ai-conversation.ipynb
```

## ✅ Checklist

Before running the notebook, ensure:

- [ ] Notebook opened in Google Colab
- [ ] Dependencies installed (`python-dotenv`, `openai`)
- [ ] At least one API key configured
- [ ] At least one model name set
- [ ] Environment variables loaded successfully
- [ ] All cells ready to run

## 🆘 Need Help?

- Check the [README.md](README.md) for general setup instructions
- Review the troubleshooting section above
- Open an issue on GitHub if you encounter bugs
- Check API provider documentation for model availability

---

**Happy Conversing!** 🎭🤖

Enjoy watching your AI bots have chaotic conversations in Google Colab!
