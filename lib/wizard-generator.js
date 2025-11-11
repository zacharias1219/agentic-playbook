export function generateProjectTemplate(answers) {
  const { projectType, useInternet, useMemory, useMultiAgent } = answers

  // Generate system prompt
  const systemPrompt = generateSystemPrompt(projectType, useInternet, useMemory, useMultiAgent)
  
  // Generate tech stack
  const techStack = generateTechStack(useInternet, useMemory, useMultiAgent)
  
  // Generate file structure
  const fileStructure = generateFileStructure(useMultiAgent)
  
  // Generate code template
  const codeTemplate = generateCodeTemplate(projectType, useInternet, useMemory, useMultiAgent)

  return {
    systemPrompt,
    techStack,
    fileStructure,
    codeTemplate,
  }
}

function generateSystemPrompt(projectType, useInternet, useMemory, useMultiAgent) {
  let prompt = `You are an AI ${projectType} assistant. `

  if (useMultiAgent) {
    prompt += `You work as part of a team of specialized agents, each with their own role and expertise. `
  }

  if (useInternet) {
    prompt += `You have access to internet tools and can search for real-time information, browse websites, and access online resources. `
  }

  if (useMemory) {
    prompt += `You maintain persistent memory across conversations, learning from past interactions and remembering important context. `
  }

  prompt += `Your goal is to help users effectively and efficiently.`

  return prompt
}

function generateTechStack(useInternet, useMemory, useMultiAgent) {
  const stack = ['Python 3.9+', 'CrewAI', 'OpenAI API (or Anthropic Claude)']
  
  if (useInternet) {
    stack.push('DuckDuckGo Search Tool', 'Browser Tools')
  }
  
  if (useMemory) {
    stack.push('PostgreSQL (or SQLite)', 'LangChain Memory', 'Vector Database (optional)')
  }
  
  if (useMultiAgent) {
    stack.push('CrewAI Multi-Agent Framework')
  }
  
  stack.push('Environment Variables (.env)', 'Git for version control')
  
  return stack
}

function generateFileStructure(useMultiAgent) {
  if (useMultiAgent) {
    return `project-name/
├── .env
├── requirements.txt
├── README.md
├── main.py
├── agents/
│   ├── __init__.py
│   ├── researcher.py
│   ├── writer.py
│   └── reviewer.py
├── tools/
│   ├── __init__.py
│   └── custom_tools.py
└── config/
    └── crew_config.py`
  } else {
    return `project-name/
├── .env
├── requirements.txt
├── README.md
├── main.py
├── agent.py
└── tools/
    ├── __init__.py
    └── custom_tools.py`
  }
}

function generateCodeTemplate(projectType, useInternet, useMemory, useMultiAgent) {
  let code = `from crewai import Agent, Task, Crew
from langchain.llms import OpenAI
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Initialize LLM
llm = OpenAI(temperature=0.7)

`

  if (useMultiAgent) {
    code += `# Define specialized agents
researcher = Agent(
    role='Researcher',
    goal='Gather and analyze information',
    backstory='You are an expert researcher with attention to detail.',
    llm=llm,
    verbose=True
)

writer = Agent(
    role='Writer',
    goal='Create clear and engaging content',
    backstory='You are a skilled writer who can explain complex topics simply.',
    llm=llm,
    verbose=True
)

`

    if (useInternet) {
      code += `# Add internet tools if needed
from crewai.tools import DuckDuckGoSearchRun
search_tool = DuckDuckGoSearchRun()

researcher.tools = [search_tool]
writer.tools = [search_tool]

`

    }

    code += `# Define tasks
task1 = Task(
    description='Research information about ${projectType}',
    agent=researcher
)

task2 = Task(
    description='Write a comprehensive guide based on research',
    agent=writer,
    context=[task1]
)

# Create crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[task1, task2],
    verbose=True
)

# Execute
result = crew.kickoff()
print(result)
`
  } else {
    code += `# Define single agent
agent = Agent(
    role='${projectType} Assistant',
    goal='Help users with ${projectType} tasks',
    backstory='You are a helpful AI assistant specialized in ${projectType}.',
    llm=llm,
    verbose=True
)

`

    if (useInternet) {
      code += `# Add internet tools
from crewai.tools import DuckDuckGoSearchRun
search_tool = DuckDuckGoSearchRun()
agent.tools = [search_tool]

`

    }

    code += `# Define task
task = Task(
    description='Help the user with their ${projectType} request',
    agent=agent
)

# Create crew
crew = Crew(
    agents=[agent],
    tasks=[task],
    verbose=True
)

# Execute
result = crew.kickoff()
print(result)
`
  }

  if (useMemory) {
    code += `
# Memory setup (add to your agent configuration)
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
# Integrate memory with your agent as needed
`
  }

  return code
}

