const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Import centralized configuration
const config = require('../../config/keys');

// Initialize OpenAI with centralized config
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Generate blog post ideas
router.post('/generate-ideas', authenticateToken, async (req, res) => {
  try {
    console.log('AI API Key:', config.openaiApiKey ? 'Present' : 'Missing');
    console.log('Request body:', req.body);
    
    const { topic, audience, tone } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const prompt = `Generate 5 creative blog post ideas about "${topic}" for an audience of ${audience}. 
    The tone should be ${tone}. 
    For each idea, provide:
    1. A catchy title
    2. A brief description (2-3 sentences)
    3. Key points to cover
    4. Estimated reading time
    
    Format the response as a JSON array with objects containing: title, description, keyPoints (array), readingTime.`;

    console.log('Sending request to OpenAI...');
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative content strategist who helps bloggers generate engaging post ideas."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      });

      console.log('OpenAI response received');
      
      const ideas = JSON.parse(completion.choices[0].message.content);
      res.json({ ideas });
    } catch (openaiError) {
      // If OpenAI fails due to quota, use mock responses
      if (openaiError.status === 429) {
        console.log('OpenAI quota exceeded, using mock responses');
        
        const mockIdeas = [
          {
            title: `The Ultimate Guide to ${topic}`,
            description: `Discover everything you need to know about ${topic} in this comprehensive guide. Perfect for ${audience} looking to master the fundamentals and advanced techniques.`,
            keyPoints: [`Introduction to ${topic}`, `Key concepts and principles`, `Practical applications`, `Advanced techniques`, `Best practices`],
            readingTime: "8-10 minutes"
          },
          {
            title: `${topic}: A Beginner's Journey`,
            description: `Follow along as we explore ${topic} from a beginner's perspective. This ${tone} guide breaks down complex concepts into easy-to-understand lessons.`,
            keyPoints: [`Getting started with ${topic}`, `Common misconceptions`, `Essential tools and resources`, `First steps to take`, `Building confidence`],
            readingTime: "5-7 minutes"
          },
          {
            title: `10 Surprising Facts About ${topic}`,
            description: `Uncover the hidden secrets and fascinating aspects of ${topic} that most people don't know about. This engaging article will change how you think about ${topic}.`,
            keyPoints: [`Historical background`, `Interesting statistics`, `Little-known facts`, `Modern applications`, `Future trends`],
            readingTime: "6-8 minutes"
          },
          {
            title: `${topic} vs. Traditional Methods: What You Need to Know`,
            description: `Compare ${topic} with traditional approaches and discover why modern methods are revolutionizing the field. Essential reading for ${audience}.`,
            keyPoints: [`Traditional vs modern approaches`, `Pros and cons comparison`, `When to use each method`, `Cost-benefit analysis`, `Making the right choice`],
            readingTime: "7-9 minutes"
          },
          {
            title: `The Future of ${topic}: Trends and Predictions`,
            description: `Explore the exciting future of ${topic} and discover what trends are shaping the industry. Stay ahead of the curve with these expert insights.`,
            keyPoints: [`Emerging trends`, `Technology advancements`, `Industry predictions`, `Preparing for the future`, `Opportunities ahead`],
            readingTime: "9-12 minutes"
          }
        ];
        
        res.json({ 
          ideas: mockIdeas,
          note: "Using demo responses due to OpenAI quota limits. Add billing to your OpenAI account for real AI-generated content."
        });
      } else {
        throw openaiError;
      }
    }
  } catch (error) {
    console.error('AI Error Details:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response?.data);
    
    if (error.response?.status === 401) {
      res.status(500).json({ message: 'OpenAI API key is invalid. Please check your API key.' });
    } else if (error.response?.status === 429) {
      res.status(500).json({ message: 'Rate limit exceeded. Please try again in a few minutes.' });
    } else if (error.message.includes('JSON')) {
      res.status(500).json({ message: 'Failed to parse AI response. Please try again.' });
    } else {
      res.status(500).json({ message: 'Failed to generate ideas', error: error.message });
    }
  }
});

