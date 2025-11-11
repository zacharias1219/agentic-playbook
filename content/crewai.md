# Building with CrewAI

## 👶 Explained like I'm 5

Imagine you're building a LEGO castle. You could do it alone, but it's faster and more fun with friends! Each friend has a job:
- One builds the walls
- One builds the towers
- One adds decorations
- One checks that everything fits together

CrewAI is like that - it lets you build AI systems where multiple AI agents work together as a team, each doing their special job!

<TipBox type="info" title="Why Multi-Agent?">
Multiple agents can work in parallel, specialize in different areas, and review each other's work for better quality.
</TipBox>

## ❓ Why we need this

Sometimes one agent isn't enough! You might need:
- A researcher to find information
- A writer to create content
- A reviewer to check quality
- A coordinator to manage everything

CrewAI makes it easy to create teams of agents that work together.

## 🧠 How it works

CrewAI uses three main concepts:

1. **Agents**: The team members (each with a role)
2. **Tasks**: The jobs to be done
3. **Crew**: The team that coordinates everything

Here's how they work together:

```
Crew (The Team)
├── Agent 1: Researcher
│   └── Task: Find information about AI
├── Agent 2: Writer  
│   └── Task: Write an article
└── Agent 3: Editor
    └── Task: Review and improve
```

The Crew makes sure everyone works together smoothly!

### CrewAI Architecture

```
┌─────────────────────────────────────┐
│           CREW                       │
│  ┌──────────────────────────────┐   │
│  │      COORDINATOR             │   │
│  │  (Manages workflow)          │   │
│  └───────────┬──────────────────┘   │
│              │                       │
│    ┌─────────┼─────────┐            │
│    │         │         │            │
│    ▼         ▼         ▼            │
│  ┌───┐    ┌───┐    ┌───┐          │
│  │ A1 │    │ A2 │    │ A3 │          │
│  │Task│───▶│Task│───▶│Task│          │
│  └───┘    └───┘    └───┘          │
│    │         │         │            │
│    └─────────┼─────────┘            │
│              │                       │
│              ▼                       │
│         RESULT                       │
└─────────────────────────────────────┘
```

## 📚 Deep Dive: CrewAI Components

### 1. Agents

Agents are specialized team members with specific roles:

```python
from crewai import Agent

# Agent with role, goal, and backstory
researcher = Agent(
    role='Research Specialist',
    goal='Find accurate, comprehensive information',
    backstory='You are an expert researcher with 10 years of experience in academic research. You excel at finding reliable sources and synthesizing information.',
    verbose=True,
    allow_delegation=False  # This agent works independently
)
```

**Key Agent Properties:**
- **role**: What the agent does (e.g., "Researcher", "Writer")
- **goal**: What the agent wants to achieve
- **backstory**: Context that shapes the agent's behavior
- **tools**: Capabilities the agent can use
- **memory**: Whether agent remembers past interactions
- **verbose**: Show agent's thinking process

### 2. Tasks

Tasks define what needs to be done:

```python
from crewai import Task

research_task = Task(
    description='Research the latest developments in AI agents. Find at least 5 recent articles and summarize key findings.',
    agent=researcher,
    expected_output='A comprehensive summary with key findings, sources, and trends'
)
```

**Task Properties:**
- **description**: What needs to be done
- **agent**: Who will do it
- **context**: Previous tasks this depends on
- **expected_output**: What the result should look like

### 3. Crews

Crews coordinate agents and tasks:

```python
from crewai import Crew

crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    verbose=True,
    process='sequential'  # or 'hierarchical'
)
```

**Crew Execution Modes:**
- **Sequential**: Tasks run one after another
- **Hierarchical**: Manager agent coordinates others

## 🧪 Example

Let's build a simple CrewAI project:

```python
from crewai import Agent, Task, Crew
from crewai.tools import DuckDuckGoSearchRun

# Create agents
researcher = Agent(
    role='Researcher',
    goal='Find accurate information',
    backstory='You are an expert researcher',
    tools=[DuckDuckGoSearchRun()],
    verbose=True
)

writer = Agent(
    role='Writer',
    goal='Create engaging content',
    backstory='You are a skilled writer',
    verbose=True
)

# Create tasks
research_task = Task(
    description='Research the latest AI trends',
    agent=researcher
)

writing_task = Task(
    description='Write a blog post about AI trends',
    agent=writer,
    context=[research_task]  # Uses research results
)

# Create crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task]
)

# Run it!
result = crew.kickoff()
print(result)
```

### Advanced Example: Content Creation Crew

