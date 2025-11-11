# Testing & Debugging Agents

## 👶 Explained like I'm 5

When you build something, you need to test it to make sure it works! Like testing a toy to see if all the pieces fit together.

Testing agents is the same - you check:
- Does it do what it's supposed to?
- Does it handle errors well?
- Does it work with different inputs?
- Is it fast enough?

Testing helps you find problems before users do!

<TipBox type="info" title="Test Early, Test Often">
The earlier you find bugs, the easier they are to fix. Test as you build!
</TipBox>

## ❓ Why we need this

Agents can have bugs:
- Wrong answers
- Infinite loops
- Tool failures
- Memory issues
- Performance problems

Testing helps you:
- Find bugs early
- Ensure reliability
- Improve performance
- Build confidence
- Save time debugging

## 🧠 How it works

### Types of Testing

1. **Unit Tests**: Test individual components
2. **Integration Tests**: Test how components work together
3. **End-to-End Tests**: Test complete workflows
4. **Performance Tests**: Check speed and efficiency
5. **Error Tests**: Verify error handling

### Testing Strategies

**1. Unit Testing Agents**

```python
import unittest
from crewai import Agent, Task, Crew

class TestAgent(unittest.TestCase):
    def test_agent_creation(self):
        agent = Agent(
            role='Tester',
            goal='Test things',
            backstory='You are a test agent'
        )
        self.assertIsNotNone(agent)
        self.assertEqual(agent.role, 'Tester')
    
    def test_agent_with_tools(self):
        agent = Agent(
            role='Researcher',
            tools=[search_tool]
        )
        self.assertEqual(len(agent.tools), 1)
```

**2. Integration Testing**

```python
def test_crew_workflow():
    researcher = Agent(role='Researcher', goal='Research')
    writer = Agent(role='Writer', goal='Write')
    
    research_task = Task(description='Research X', agent=researcher)
    write_task = Task(description='Write about X', agent=writer, context=[research_task])
    
    crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
    
    # Test that crew runs without errors
    result = crew.kickoff()
    assert result is not None
    assert len(result) > 0
```

**3. Error Handling Tests**

```python
def test_error_handling():
    agent = Agent(role='Tester', goal='Test')
    
    # Test with invalid input
    try:
        result = agent.process("")
        assert False, "Should have raised error"
    except Exception as e:
        assert "empty" in str(e).lower()
```

## 🧪 Example

### Complete Testing Suite

```python
import pytest
from crewai import Agent, Task, Crew

class TestResearchCrew:
    def setup_method(self):
        self.researcher = Agent(
            role='Researcher',
            goal='Research topics',
            verbose=False
        )
        self.writer = Agent(
            role='Writer',
            goal='Write content',
            verbose=False
        )
    
    def test_research_task(self):
        task = Task(
            description='Research AI agents',
            agent=self.researcher
        )
        assert task.agent == self.researcher
    
    def test_crew_execution(self):
        research_task = Task(
            description='Research topic',
            agent=self.researcher
        )
        write_task = Task(
            description='Write article',
            agent=self.writer,
            context=[research_task]
        )
        
        crew = Crew(
            agents=[self.researcher, self.writer],
            tasks=[research_task, write_task]
        )
        
        result = crew.kickoff()
        assert result is not None
    
    def test_error_recovery(self):
        # Test that crew handles errors gracefully
        task = Task(
            description='Invalid task that might fail',
            agent=self.researcher
        )
        # Should not crash, should handle error
        try:
            crew = Crew(agents=[self.researcher], tasks=[task])
            crew.kickoff()
        except Exception:
            # Error handling should catch this
            pass
```

## 🎯 Real-World Case Studies

<CaseStudy
  title="Testing Saves Production Failure"
  scenario="A financial analysis agent was deployed without testing. It made calculation errors that cost the company money."
  solution="Implemented comprehensive testing: Unit tests for calculations, integration tests for workflows, error tests for edge cases, performance tests for speed. Found 15 critical bugs before they reached production."
  outcome="Zero production errors after testing. Confidence in agent increased. Development speed improved with automated tests. Bugs caught early saved money."
  lessons={[
    "Testing prevents costly mistakes",
    "Automated tests save time",
    "Test edge cases thoroughly",
    "Performance testing matters"
  ]}
/>

## 🛠 Hands-on Task

Create tests for your agent:

1. **Unit Tests**: Test agent creation, tool usage
2. **Integration Tests**: Test agent workflows
3. **Error Tests**: Test error handling
4. **Performance Tests**: Measure execution time
5. **Edge Cases**: Test unusual inputs

<Checklist items={[
  "Created unit tests",
  "Created integration tests",
  "Tested error handling",
  "Tested edge cases",
  "Measured performance",
  "Automated test suite"
]} id="testing-task" />

## ✅ Checklist

Understand testing:

<Checklist items={[
  "Types of testing",
  "How to write unit tests",
  "Integration testing strategies",
  "Error handling tests",
  "Performance testing",
  "Test automation"
]} id="testing-checklist" />

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Not Testing Edge Cases
**Problem**: Agent works for normal inputs but fails on edge cases.

**Solution**: Test with empty inputs, very long inputs, special characters, etc.

### Pitfall 2: No Error Testing
**Problem**: Agent crashes on errors instead of handling gracefully.

**Solution**: Test error scenarios. Ensure graceful failure.

<TipBox type="warning" title="Test Everything">
Test normal cases, edge cases, and error cases. You'll be surprised what breaks!
</TipBox>

## 💡 Best Practices

1. **Test Early**: Write tests as you build
2. **Test Often**: Run tests frequently
3. **Automate**: Use test runners
4. **Test Edge Cases**: Don't just test happy paths
5. **Mock External Services**: Don't depend on real APIs in tests
6. **Measure Performance**: Ensure agents are fast enough
7. **Document Tests**: Explain what you're testing

## 🔗 Additional Resources

<ResourceCard
  title="Pytest Testing Guide"
  description="Official documentation for the Pytest testing framework"
  url="https://docs.pytest.org/en/stable/"
  type="doc"
  tags={["Testing", "Python"]}
/>

## 🚀 Challenge for GitHub

Create a complete test suite for an agent:
1. Unit tests
2. Integration tests
3. Error handling tests
4. Performance benchmarks
5. Test documentation

Share your test suite on GitHub!

<TipBox type="success" title="Testing Master!">
You now know how to test agents thoroughly. This ensures reliability and catches bugs early!
</TipBox>