// Generate content outline
router.post('/generate-outline', authenticateToken, async (req, res) => {
  try {
    const { title, topic, audience, contentLength } = req.body;

    const prompt = `Create a detailed content outline for a blog post titled "${title}" about ${topic}.
    Target audience: ${audience}
    Content length: ${contentLength}
    
    Provide a structured outline with:
    1. Introduction
    2. Main sections (with subsections)
    3. Conclusion
    4. Key takeaways
    
    Format as JSON with: introduction, sections (array of objects with title and subsections), conclusion, keyTakeaways (array).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert content strategist who creates detailed, engaging blog post outlines."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const outline = JSON.parse(completion.choices[0].message.content);
    res.json({ outline });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Failed to generate outline', error: error.message });
  }
});

// Improve existing content
router.post('/improve-content', authenticateToken, async (req, res) => {
  try {
    const { content, improvementType, tone } = req.body;

    let prompt = `Please improve the following blog content:\n\n${content}\n\n`;
    
    switch (improvementType) {
      case 'grammar':
        prompt += 'Fix grammar, spelling, and punctuation errors.';
        break;
      case 'clarity':
        prompt += 'Improve clarity and readability. Make sentences more concise and clear.';
        break;
      case 'engagement':
        prompt += 'Make the content more engaging and compelling. Add hooks and improve flow.';
        break;
      case 'seo':
        prompt += 'Optimize for SEO. Improve headings, add relevant keywords naturally, and enhance structure.';
        break;
      default:
        prompt += 'Improve overall quality, clarity, and engagement.';
    }

    if (tone) {
      prompt += ` Maintain a ${tone} tone throughout.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert content editor who improves blog posts while maintaining the author's voice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const improvedContent = completion.choices[0].message.content;
    res.json({ improvedContent });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Failed to improve content', error: error.message });
  }
});

