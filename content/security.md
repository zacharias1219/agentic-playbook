# Security Best Practices

## 👶 Explained like I'm 5

Imagine you have a secret diary. You wouldn't leave it where everyone can read it, right? You'd lock it up!

AI agents handle important information too - API keys, user data, secrets. We need to protect them just like a locked diary!

Security means keeping your agent and its data safe from bad people.

<TipBox type="warning" title="Security is Critical">
A security breach can expose user data, cost money, and damage trust. Always prioritize security.
</TipBox>

## ❓ Why we need this

Agents handle sensitive information:
- API keys and secrets
- User personal data
- Financial information
- Business data

Without security:
- Hackers can steal API keys
- User data can be exposed
- Agents can be manipulated
- Systems can be compromised

Security protects your agent, your users, and your reputation!

## 🧠 How it works

### Security Principles

1. **Secrets Management**: Never expose API keys
2. **Input Validation**: Check all inputs
3. **Authentication**: Verify who can use the agent
4. **Encryption**: Protect data in transit and at rest
5. **Rate Limiting**: Prevent abuse
6. **Monitoring**: Watch for attacks

### 1. API Key Security

```python
# ❌ Bad: Hardcoded key
api_key = "sk-1234567890"

# ✅ Good: Environment variable
import os
api_key = os.getenv('OPENAI_API_KEY')

# ✅ Better: Use secrets manager
from google.cloud import secretmanager

def get_secret(secret_name):
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

api_key = get_secret('openai_api_key')
```

### 2. Input Validation

```python
# ✅ Good: Validate inputs
def safe_agent_input(user_input):
    # Check length
    if len(user_input) > 10000:
        raise ValueError("Input too long")
    
    # Check for injection attempts
    dangerous_patterns = ['<script', 'javascript:', 'eval(']
    for pattern in dangerous_patterns:
        if pattern.lower() in user_input.lower():
            raise ValueError("Invalid input detected")
    
    # Sanitize
    sanitized = user_input.strip()
    
    return sanitized
```

### 3. Authentication

```python
# ✅ Good: Require authentication
from functools import wraps

def require_auth(f):
    @wraps(f)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get('Authorization')
        if not validate_token(token):
            return {'error': 'Unauthorized'}, 401
        return f(request, *args, **kwargs)
    return wrapper

@require_auth
def agent_endpoint(request):
    # Protected endpoint
    return agent.process(request.data)
```

### 4. Rate Limiting

```python
# ✅ Good: Limit requests
from functools import lru_cache
import time

request_times = {}

def rate_limit(user_id, max_requests=10, window=60):
    now = time.time()
    if user_id not in request_times:
        request_times[user_id] = []
    
    # Remove old requests
    request_times[user_id] = [
        t for t in request_times[user_id] if now - t < window
    ]
    
    # Check limit
    if len(request_times[user_id]) >= max_requests:
        raise Exception("Rate limit exceeded")
    
    # Add current request
    request_times[user_id].append(now)
```

## 🧪 Example

### Secure Agent Setup

```python
import os
from crewai import Agent, Task, Crew
from dotenv import load_dotenv

# Load environment variables securely
load_dotenv()

# Get API keys from environment
openai_key = os.getenv('OPENAI_API_KEY')
if not openai_key:
    raise ValueError("OPENAI_API_KEY not set")

# Create agent with security considerations
agent = Agent(
    role='Secure Assistant',
    goal='Help users safely',
    backstory='You are a secure AI assistant',
    max_iter=10,  # Limit iterations
    allow_delegation=False,  # Control delegation
    verbose=True
)

# Validate inputs before processing
def secure_process(user_input):
    # Validate
    if not user_input or len(user_input) == 0:
        return "Please provide input"
    
    if len(user_input) > 5000:
        return "Input too long"
    
    # Process safely
    return agent.process(user_input)
```

## 🎯 Real-World Case Studies

<CaseStudy
  title="API Key Exposure Incident"
  scenario="A developer accidentally committed API keys to GitHub. Keys were exposed publicly, leading to unauthorized usage and costs."
  solution="Implemented: (1) Immediate key rotation, (2) Environment variable enforcement, (3) Pre-commit hooks to prevent key commits, (4) Secrets scanning in CI/CD, (5) Team training on security."
  outcome="No further key exposures. Costs controlled. Team educated. Security practices improved. Automated scanning prevents future incidents."
  lessons={[
    "Never commit secrets to git",
    "Use environment variables",
    "Automate secret scanning",
    "Rotate keys immediately if exposed",
    "Train team on security"
  ]}
/>

## 🛠 Hands-on Task

Secure your agent:

1. **Audit Secrets**: Find all API keys and secrets
2. **Move to Environment**: Put secrets in .env
3. **Add Validation**: Validate all inputs
4. **Add Rate Limiting**: Prevent abuse
5. **Enable Logging**: Monitor for attacks
6. **Test Security**: Try to break your own agent

<Checklist items={[
  "Moved all secrets to environment variables",
  "Added input validation",
  "Implemented rate limiting",
  "Added authentication",
  "Enabled security logging",
  "Tested for vulnerabilities"
]} id="security-task" />

## ✅ Checklist

Understand security:

<Checklist items={[
  "API key management",
  "Input validation",
  "Authentication methods",
  "Rate limiting",
  "Encryption basics",
  "Security monitoring"
]} id="security-checklist" />

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Committing Secrets
**Problem**: API keys committed to git, exposed publicly.

**Solution**: Use .gitignore, environment variables, pre-commit hooks.

```bash
# .gitignore
.env
.env.local
*.key
secrets/
```

### Pitfall 2: No Input Validation
**Problem**: Malicious inputs can break or exploit agent.

**Solution**: Validate and sanitize all inputs.

<TipBox type="warning" title="Never Trust Input">
Always validate user input. Assume it's malicious until proven safe.
</TipBox>

### Pitfall 3: No Rate Limiting
**Problem**: Agent can be abused, causing high costs.

**Solution**: Implement rate limiting per user/IP.

## 💡 Best Practices

1. **Never Commit Secrets**: Use environment variables
2. **Validate Inputs**: Check everything users provide
3. **Use HTTPS**: Encrypt data in transit
4. **Limit Access**: Only give necessary permissions
5. **Monitor Logs**: Watch for suspicious activity
6. **Rotate Keys**: Change keys regularly
7. **Keep Updated**: Update dependencies for security patches

## 🔒 Security Checklist

Before deploying:
- [ ] All secrets in environment variables
- [ ] .env in .gitignore
- [ ] Input validation implemented
- [ ] Rate limiting enabled
- [ ] HTTPS enabled
- [ ] Error messages don't leak info
- [ ] Logging configured
- [ ] Dependencies updated
- [ ] Security headers set
- [ ] Authentication required

## 🔗 Additional Resources

<ResourceCard
  title="OWASP AI & LLM Security Guide"
  description="Security best practices for building AI applications using large language models"
  url="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
  type="doc"
  tags={["Security", "Best Practices"]}
/>

## 🚀 Challenge for GitHub

Create a security guide for your agent:
1. Document all security measures
2. Create security checklist
3. Add security tests
4. Document incident response
5. Share security best practices

<TipBox type="success" title="Security Expert!">
You now understand how to secure agents. This protects your users, your data, and your reputation!
</TipBox>

