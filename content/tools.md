# Tools & Function Calling

## 👶 Explained like I'm 5

Imagine you're a robot, but you don't have hands! You can think, but you can't actually DO anything. That's where tools come in!

Tools are like superpowers for AI agents:
- 🔍 Search tool = ability to look things up on the internet
- 📧 Email tool = ability to send messages
- 📅 Calendar tool = ability to check dates
- 💾 Database tool = ability to save and find information

Without tools, agents can only talk. With tools, they can actually interact with the world!

<TipBox type="info" title="Tools = Capabilities">
Tools extend what agents can do. Without tools, agents are limited to text generation. With tools, they can interact with the real world.
</TipBox>

## ❓ Why we need this

Agents need tools to:
- **Search the web** for real-time information
- **Use APIs** to connect to other services
- **Read/write files** to save work
- **Interact with databases** to store data
- **Call functions** in other programs

Think of tools as the "hands" that let agents actually do things!

## 🧠 How it works

### Function Calling

When an agent needs to do something, it "calls" a function (tool):

```
Agent thinks: "I need to search for weather"
Agent calls: search_web("weather in New York")
Tool executes: Searches the internet
Tool returns: "72°F, sunny"
Agent uses: This information to answer the user
```

### The Tool Calling Process

```
┌─────────────┐
│   AGENT     │
│  "I need    │
│   weather"  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SELECTS    │
│   TOOL      │
│ search_web  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  CALLS      │
│  FUNCTION   │
│ with params │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  TOOL       │
│  EXECUTES   │
│  ACTION     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  RETURNS    │
│  RESULT     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  AGENT      │
│  USES       │
│  RESULT     │
└─────────────┘
```

### Types of Tools

1. **Search Tools**: DuckDuckGo, Google Search
2. **Browser Tools**: Navigate websites, click buttons
3. **API Tools**: Connect to services (weather, maps, etc.)
4. **Database Tools**: Save and retrieve data
5. **File Tools**: Read/write files
6. **Custom Tools**: Tools you build yourself!

## 📚 Deep Dive: Tool Categories

### 1. Information Retrieval Tools

**Search Tools:**
```python
from crewai.tools import DuckDuckGoSearchRun

search_tool = DuckDuckGoSearchRun()
agent = Agent(
    role='Researcher',
    tools=[search_tool]
)
```

**Database Query Tools:**
```python
from crewai.tools import tool

@tool
def query_database(query: str) -> str:
    """Query the database and return results"""
    # Your database query logic
    return results
```

### 2. Communication Tools

**Email Tools:**
```python
@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email"""
    # Email sending logic
    return "Email sent successfully"
```

**API Integration Tools:**
```python
@tool
def call_api(endpoint: str, method: str, data: dict) -> str:
    """Call an external API"""
    # API call logic
    return response
```

### 3. File Operations Tools

```python
@tool
def read_file(filepath: str) -> str:
    """Read content from a file"""
    with open(filepath, 'r') as f:
        return f.read()

@tool
def write_file(filepath: str, content: str) -> str:
    """Write content to a file"""
    with open(filepath, 'w') as f:
        f.write(content)
    return "File written successfully"
```

### 4. Calculation & Analysis Tools

```python
@tool
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression"""
    try:
        result = eval(expression)
        return str(result)
    except:
        return "Invalid expression"
```

## 🧪 Example

Here's an agent using tools in CrewAI:

```python
from crewai import Agent, Task, Crew
from crewai.tools import DuckDuckGoSearchRun

# Create a search tool
search_tool = DuckDuckGoSearchRun()

# Create an agent with the tool
agent = Agent(
    role='Researcher',
    goal='Find accurate information',
    tools=[search_tool],  # Give the agent tools!
    verbose=True
)

# Now the agent can search the web!
task = Task(
    description='Search for the latest AI news',
    agent=agent
)
```

### Example: Custom Weather Tool