```python
from crewai import Agent, Task, Crew
from crewai.tools import DuckDuckGoSearchRun

# Research Agent
researcher = Agent(
    role='Research Specialist',
    goal='Find accurate, up-to-date information',
    backstory='You are an expert researcher who finds reliable sources',
    tools=[DuckDuckGoSearchRun()],
    verbose=True
)

# Writer Agent
writer = Agent(
    role='Content Writer',
    goal='Create engaging, well-structured content',
    backstory='You are a professional writer who creates compelling articles',
    verbose=True
)

# Editor Agent
editor = Agent(
    role='Content Editor',
    goal='Improve content quality, grammar, and clarity',
    backstory='You are an experienced editor who polishes content to perfection',
    verbose=True
)

# Tasks
research_task = Task(
    description='Research the topic: "Impact of AI on Healthcare". Find at least 5 recent sources and summarize key points.',
    agent=researcher,
    expected_output='A research summary with key findings and sources'
)

writing_task = Task(
    description='Write a 1000-word article based on the research. Make it engaging and informative.',
    agent=writer,
    context=[research_task],
    expected_output='A well-written article draft'
)

editing_task = Task(
    description='Review and improve the article. Check for grammar, clarity, and flow.',
    agent=editor,
    context=[writing_task],
    expected_output='A polished, publication-ready article'
)

# Create and run crew
crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, writing_task, editing_task],
    verbose=True
)

result = crew.kickoff()
print(result)
```

### Example: Parallel Processing Crew

```python
# Agents work in parallel on different aspects
market_researcher = Agent(
    role='Market Researcher',
    goal='Analyze market trends',
    backstory='Expert in market analysis'
)

competitor_analyst = Agent(
    role='Competitor Analyst',
    goal='Research competitors',
    backstory='Expert in competitive analysis'
)

# Parallel tasks (no dependencies)
market_task = Task(
    description='Analyze current market trends',
    agent=market_researcher
)

competitor_task = Task(
    description='Research top 5 competitors',
    agent=competitor_analyst
)

# Both tasks run simultaneously
crew = Crew(
    agents=[market_researcher, competitor_analyst],
    tasks=[market_task, competitor_task],
    process='sequential'  # But tasks are independent
)
```

## 🎯 Real-World Case Studies

<CaseStudy
  title="Marketing Content Creation Crew"
  scenario="A marketing team needs to create blog posts, but manual creation is slow and quality varies."
  solution="Built a CrewAI crew with 4 agents: Topic Researcher (finds trending topics), Content Writer (creates drafts), SEO Specialist (optimizes for search), and Quality Editor (ensures brand voice). Tasks flow sequentially with each agent building on previous work."
  outcome="Content creation time reduced from 8 hours to 1 hour. Quality improved and became consistent. SEO performance increased by 45%. Team focuses on strategy, not writing."
  lessons={[
    "Specialized agents improve quality",
    "Sequential tasks ensure proper flow",
    "Each agent adds value to the process",
    "Crews scale better than single agents"
  ]}
/>

<CaseStudy
  title="Code Review Crew"
  scenario="Development team struggles with code review backlog. Reviews are inconsistent and slow."
  solution="Created a crew with 3 agents: Code Analyzer (checks for bugs), Style Reviewer (ensures code standards), and Security Auditor (finds vulnerabilities). All agents review code in parallel, then a Coordinator agent synthesizes findings."
  outcome="Review time reduced by 70%. Consistency improved dramatically. Critical issues caught earlier. Developers get faster, more thorough feedback."
  lessons={[
    "Parallel processing speeds up reviews",
    "Specialized agents catch different issues",
    "Coordination agent synthesizes results",
    "Automated reviews complement human reviews"
  ]}
/>

## 🛠 Hands-on Task

Design your own CrewAI team! Think of a project and answer:

1. What agents would you need?
2. What would each agent's role be?
3. What tasks would they do?
4. How would they work together?

<Checklist items={[
  "Designed a multi-agent project",
  "Defined agent roles",
  "Listed tasks for each agent",
  "Thought about how agents collaborate",
  "Identified task dependencies",
  "Considered parallel vs sequential execution",
  "Defined expected outputs"
]} id="crewai-task" />

### Extended Exercise: Build a Complete Crew

1. **Choose a Complex Problem**: Pick something that needs multiple skills
2. **Design Agents**: Create 3-5 specialized agents
3. **Define Tasks**: Break work into tasks with dependencies
4. **Set Up Crew**: Configure execution order
5. **Test**: Run the crew and observe interactions
6. **Iterate**: Improve based on results

<TipBox type="tip" title="Crew Design Tip">
Start with 2-3 agents. Add more only if needed. Too many agents can create confusion.
</TipBox>

## ✅ Checklist

Before moving on:

<Checklist items={[
  "Understand what CrewAI is",
  "Know the difference between Agents, Tasks, and Crew",
  "Can explain how agents work together",
  "Understand the basic code structure",
  "Know how to create a simple crew",
  "Understand sequential vs parallel execution",
  "Know how to use task dependencies",
  "Can design a multi-agent workflow"
]} id="crewai-checklist" />