// Generate social media posts
router.post('/generate-social', authenticateToken, async (req, res) => {
  try {
    const { blogContent, platform, tone } = req.body;

    const prompt = `Based on this blog content, generate 3 engaging social media posts for ${platform}:
    
    Blog Content: ${blogContent}
    
    Tone: ${tone}
    Platform: ${platform}
    
    For each post, provide:
    1. The post text
    2. Suggested hashtags
    3. Best posting time
    4. Engagement tips
    
    Format as JSON array with objects containing: text, hashtags (array), postingTime, engagementTips.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a social media expert who creates engaging posts that drive traffic to blog content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000
    });

    const socialPosts = JSON.parse(completion.choices[0].message.content);
    res.json({ socialPosts });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Failed to generate social posts', error: error.message });
  }
});

// Analyze content sentiment and suggestions
router.post('/analyze-content', authenticateToken, async (req, res) => {
  try {
    const { content, title } = req.body;

    const prompt = `Analyze this blog post and provide insights:
    
    Title: ${title}
    Content: ${content}
    
    Provide analysis in JSON format with:
    1. Sentiment (positive/negative/neutral)
    2. Readability score (1-10)
    3. Engagement potential (1-10)
    4. SEO score (1-10)
    5. Suggestions for improvement (array)
    6. Recommended audience
    7. Estimated reading time
    8. Key themes/topics identified`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a content analyst who provides detailed insights about blog posts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 800
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    res.json({ analysis });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Failed to analyze content', error: error.message });
  }
});

// Generate full blog content from an idea
router.post('/generate-blog-content', authenticateToken, async (req, res) => {
  try {
    console.log('Generating full blog content...');
    console.log('Request body:', req.body);
    
    const { title, description, keyPoints, tone, audience } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const prompt = `Write a complete blog post based on this information:

Title: ${title}
Description: ${description}
Key Points: ${keyPoints ? keyPoints.join(', ') : 'Not specified'}
Tone: ${tone || 'professional'}
Target Audience: ${audience || 'general audience'}

Please write a comprehensive blog post that:
1. Has an engaging introduction that hooks the reader
2. Covers all the key points mentioned
3. Is well-structured with clear sections
4. Maintains the specified tone throughout
5. Is appropriate for the target audience
6. Has a strong conclusion that summarizes the main points
7. Is between 800-1500 words

Write the content in a natural, engaging style that flows well.`;

    console.log('Sending request to OpenAI for full blog content...');
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert content writer who creates engaging, well-structured blog posts. Write in a natural, conversational style that connects with readers."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      console.log('OpenAI response received for full blog content');
      
      const fullContent = completion.choices[0].message.content;
      
      // Create a new blog post with the generated content
      const newPost = {
        title,
        description,
        content: fullContent,
        keyPoints: keyPoints || [],
        author: 'AI Assistant',
        createdAt: new Date(),
        readingTime: `${Math.ceil(fullContent.split(' ').length / 200)}-${Math.ceil(fullContent.split(' ').length / 150)} minutes`
      };

      res.json({ 
        blogPost: newPost,
        message: 'Blog content generated successfully!'
      });
    } catch (openaiError) {
      // If OpenAI fails due to quota, use mock content
      if (openaiError.status === 429) {
        console.log('OpenAI quota exceeded, using mock blog content');
        
        const mockContent = `# ${title}

## Introduction

${description}

Welcome to this comprehensive guide on ${title.toLowerCase()}. Whether you're a beginner or an experienced professional, this article will provide you with valuable insights and practical knowledge.

## Understanding the Basics

Before diving deep into the subject, it's important to understand the fundamental concepts. ${title.toLowerCase()} encompasses various aspects that work together to create a complete system.

### Key Concepts

${keyPoints ? keyPoints.map(point => `- **${point}**: This is a crucial aspect that requires careful consideration and understanding.`).join('\n') : '- **Core Principles**: Understanding the basic principles is essential for success.\n- **Best Practices**: Following industry best practices will help you achieve better results.\n- **Common Mistakes**: Being aware of common pitfalls will save you time and effort.'}

## Practical Applications

Now that we understand the basics, let's explore how these concepts apply in real-world scenarios. The practical applications of ${title.toLowerCase()} are vast and varied.

### Real-World Examples

Here are some examples of how ${title.toLowerCase()} is used in different contexts:

1. **Business Applications**: Many companies leverage these principles to improve their operations and increase efficiency.

2. **Personal Development**: Individuals can apply these concepts to enhance their personal and professional growth.

3. **Innovation**: New technologies and methodologies continue to emerge, expanding the possibilities.

## Advanced Techniques

For those looking to take their knowledge to the next level, here are some advanced techniques and strategies:

### Optimization Strategies

- **Performance Tuning**: Fine-tuning your approach can lead to significant improvements
- **Scalability**: Planning for growth ensures long-term success
- **Integration**: Combining multiple approaches often yields the best results

## Common Challenges and Solutions

Every journey has its challenges. Here are some common obstacles you might encounter and how to overcome them:

### Overcoming Obstacles

1. **Resource Limitations**: Start small and scale gradually
2. **Knowledge Gaps**: Continuous learning and practice are key
3. **Time Constraints**: Prioritize and focus on high-impact activities

## Best Practices

To ensure success, follow these proven best practices:

### Guidelines for Success

- **Start with a Plan**: Having a clear roadmap will guide your efforts
- **Measure Progress**: Track your results to understand what works
- **Stay Updated**: The field is constantly evolving, so keep learning
- **Network**: Connect with others in the field to share knowledge

## Conclusion

${title.toLowerCase()} is a fascinating and complex subject that offers endless opportunities for learning and growth. By understanding the fundamentals, applying practical techniques, and following best practices, you can achieve remarkable results.

Remember that success comes from consistent effort and continuous improvement. Start your journey today and discover the amazing possibilities that await you.

---

*This article was generated to help you understand ${title.toLowerCase()} better. For more personalized guidance, consider consulting with experts in the field.*`;

        const mockPost = {
          title,
          description,
          content: mockContent,
          keyPoints: keyPoints || [],
          author: 'AI Assistant',
          createdAt: new Date(),
          readingTime: `${Math.ceil(mockContent.split(' ').length / 200)}-${Math.ceil(mockContent.split(' ').length / 150)} minutes`
        };

        res.json({ 
          blogPost: mockPost,
          message: 'Blog content generated successfully! (Using demo content due to OpenAI quota limits)',
          note: "Add billing to your OpenAI account for real AI-generated content."
        });
      } else {
        throw openaiError;
      }
    }
  } catch (error) {
    console.error('AI Error Details:', error);
    console.error('Error message:', error.message);
    
    if (error.response?.status === 401) {
      res.status(500).json({ message: 'OpenAI API key is invalid. Please check your API key.' });
    } else if (error.response?.status === 429) {
      res.status(500).json({ message: 'Rate limit exceeded. Please try again in a few minutes.' });
    } else {
      res.status(500).json({ message: 'Failed to generate blog content', error: error.message });
    }
  }
});

module.exports = router; 