```python
from crewai import Agent, Task, Crew, tool
import requests

@tool
def get_weather(city: str) -> str:
    """Get current weather for a city"""
    api_key = os.getenv('WEATHER_API_KEY')
    url = f"https://api.weather.com/v1/current?city={city}&key={api_key}"
    response = requests.get(url)
    data = response.json()
    return f"Weather in {city}: {data['temperature']}°F, {data['condition']}"

# Create agent with custom tool
weather_agent = Agent(
    role='Weather Assistant',
    goal='Provide accurate weather information',
    tools=[get_weather],
    verbose=True
)

task = Task(
    description='Get the weather for New York',
    agent=weather_agent
)

crew = Crew(agents=[weather_agent], tasks=[task])
result = crew.kickoff()
```

### Example: Multiple Tools

```python
from crewai import Agent, Task, Crew
from crewai.tools import DuckDuckGoSearchRun

# Create multiple tools
search_tool = DuckDuckGoSearchRun()

@tool
def calculate_distance(city1: str, city2: str) -> str:
    """Calculate distance between two cities"""
    # Distance calculation logic
    return f"Distance: {distance} miles"

@tool
def get_restaurants(location: str) -> str:
    """Find restaurants near a location"""
    # Restaurant search logic
    return restaurant_list

# Agent with multiple tools
travel_agent = Agent(
    role='Travel Planner',
    goal='Help plan trips',
    tools=[search_tool, calculate_distance, get_restaurants],
    verbose=True
)
```

## 🎯 Real-World Case Studies

<CaseStudy
  title="E-commerce Price Monitoring Agent"
  scenario="A business needs to monitor competitor prices across multiple websites, but manual checking is time-consuming."
  solution="Built an agent with custom tools: Web Scraper (extracts prices), Price Comparator (compares across sites), Alert Tool (notifies of price changes). The agent autonomously monitors prices and sends alerts when competitors change prices."
  outcome="Price monitoring automated completely. Response time to price changes reduced from days to minutes. Business can adjust pricing strategy in real-time. Competitive advantage increased."
  lessons={[
    "Custom tools enable specific use cases",
    "Tool combination creates powerful workflows",
    "Automation saves significant time",
    "Real-time tools provide competitive advantage"
  ]}
/>

<CaseStudy
  title="Data Analysis Agent with Multiple Tools"
  scenario="Analysts spend hours gathering data from multiple sources, cleaning it, and creating reports."
  solution="Created an agent with tools: Database Connector (queries databases), API Fetcher (gets external data), Data Cleaner (processes data), Report Generator (creates visualizations). Agent autonomously gathers, processes, and reports data."
  outcome="Report creation time reduced from 4 hours to 15 minutes. Consistency improved. Analysts focus on insights, not data gathering. Reports available on-demand."
  lessons={[
    "Tool chains automate complex workflows",
    "Data tools are essential for analysis agents",
    "Automation improves consistency",
    "Agents free humans for higher-value work"
  ]}
/>

## 🛠 Hands-on Task

Think about these scenarios. What tools would an agent need?

1. Booking a flight
2. Managing your email
3. Creating a budget report
4. Learning a new skill
5. Planning a trip

For each, list:
- What tools are needed?
- What would each tool do?
- How would the agent use them together?

<Checklist items={[
  "Identified 5 scenarios",
  "Listed tools needed for each",
  "Described what each tool does",
  "Thought about tool combinations",
  "Designed tool workflow",
  "Identified potential tool limitations"
]} id="tools-task" />

### Extended Exercise: Build a Custom Tool

Create your own custom tool:

1. **Choose a Function**: What should your tool do?
2. **Define Parameters**: What inputs does it need?
3. **Implement Logic**: Write the tool function
4. **Add Documentation**: Describe what it does
5. **Test**: Use it with an agent
6. **Iterate**: Improve based on usage

<TipBox type="tip" title="Tool Design Tip">
Keep tools focused and single-purpose. One tool should do one thing well.
</TipBox>

## ✅ Checklist

Understand these concepts:

<Checklist items={[
  "What tools are and why agents need them",
  "How function calling works",
  "Different types of tools available",
  "How to give tools to agents in CrewAI",
  "How agents decide which tool to use",
  "How to create custom tools",
  "How to combine multiple tools",
  "Tool best practices"
]} id="tools-checklist" />

## 🤔 Mini Quiz

<Quiz 
  question="What is function calling in the context of AI agents?"
  options={[
    "A way for agents to talk to each other",
    "When an agent uses a tool to perform an action",
    "A type of memory",
    "A programming language"
  ]}
  correctAnswer={1}
  id="tools-quiz"