## 🤔 Mini Quiz

<Quiz 
  question="In CrewAI, what is a 'Crew'?"
  options={[
    "A single AI agent",
    "A team of agents that work together",
    "A type of tool",
    "A programming language"
  ]}
  correctAnswer={1}
  id="crewai-quiz"
/>

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Circular Dependencies
**Problem**: Tasks depend on each other in a loop, causing deadlock.

**Solution**: Ensure tasks form a directed acyclic graph (DAG).

```python
# ❌ Bad: Circular dependency
task1 = Task(description='Task 1', agent=a1, context=[task2])
task2 = Task(description='Task 2', agent=a2, context=[task1])  # Circular!

# ✅ Good: Linear dependency
task1 = Task(description='Task 1', agent=a1)
task2 = Task(description='Task 2', agent=a2, context=[task1])  # task2 depends on task1
```

### Pitfall 2: Unclear Agent Roles
**Problem**: Agents don't know what they're supposed to do.

**Solution**: Define clear, specific roles and goals.

```python
# ❌ Bad: Vague role
agent = Agent(role='Helper', goal='Help')

# ✅ Good: Specific role
agent = Agent(
    role='Research Specialist',
    goal='Find and verify information from reliable sources',
    backstory='You are an expert researcher with 10 years of experience'
)
```

### Pitfall 3: Missing Context
**Problem**: Agents don't have information from previous tasks.

**Solution**: Use context parameter to pass information.

```python
# ✅ Good: Proper context passing
research_task = Task(description='Research topic X', agent=researcher)
writing_task = Task(
    description='Write article',
    agent=writer,
    context=[research_task]  # Writer gets research results
)
```

### Pitfall 4: Too Many Agents
**Problem**: Crew becomes chaotic with too many agents.

**Solution**: Start small, add agents only when needed.

<TipBox type="warning" title="Agent Count">
3-5 agents is usually optimal. More than 7 agents often creates confusion and inefficiency.
</TipBox>

## 💡 Best Practices

1. **Start Simple**: Begin with 2-3 agents, add complexity gradually
2. **Define Clear Roles**: Each agent should have a distinct purpose
3. **Use Task Dependencies**: Properly chain tasks with context
4. **Set Expected Outputs**: Define what each task should produce
5. **Enable Verbose Mode**: See how agents think and interact
6. **Test Incrementally**: Test each agent individually, then as a crew
7. **Monitor Performance**: Track execution time and quality
8. **Handle Errors**: Plan for failures and retries

## 🔄 Crew Patterns

### Pattern 1: Sequential Pipeline
Tasks run one after another:
```
Research → Write → Edit → Publish
```

### Pattern 2: Parallel Processing
Independent tasks run simultaneously:
```
    ┌─ Research A ─┐
    │               │
Start ── Research B ──→ Synthesize → Result
    │               │
    └─ Research C ─┘
```

### Pattern 3: Hierarchical
Manager coordinates workers:
```
        Manager
       /   |   \
   Worker Worker Worker
```

### Pattern 4: Review Loop
Content goes through review cycles:
```
Create → Review → Revise → Review → Final
```

## 🔗 Additional Resources

<ResourceCard
  title="CrewAI Documentation"
  description="Complete guide to building multi-agent systems using CrewAI"
  url="https://docs.crewai.com/"
  type="doc"
  tags={["Documentation", "Framework"]}
/>

<ResourceCard
  title="CrewAI Examples (GitHub)"
  description="Collection of example projects and templates demonstrating CrewAI usage"
  url="https://github.com/crewAIInc/crewAI-examples"
  type="code"
  tags={["Examples", "GitHub"]}
/>

<ResourceCard
  title="Multi-Agent Orchestration"
  description="Best practices for designing teams of agents within CrewAI"
  url="https://docs.crewai.com/concepts/crew"
  type="doc"
  tags={["Best Practices", "Design"]}
/>

## 🚀 Challenge for GitHub

Create a simple CrewAI project! Build a crew with at least 2 agents that work together on a task. Share your code on GitHub with:
- Clear comments explaining each part
- A README describing what your crew does
- Example output
- Explanation of agent roles and task flow

**Advanced Challenge**: Build a crew with:
1. At least 3 specialized agents
2. Sequential task dependencies
3. Clear expected outputs
4. Error handling
5. Performance monitoring

Tag it with #CrewAI!

## 🎓 Next Steps

Continue your learning journey:

1. **Next Module**: [Tools & Function Calling](/tools) - Learn how agents use tools
2. **Or Explore**: [Deployment](/deployment) - Deploy your CrewAI projects
3. **Advanced**: [Advanced CrewAI Patterns](/advanced-crewai) - Complex multi-agent systems

<TipBox type="success" title="Excellent Progress!">
You now know how to build multi-agent systems with CrewAI. Time to learn about tools and deployment!
</TipBox>