/>

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Too Many Tools
**Problem**: Agent gets confused with too many options.

**Solution**: Give agents only the tools they need.

```python
# ❌ Bad: Too many tools
agent = Agent(
    role='Researcher',
    tools=[search, email, calendar, database, file, calculator, ...]  # Too many!
)

# ✅ Good: Focused tools
agent = Agent(
    role='Researcher',
    tools=[search_tool]  # Only what's needed
)
```

### Pitfall 2: Poor Tool Documentation
**Problem**: Agent doesn't know how to use tools correctly.

**Solution**: Write clear tool descriptions.

```python
# ❌ Bad: Unclear description
@tool
def tool1(x): ...

# ✅ Good: Clear description
@tool
def get_weather(city: str) -> str:
    """Get current weather for a city.
    
    Args:
        city: Name of the city (e.g., 'New York')
    
    Returns:
        Weather information including temperature and conditions
    """
    ...
```

### Pitfall 3: Tool Errors Not Handled
**Problem**: Tool failures crash the agent.

**Solution**: Add error handling in tools.

```python
@tool
def safe_api_call(endpoint: str) -> str:
    """Safely call an API with error handling"""
    try:
        response = requests.get(endpoint)
        return response.json()
    except Exception as e:
        return f"Error: {str(e)}"
```

<TipBox type="warning" title="Error Handling">
Always handle errors in tools. Agents should gracefully handle tool failures.
</TipBox>

## 💡 Best Practices

1. **Keep Tools Focused**: One tool, one purpose
2. **Document Thoroughly**: Clear descriptions help agents use tools correctly
3. **Handle Errors**: Tools should fail gracefully
4. **Test Tools**: Verify tools work before giving to agents
5. **Start Simple**: Begin with built-in tools, add custom ones as needed
6. **Monitor Usage**: Track which tools agents use most
7. **Optimize Performance**: Make tools fast and efficient

## 🔗 Tool Integration Patterns

### Pattern 1: Sequential Tool Use
Tools used one after another:
```
Search → Process → Store → Notify
```

### Pattern 2: Parallel Tool Use
Multiple tools used simultaneously:
```
    ┌─ Search A ─┐
    │            │
Start ── Search B ──→ Combine → Result
    │            │
    └─ Search C ─┘
```

### Pattern 3: Conditional Tool Use
Agent chooses tools based on conditions:
```
If condition A → Use Tool A
If condition B → Use Tool B
```

## 🔗 Additional Resources

<ResourceCard
  title="CrewAI Tools Guide"
  description="Overview of tool integration in CrewAI agents"
  url="https://docs.crewai.com/concepts/tools"
  type="doc"
  tags={["Documentation", "Tools"]}
/>

<ResourceCard
  title="CrewAI Built-in Tools"
  description="List of built-in tools available for CrewAI agents"
  url="https://docs.crewai.com/tools/"
  type="doc"
  tags={["Tools", "Reference"]}
/>

<ResourceCard
  title="Tool Creation Examples"
  description="Examples for building custom tools within CrewAI"
  url="https://github.com/crewAIInc/crewAI/tree/main/examples/tools"
  type="code"
  tags={["Examples", "GitHub"]}
/>

## 🚀 Challenge for GitHub

Create a custom tool for CrewAI! Build a simple tool that:
- Does something useful (like checking the weather, calculating something, etc.)
- Can be used by an agent
- Has clear documentation
- Handles errors gracefully

**Advanced Challenge**: Build a tool chain:
1. Create 2-3 related tools
2. Design an agent that uses them together
3. Show how tools work in sequence
4. Document the workflow

Share your tool code on GitHub with examples of how to use it!

## 🎓 Next Steps

Continue your learning journey:

1. **Next Module**: [Deployment](/deployment) - Deploy agents with tools
2. **Or Explore**: [Safety & Ethics](/ethics) - Responsible tool usage
3. **Advanced**: [Integration Patterns](/integration) - Complex tool workflows

<TipBox type="success" title="Great Work!">
You now understand how agents use tools to interact with the world. Tools are what make agents truly powerful!
</TipBox>
